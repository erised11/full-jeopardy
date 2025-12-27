import { QuestionType } from "@shared/types/types";
import { JeopardyQuestion } from "../pages/Jeopardy/Jeopardy";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  type: QuestionType;
  question: string;
  dailyDouble: boolean;
  mediaUrl: string;
  answer: string;
};

type EditModalProps = {
  question: JeopardyQuestion;
  onClose: () => void;
};

const EditModal = ({ question, onClose }: EditModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="absolute inset top-0 left-0 w-full h-[100vh] bg-black/50">
        <div className="relative flex flex-col justify-center mx-auto w-3/4 h-3/4 bg-slate-100  gap-4 ">
          <input defaultValue={question.type} {...register("type")} />
          <input defaultValue={question.question} {...register("question")} />
          <input
            defaultValue={question.mediaUrl ?? ""}
            {...register("mediaUrl")}
          />
          <input defaultValue={question.answer} {...register("answer")} />
          <input
            type="checkbox"
            checked={question.dailyDouble ?? false}
            {...register("type")}
          />
          <div className="absolute bottom-2 right-2 hover:cursor-pointer">
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditModal;
