import { CrossCircledIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}
const ErrorMessage = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex gap-2 w-[320px] bg-red-50 border-red-200   px-2 py-2  rounded-lg m-2 fixed">
      <span className="pl-2">
        <CrossCircledIcon className="h-4 w-4 text-red-400" />
      </span>
      <span className="text-red-400 text-xs">{message}</span>
    </div>
  );
};

export default ErrorMessage;
