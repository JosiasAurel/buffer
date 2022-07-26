import React from "react";
import {
  Card,
  useClipboard,
  Text,
  Code,
  Divider,
  Badge,
  Button,
  Spacer,
  Tooltip,
} from "@geist-ui/core";
import { RefreshCw } from "@geist-ui/react-icons";
import toast from "react-hot-toast";
import { deleteBuffer } from "../utils/handlers";

type Props = Partial<Buffer> & { editHandler: Function };

// pls forgive me
function RemainingTime(expiryDate: number): string {
  const expiryTime = new Date(new Date(expiryDate).toUTCString()).getTime();
  const difference = expiryTime - new Date(new Date().toUTCString()).getTime();

  const hours = Math.abs(difference / (1000 * 60 * 60));
  const minutes = Math.abs(difference / (1000 * 60) - hours * 60);

  return `${hours.toFixed(0)}h ${minutes.toFixed(0)}mins`;
}

const Buffer: React.FC<Props> = ({
  content,
  id,
  type,
  isPublic,
  editHandler,
  expiryDate,
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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
        <Spacer />
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Badge type={"default"}>
            Expires In : {RemainingTime(expiryDate)}
          </Badge>
          <Tooltip
            text={
              "Refresh. (This will reset this buffer's countdown to 24 hours.)"
            }
          >
            <Button auto icon={<RefreshCw />} scale={0.35} px={0.6} />
          </Tooltip>
        </span>
      </div>
    </Card>
  );
};

export default Buffer;
