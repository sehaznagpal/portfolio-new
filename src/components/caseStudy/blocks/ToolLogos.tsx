import CursorTooltip from '../../chrome/CursorTooltip';
import { TOOL_MARKS } from './toolMarks';
import type { ToolData } from './types';
import styles from './ToolLogos.module.css';

/* A row of round logo buttons. Each one's tooltip names the tool and what
   it was used for, on hover, keyboard focus or a tap. */
export default function ToolLogos({ tools }: { tools: ToolData[] }) {
  return (
    <ul className={styles.row}>
      {tools.map((tool) => {
        const mark = TOOL_MARKS[tool.id];
        const text = `${mark.name}: ${tool.use}`;
        return (
          <li key={tool.id}>
            <CursorTooltip text={text} pinnable>
              <button
                type="button"
                className={styles.logo}
                style={{ '--tool-color': mark.color } as React.CSSProperties}
                aria-label={text}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={mark.path} />
                </svg>
              </button>
            </CursorTooltip>
          </li>
        );
      })}
    </ul>
  );
}
