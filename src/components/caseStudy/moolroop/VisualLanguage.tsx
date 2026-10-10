import styles from './VisualLanguage.module.css';

export interface VisualLanguageData {
  /* `fontFamily` when the face can be loaded here; otherwise the specimen
     is set in the article's own serif and says so. */
  typefaces: { name: string; role: string; fontFamily?: string }[];
  colours: string[];
}

const SPECIMEN_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIMEN_LOWER = 'abcdefghijklmnopqrstuvwxyz 0123456789';

// Swatches lighter than this (relative luminance) get dark text.
const LIGHT_SWATCH = 0.4;

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/* The app's two typefaces as specimens and its palette as large swatches,
   each labelled with its hex code. */
export default function VisualLanguage({ typefaces, colours }: VisualLanguageData) {
  return (
    <figure className={styles.figure}>
      <div className={styles.type}>
        {typefaces.map((face) => (
          <div key={face.name} className={styles.specimen} data-standin={!face.fontFamily}>
            <p className={styles.role}>
              {face.role}
              {!face.fontFamily && <span className={styles.standin}>Shown in a stand-in face</span>}
            </p>
            <p className={styles.sample} style={face.fontFamily ? { fontFamily: face.fontFamily } : undefined}>
              <span className={styles.name}>{face.name}</span>
              <span className={styles.glyphs}>{SPECIMEN_UPPER}</span>
              <span className={styles.glyphs}>{SPECIMEN_LOWER}</span>
            </p>
          </div>
        ))}
      </div>

      <ul className={styles.swatches}>
        {colours.map((hex) => (
          <li
            key={hex}
            className={styles.swatch}
            data-light={luminance(hex) > LIGHT_SWATCH}
            style={{ backgroundColor: hex }}
          >
            {hex}
          </li>
        ))}
      </ul>
    </figure>
  );
}
