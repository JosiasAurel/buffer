import React from "react";

import { Card, useClipboard, Text, Code, Divider, Badge, Button } from "@geist-ui/core";
import toast from "react-hot-toast";

type Props = Partial<Buffer>;

const Buffer: React.FC<Props> = ({ content, date, type, isPublic }): JSX.Element => {
  const { copy } = useClipboard();

  return (
    <Card style={{
      minWidth: "300px",
      maxWidth: "300px",
    }} >
      <div onClick={_ => {
        copy(content);
        toast("Copied to clipboard", { icon: "📎" });
      }}>
        {
          type === "text" ?
            <Text style={{ overflow: "scroll" }}>
              {content}
            </Text>
            :
            <Text my={0}>
              <Code classic={true} style={{ overflow: "scroll" }} block >
                {content}
              </Code>
            </Text>
        }
      </div>

      <Divider />
      <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <Badge type={isPublic ? "success" : "default"}>
          {isPublic ? "Public" : "Private"}
        </Badge>
        <Button auto scale={0.35}>
          Edit
        </Button>
        <Button type="error" auto scale={0.35}>
          Delete
        </Button>
      </span>
    </Card>
  );
};

export default Buffer;
