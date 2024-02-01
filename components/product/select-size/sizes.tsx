import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Size } from "@/interfaces/product.interface";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSize: Size[];
  changeSize: (size: Size) => void;
}
const SizeSelector = ({ availableSize, selectedSize, changeSize }: Props) => {
  return (
    <div className="flex flex-col">
      <Label>Size</Label>
      <div className="flex gap-1 pt-1">
        {availableSize.map((size) => (
          <Button
            variant="outline"
            onClick={() => changeSize(size)}
            key={size}
            className={clsx(
              "h-8 rounded-md px-3 text-xs hover:bg-gray-100 border shadow-sm  transition-all text-center",

              {
                "h-8 rounded-md px-3 text-xs bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 hover:text-gray-50 transition-all text-center":
                  size === selectedSize,
              }
            )}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default SizeSelector;
