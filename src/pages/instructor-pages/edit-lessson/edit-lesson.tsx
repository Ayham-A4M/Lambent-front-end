import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGET from "@/hooks/useGet";
import SpinnerPage from "@/components/spinner-page";
import LexicalEditor from "@/components/lexal-editor";
import { Button } from "@/components/ui/button";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
import LessonInformation from "@/components/shared/lesson-information";
import { FaFileAlt } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const EditLesson = () => {
  const { lessonId, courseId } = useParams();
  const { data, isLoading } = useGET(`/api/instructor/courses/${courseId}/lessons/${lessonId}`, []);
  const [jsonState, setJsonState] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const formDataRef = useRef<FormData>(new FormData());
  const { mutation } = usePUT(
    `/api/instructor/courses/${courseId}/lessons/${lessonId}`,
    formDataRef.current,
    ["lesson"]
  );
  useEffect(() => {
    setJsonState("");
    if (data?.lesson?.lessonContent) {
      setJsonState(JSON.parse(data?.lesson?.lessonContent));
    }
  }, [data]);
  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files?.length) {
      return;
    }
    const file = e?.target?.files[0];
    setFile(file);
  };

  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("lessonContent", jsonState);
    if (file) {
      formData.append("pdfFile", file);
    }
    formDataRef.current = formData;
    mutation?.mutate();
  };
const [numberOfPage,setNumberOfPage]=useState<number>(1)
  return (
    <>
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <div className="space-y-3">
          <div className="space-y-3">
            <LessonInformation
              lesson={{
                name: data?.lesson?.name,
                lessonNumber: data?.lesson?.lessonNumber,
                description: data?.lesson?.description,
              }}
            />

            <input type="file" accept=".pdf" className="hidden" id="input-file" onChange={handleChooseFile} />
            <label
              htmlFor="input-file"
              className="px-6 py-2 bg-primary text-slate-200 rounded-[2px] cursor-pointer"
            >
              {file || data?.lesson?.pdfUrl ? "change file" : "choose file"}
            </label>
            {file ? (
              <div className="pt-6 flex items-center">
                <div className="flex w-fit justify-center text-primary flex-col gap-2">
                  <FaFileAlt className="size-14" />
                  <span className="max-w-[50%] text-[.8rem]">
                    {file?.name.slice(0, 10)}
                    {file?.name?.length > 10 ? "...(.pdf)" : ""}
                  </span>
                </div>
                <button
                  className="w-fit cursor-pointer"
                  name="discard-file"
                  onClick={() => {
                    setFile(null);
                  }}
                >
                  <FaCircleMinus className="text-2xl text-red-500" />
                </button>
              </div>
            ) : (
              data?.lesson?.pdfUrl && (
                <div className="pt-6">
                  <div className="flex w-fit justify-center text-primary flex-col gap-2">
                    <FaFileAlt className="size-14" />
                  </div>
                </div>
              )
            )}
            {data?.lesson?.lessonContent !== jsonState && (
              <div className="flex items-center justify-end">
                <Button
                  onClick={() => {
                    handleSaveChanges();
                  }}
                  className="cursor-pointer"
                >
                  {mutation.isPending ? <Spinner talwindSize="size-5" /> : "save changes"}
                </Button>
              </div>
            )}
          </div>
          <div className="w-full overflow-hidden">
            <Document file={`http://localhost:8000${data?.lesson?.pdfUrl}`}>
              <Page pageNumber={numberOfPage} renderTextLayer={false} renderAnnotationLayer={false}/>
            </Document>
            <button onClick={()=>{setNumberOfPage(prev=>prev+1)}}>inc</button>
          </div>

          {data?.lesson && (
            <LexicalEditor key={data?.lesson?._id} jsonState={jsonState} onChange={setJsonState} />
          )}
          <div className="flex justify-end">
            <div className="flex justify-end items-center">
              <Button
                variant={"outline"}
                className="cursor-pointer border-3 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-slate-100 "
              >
                <Link to={`/instructor/courses/${courseId}/lessons/${lessonId}/edit/quizzes`}>
                  Management Realated Questions
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditLesson;
