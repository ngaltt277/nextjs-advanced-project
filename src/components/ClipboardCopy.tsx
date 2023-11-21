import { useCopy } from "@/utils/use-copy";
import { Button } from "antd";

type Props = {
  content: string;
};

export function ClipboardCopy({ content }: Props) {
  const { onCopy } = useCopy();

  return (
    <div className="clipboard-copy">
      {content && (
        <Button type="text" onClick={() => onCopy(content)}>
          {content}
        </Button>
      )}
    </div>
  );
}
