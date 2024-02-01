import { Label } from "../ui/label";

interface Props {
  title: string;
}
const Title = ({ title }: Props) => {
  return <Label className="text-2xl font-semibold">{title}</Label>;
};

export default Title;
