import { QuestionTypeEnum } from "@shared/types/types";
import { JeopardyQuestion } from "../pages/Jeopardy/Jeopardy";
import { SubmitHandler, useForm } from "react-hook-form";

export type JeopardyQuestionInputs = {
  type: QuestionTypeEnum;
  question: string;
  dailyDouble: boolean;
  mediaUrl: string;
  answer: string;
  value: number;
};

type EditModalProps = {
  question: JeopardyQuestion;
  onClose: () => void;
  handleUpdateQuestion: (questionInputs: JeopardyQuestionInputs) => void;
};

const EditModal = ({
  question,
  onClose,
  handleUpdateQuestion,
}: EditModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JeopardyQuestionInputs>({
    defaultValues: {
      type: question.type,
      question: question.question,
      mediaUrl: question.mediaUrl ?? "",
      answer: question.answer,
      dailyDouble: question.dailyDouble ?? false,
      value: question.value,
    },
  });

  const selectedType = watch("type");

  const onSubmit: SubmitHandler<JeopardyQuestionInputs> = (data) => {
    handleUpdateQuestion(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 noShadow">
              Edit Question
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Question Type Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question Type
              </label>
              <select
                {...register("type", { required: "Type is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>

            {/* Dollar Value */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dollar Value
              </label>
              <input
                type="number"
                {...register("value", {
                  required: "Value is required",
                  min: { value: 100, message: "Minimum value is 100" },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 200, 400, 600"
              />
              {errors.value && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.value.message}
                </p>
              )}
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Question {selectedType !== "text" && "(Optional for media)"}
              </label>
              <textarea
                {...register("question")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter the question text..."
              />
            </div>

            {/* Media URL - only show for non-text types */}
            {selectedType !== "text" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Media URL
                </label>
                <input
                  type="text"
                  {...register("mediaUrl", {
                    required: "Media URL is required for this type",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    selectedType === "image"
                      ? "https://example.com/image.jpg"
                      : selectedType === "video"
                      ? "YouTube video ID"
                      : "https://example.com/audio.mp3"
                  }
                />
                {errors.mediaUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mediaUrl.message}
                  </p>
                )}
              </div>
            )}

            {/* Answer */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Answer
              </label>
              <input
                type="text"
                {...register("answer", { required: "Answer is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='e.g., "What is Paris?"'
              />
              {errors.answer && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.answer.message}
                </p>
              )}
            </div>

            {/* Daily Double */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("dailyDouble")}
                id="dailyDouble"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="dailyDouble"
                className="ml-3 text-sm font-semibold text-gray-700"
              >
                Mark as Daily Double
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
