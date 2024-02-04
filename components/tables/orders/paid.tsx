import { CiBadgeDollar } from "react-icons/ci";

export const Yes = () => {
  return (
    <span className="flex items-center gap-1 borde-green-200 rounded-2xl text-green-700 text-xs">
      <CiBadgeDollar size={20} />
      Paid
    </span>
  );
};

export const No = () => {
  return (
    <span className="flex items-center gap-1 borde-red-200 rounded-2xl text-red-700 text-xs">
      <CiBadgeDollar size={20} />
      No Paid
    </span>
  );
};
