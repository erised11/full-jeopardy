import { QuestionType } from "@shared/types/types";
import { JeopardyQuestion } from "../pages/Jeopardy/Jeopardy";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";

export type JeopardyQuestionInputs = {
  type: QuestionType;
  question: string;
  dailyDouble: boolean;
  mediaUrl: string;
  answer: string;
};

type EditModalProps = {
  question: JeopardyQuestion;
  onClose: () => void;
  hanldeUpdateQuestion: (questionInputs: JeopardyQuestionInputs) => void;
};

const EditModal = ({
  question,
  onClose,
  hanldeUpdateQuestion,
}: EditModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<JeopardyQuestionInputs>();
  const onSubmit: SubmitHandler<JeopardyQuestionInputs> = (
    data: JeopardyQuestionInputs
  ) => {
    hanldeUpdateQuestion(data);
  };

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
          <div className="flex absolute bottom-2 right-2 gap-4">
            <Button type="button" onClick={onClose} text="Close" />
            <Button type="submit" text="Save" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditModal;
