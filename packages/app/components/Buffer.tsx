import React from "react";

import { Card, useClipboard, Text, Code, Divider, Tag } from "@geist-ui/core";
import toast from "react-hot-toast";

type Props = Partial<Buffer>;

const Buffer: React.FC<Props> = ({ content, date, type, isPublic }): JSX.Element => {
  const { copy } = useClipboard();

  return (
    <Card style={{
      minWidth: "300px",
      maxWidth: "300px",
    }} onClick={_ => {
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
      <Divider />
      <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        {new Date(date).toDateString()}
        <Tag type={isPublic ? "success" : "default"}>
          {isPublic ? "Public" : "Private"}
        </Tag>
      </span>
    </Card>
  );
};

export default Buffer;
