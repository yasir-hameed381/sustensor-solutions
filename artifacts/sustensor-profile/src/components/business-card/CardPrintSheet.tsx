import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { CARD_HEIGHT, CARD_WIDTH } from './CardFaces';

// 3.5in x 2in at the CSS reference resolution of 96px per inch.
const PRINT_WIDTH_PX = 3.5 * 96;
const PRINT_SCALE = PRINT_WIDTH_PX / CARD_WIDTH;

/**
 * Print-only sheet with both card faces at their real size. It is portalled outside the app root so the
 * `print-business-card` print mode (see index.css) can hide everything else.
 */
export function CardPrintSheet({ front, back }: { front: ReactNode; back: ReactNode }) {
  return createPortal(
    <div className="card-print-sheet flex-col items-center gap-[12mm] pt-[20mm]" aria-hidden="true">
      {[front, back].map((face, index) => (
        <div
          key={index}
          className="overflow-hidden outline outline-1 outline-dashed outline-[#b8b8b8] outline-offset-[3mm]"
          style={{ width: '3.5in', height: '2in' }}
        >
          <div style={{ width: CARD_WIDTH, height: CARD_HEIGHT, transform: `scale(${PRINT_SCALE})`, transformOrigin: 'top left' }}>
            {face}
          </div>
        </div>
      ))}
    </div>,
    document.body,
  );
}
