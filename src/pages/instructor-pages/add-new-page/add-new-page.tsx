import LexicalEditor from "@/components/lexal-editor"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { useParams } from "react-router-dom";
import usePOST from "@/hooks/usePOST";

const AddNewPage = () => {
  const [state, setState] = useState<string>("");
  const { lessonId, courseId } = useParams();
  const { mutation } = usePOST(`/api/instructor/course/${courseId}/lesson/${lessonId}/new-page`, { pageContent: state });

  return (
    <div className="space-y-6">
      <LexicalEditor onChange={setState} />
      <Button onClick={() => { mutation.mutate() }}>
        Save Page
      </Button>
    </div>
  )
}

export default AddNewPage