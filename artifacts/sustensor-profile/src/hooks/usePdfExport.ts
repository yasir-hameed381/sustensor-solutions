import { useCallback, useRef, useState, type RefObject } from 'react';

export type PdfExportStatus = 'idle' | 'working' | 'done' | 'error';

const STATUS_RESET_MS = 4500;

// `pagebreak` and `jsPDF.compress` are valid html2pdf options that its bundled typings omit.
const PDF_OPTIONS = {
  margin: 0,
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, logging: false, scrollX: 0, scrollY: 0, windowWidth: 794 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
  pagebreak: { mode: ['css', 'legacy'] },
} as const;

/**
 * Renders the given element to a multi-page A4 PDF and downloads it.
 * html2pdf.js is loaded on demand because it is large and only needed when exporting.
 */
export function usePdfExport(sourceRef: RefObject<HTMLElement | null>, fileName: string) {
  const [status, setStatus] = useState<PdfExportStatus>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  const settle = (next: PdfExportStatus) => {
    setStatus(next);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus('idle'), STATUS_RESET_MS);
  };

  const exportPdf = useCallback(async () => {
    const source = sourceRef.current;
    if (!source || status === 'working') return;
    setStatus('working');

    try {
      const { default: html2pdf } = await import('html2pdf.js');
      await html2pdf()
        .set({ ...PDF_OPTIONS, filename: fileName })
        .from(source)
        .save();
      settle('done');
    } catch (error) {
      console.error('Failed to generate the PDF profile', error);
      settle('error');
    } finally {
      // html2pdf leaves its full-screen overlay behind when rendering throws, which would block every click.
      document.querySelectorAll('.html2pdf__overlay, .html2canvas-container').forEach((element) => element.remove());
    }
  }, [fileName, sourceRef, status]);

  return { status, exportPdf };
}
