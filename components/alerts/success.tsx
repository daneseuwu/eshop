import { CheckCircledIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}

const SuccessMessage = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex gap-2 w-[320px] bg-green-50 border-green-200   px-2 py-2  rounded-2xl m-2 fixed">
      <span className="pl-2">
        <CheckCircledIcon className="h-4 w-4 text-green-400" />
      </span>
      <span className="text-green-400 text-xs">{message}</span>
    </div>
  );
};

export default SuccessMessage;
