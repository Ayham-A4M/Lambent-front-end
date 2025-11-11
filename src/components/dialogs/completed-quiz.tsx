import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Spinner from "../ui/spinner";
import { Link, useParams } from "react-router-dom";

const CompletedQuizDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
      const { courseId, lessonId } = useParams();

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-500">Quiz Completed! 🎉</DialogTitle>
          <DialogDescription>
            <div className="space-y-3">
              <h1 className="text-green-500 font-bold">Congratulations!</h1>
              <div className="text-popover-foreground text-pretty ">
                <p className="mb-3">You've successfully completed the quiz!</p>
                <div className=" p-3 rounded-xl border">
                  <p className="font-semibold ">
                    You got <span className="text-green-600 font-bold">{10}</span> out of <span className="text-green-600 font-bold">{12}</span> correct!
                  </p>
                </div>
                {10 === 10 && <p className="text-green-600 font-medium mt-3">Perfect score! Amazing work! 🌟</p>}
                {/* {correctAnswers >= totalQuestions * 0.8 && correctAnswers < totalQuestions && <p className="text-green-600 font-medium mt-3 text-center">Excellent performance! Keep it up! 👍</p>} */}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                onClose();
              }}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Link to={`/courses/${courseId}/lessons/${lessonId}/view`}>Finish</Link>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompletedQuizDialog;
