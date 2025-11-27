import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';

export function useExport() {
  const exportToPdf = () => {
    window.print();
  };

  const exportToWord = async (elementId: string, filename: string = 'resume.docx') => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id ${elementId} not found`);
      return;
    }

    // Clone the element to avoid modifying the DOM
    const clone = element.cloneNode(true) as HTMLElement;

    // Inline styles for Word compatibility (basic implementation)
    // In a real app, we might need more complex CSS inlining logic
    const htmlString = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Resume</title>
        <style>
          body { font-family: sans-serif; }
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
      </html>
    `;

    try {
      const blob = await asBlob(htmlString);
      saveAs(blob as Blob, filename);
    } catch (error) {
      console.error('Word Export Error:', error);
    }
  };

  return {
    exportToPdf,
    exportToWord,
  };
}
