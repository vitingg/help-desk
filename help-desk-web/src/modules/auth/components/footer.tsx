import { Button } from "../../../shared/components/button";

type FooterProps = {
  buttonValue?: string;
  onClick?: () => void;
};

export function Footer({ buttonValue, onClick }: FooterProps) {
  return (
    <Button
      size={"5xl"}
      variant={"secondary"}
      onClick={onClick}
      className="font-semibold"
    >
      {buttonValue}
    </Button>
  );
}
