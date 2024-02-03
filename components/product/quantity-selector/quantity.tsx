"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

const Quantity = ({ quantity, onQuantityChanged }: Props) => {
  const handleIncrement = (value: number) => {
    if (quantity + value < 1) {
      return;
    }
    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">Quantity</Label>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleIncrement(-1)}
        >
          <MinusIcon className="text-gray-500" />
        </Button>
        <Button variant="outline" className="text-xs">
          {quantity}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleIncrement(+1)}
        >
          <PlusIcon className="text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
