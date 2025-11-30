import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "./ui/button";
import Spinner from "./ui/spinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewr = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numberOfPage, setNumberOfPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setNumberOfPage(1);
  }
  const [windowSize, setWindowSize] = useState<number>(window?.innerWidth);
  const parentRef = useRef<null | HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, [windowSize]);
  return (
    <div ref={parentRef} className="w-full">
      <Document file={pdfUrl ? pdfUrl : ""} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          loading={
            <div className="w-full h-full flex items-center justify-center">
              <Spinner />
            </div>
          }
          pageNumber={numberOfPage}
          width={parentWidth}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex py-6 items-center gap-6">
        <Button
          disabled={numberOfPage === 1}
          className="text-slate-200"
          onClick={() => {
            if (numberOfPage > 1) setNumberOfPage((prev) => prev - 1);
          }}
        >
          Prev
        </Button>
        <Button
          disabled={numberOfPage == numPages}
          className="text-slate-200"
          onClick={() => {
            console.log(numberOfPage + 1, "number of paaaaage");
            if (numberOfPage<numPages) setNumberOfPage((prev) => prev + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PdfViewr;
