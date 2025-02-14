import { Button } from "./ui/button";

function ButtonItem({ Icon, text }) {
    return (
        <Button variant="secondary" className="flex items-center gap-2">
          <Icon className="w-4 h-4" /> {text}
        </Button>
      );
}
export default ButtonItem;
