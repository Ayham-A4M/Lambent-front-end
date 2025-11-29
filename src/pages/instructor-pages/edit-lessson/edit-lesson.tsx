import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGET from "@/hooks/useGet";
import SpinnerPage from "@/components/spinner-page";
import LexicalEditor from "@/components/lexal-editor";
import { Button } from "@/components/ui/button";
import usePUT from "@/hooks/usePUT";
import Spinner from "@/components/ui/spinner";
import LessonInformation from "@/components/shared/lesson-information";
import PdfViewr from "@/components/pdf-viewr";

const EditLesson = () => {
  const { lessonId, courseId } = useParams();
  const { data, isLoading } = useGET(`/api/instructor/courses/${courseId}/lessons/${lessonId}`, []);
  const [jsonState, setJsonState] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<null | string>(null);
  const formDataRef = useRef<FormData>(new FormData());
  const { mutation } = usePUT(`/api/instructor/courses/${courseId}/lessons/${lessonId}`, formDataRef.current, ["lesson"]);
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
    const fileUrl = URL.createObjectURL(file);
    setFile(file);
    setFileUrl(fileUrl);
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
            <h1 className="text-2xl text-primary  flex items-center gap-3">
              <span className="rounded-full bg-primary size-8 flex items-center justify-center text-[1rem] text-slate-200">1</span>
              Select pdf file
            </h1>

            <input type="file" accept=".pdf" className="hidden" id="input-file" onChange={handleChooseFile} />
            <div className="flex items-center gap-6">
              <label htmlFor="input-file" className="px-6 py-2 bg-primary text-slate-200 rounded-[6px] cursor-pointer">
                {file || data?.lesson?.pdfUrl ? "change file" : "choose file"}
              </label>
              {file && (
                <Button
                  className="bg-red-500 text-slate-200"
                  onClick={() => {
                    setFile(null);
                    setFileUrl(null);
                  }}
                >
                  Discard
                </Button>
              )}
            </div>
          </div>

          <PdfViewr pdfUrl={fileUrl ? fileUrl : `http://localhost:8000${data?.lesson?.pdfUrl}`} />

          <h1 className="text-2xl text-primary  flex items-center gap-3">
            <span className="rounded-full bg-primary size-8 flex items-center justify-center text-[1rem] text-slate-200 ">2</span>
            Notes and important things
          </h1>

          {data?.lesson && <LexicalEditor key={data?.lesson?._id} jsonState={jsonState} onChange={setJsonState} />}
          <div className="flex justify-end">
            <div className="flex justify-end items-center gap-6">
              {(data?.lesson?.lessonContent !== jsonState||!!file) && (
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
              <Button
                variant={"outline"}
                className="cursor-pointer border-3  border-primary text-primary  font-semibold hover:bg-primary hover:text-slate-100 "
              >
                <Link to={`/instructor/courses/${courseId}/lessons/${lessonId}/edit/quizzes`}>Management Realated Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditLesson;
