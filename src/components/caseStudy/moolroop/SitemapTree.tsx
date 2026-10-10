import { useEffect, useMemo, useState } from 'react';
import styles from './SitemapTree.module.css';

export interface SitemapNode {
  label: string;
  /* Planned but out of the prototype's scope: drawn muted and dashed. */
  future?: boolean;
  children?: SitemapNode[];
}

// Layout metrics in px. Labels are measured in the node font, so it must
// match .node in SitemapTree.module.css.
const NODE_HEIGHT = 34;
const ROW_HEIGHT = NODE_HEIGHT + 14;
const COL_GAP = 36;
const PAD_X = 12;
const MIN_WIDTH = 64;
const MARGIN = 4;
const NODE_FONT = "375 13px 'Author Variable', sans-serif";
// Control-point reach of each connector curve, as a share of the column gap.
const CURVE = 0.6;

let measureCtx: CanvasRenderingContext2D | null | undefined;

function measureWidth(text: string): number {
  if (measureCtx === undefined) measureCtx = document.createElement('canvas').getContext('2d');
  if (measureCtx) measureCtx.font = NODE_FONT;
  const textWidth = measureCtx ? measureCtx.measureText(text).width : text.length * 6.6;
  return Math.max(MIN_WIDTH, Math.ceil(textWidth) + PAD_X * 2);
}

interface LaidOutNode {
  node: SitemapNode;
  depth: number;
  slot: number;
  width: number;
  children: LaidOutNode[];
}

/* Leaves take one row each, in order; a parent sits centred on its children. */
function layout(node: SitemapNode, depth: number, counter: { n: number }): LaidOutNode {
  const width = measureWidth(node.label);
  if (!node.children?.length) {
    return { node, depth, slot: counter.n++, width, children: [] };
  }
  const children = node.children.map((child) => layout(child, depth + 1, counter));
  const slot = (children[0].slot + children[children.length - 1].slot) / 2;
  return { node, depth, slot, width, children };
}

function flatten(node: LaidOutNode, acc: LaidOutNode[] = []): LaidOutNode[] {
  acc.push(node);
  node.children.forEach((child) => flatten(child, acc));
  return acc;
}

function buildLayout(root: SitemapNode) {
  const laidOut = layout(root, 0, { n: 0 });
  const all = flatten(laidOut);
  const maxDepth = Math.max(...all.map((n) => n.depth));

  const colWidth = Array.from({ length: maxDepth + 1 }, () => 0);
  all.forEach((n) => {
    colWidth[n.depth] = Math.max(colWidth[n.depth], n.width);
  });
  const colX = [MARGIN];
  for (let d = 1; d <= maxDepth; d++) colX[d] = colX[d - 1] + colWidth[d - 1] + COL_GAP;

  const rowY = (slot: number) => slot * ROW_HEIGHT + ROW_HEIGHT / 2 + MARGIN;
  const nodes: { key: string; node: SitemapNode; x: number; y: number; width: number }[] = [];
  const edges: { key: string; d: string; future: boolean }[] = [];

  function visit(n: LaidOutNode, path: string) {
    const x = colX[n.depth];
    const y = rowY(n.slot);
    nodes.push({ key: path, node: n.node, x, y, width: n.width });
    n.children.forEach((child, i) => {
      const childX = colX[child.depth];
      const childY = rowY(child.slot);
      const startX = x + n.width;
      const reach = COL_GAP * CURVE;
      edges.push({
        key: `${path}-${i}`,
        d: `M ${startX},${y} C ${startX + reach},${y} ${childX - reach},${childY} ${childX},${childY}`,
        future: Boolean(child.node.future),
      });
      visit(child, `${path}-${i}`);
    });
  }
  visit(laidOut, 'n0');

  const width = colX[maxDepth] + colWidth[maxDepth] + MARGIN;
  const height = all.filter((n) => !n.children.length).length * ROW_HEIGHT + MARGIN * 2;
  return { nodes, edges, width, height };
}

/* The app's structure as a left-to-right tree, ported from the old site's
   SitemapTree. Node widths are measured from their labels, so the layout is
   redone once the web font has loaded. Wider than its band on small screens,
   where it scrolls sideways. */
export default function SitemapTree({ root }: { root: SitemapNode }) {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (active) setFontsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const { nodes, edges, width, height } = useMemo(() => buildLayout(root), [root, fontsReady]);

  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <div className={styles.canvas} style={{ width, height }}>
          <svg className={styles.edges} width={width} height={height} aria-hidden="true">
            {edges.map((edge) => (
              <path key={edge.key} d={edge.d} className={styles.edge} data-future={edge.future} />
            ))}
          </svg>
          {nodes.map(({ key, node, x, y, width: nodeWidth }) => (
            <div
              key={key}
              className={styles.node}
              data-future={node.future}
              style={{ left: x, top: y - NODE_HEIGHT / 2, width: nodeWidth, height: NODE_HEIGHT }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
