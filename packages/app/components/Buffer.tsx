import React from "react";
import {
  Card,
  useClipboard,
  Text,
  Code,
  Divider,
  Badge,
  Button,
} from "@geist-ui/core";
import toast from "react-hot-toast";
import { deleteBuffer } from "../utils/handlers";

type Props = Partial<Buffer> & { editHandler: Function };

const Buffer: React.FC<Props> = ({
  content,
  id,
  type,
  isPublic,
  editHandler,
}): JSX.Element => {
  const { copy } = useClipboard();

  return (
    <Card
      style={{
        minWidth: "300px",
        maxWidth: "300px",
      }}
    >
      <div
        onClick={(_) => {
          copy(content);
          toast("Copied to clipboard", { icon: "📎" });
        }}
      >
        {type === "text" ? (
          <Text style={{ overflow: "scroll" }}>{content}</Text>
        ) : (
          <Code classic={true} style={{ overflow: "scroll" }} block>
            {content}
          </Code>
        )}
      </div>

      <Divider />
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Badge type={isPublic ? "success" : "default"}>
          {isPublic ? "Public" : "Private"}
        </Badge>
        <Button auto scale={0.35} onClick={(_) => editHandler()}>
          Edit
        </Button>
        <Button
          type="error"
          auto
          scale={0.35}
          onClick={(_) => {
            toast.promise(deleteBuffer(id), {
              loading: "Deleting...",
              success: "Deleted",
              error: "Failed",
            });
          }}
        >
          Delete
        </Button>
      </span>
    </Card>
  );
};

export default Buffer;
