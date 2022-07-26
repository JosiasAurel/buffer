import React from "react";

import { Card, useClipboard, Text, Code, Divider } from "@geist-ui/core";
import toast from "react-hot-toast";

type Props = Partial<Buffer>;

const Buffer: React.FC<Props> = ({ content, date, type }): JSX.Element => {
  const { copy } = useClipboard();

  return (
    <Card onClick={_ => {
      copy(content);
      toast("Copied to clipboard", { icon: "📎" });
    }}>
      {
        type === "text" ?
          <Text style={{ overflow: "scroll" }}>
            {content}
          </Text>
          :
          <Code style={{ overflow: "scroll" }} block my={0}>
            {content}
          </Code>
      }
      <Divider />
      <span>
        {new Date(date).toDateString()}
      </span>
    </Card>
  );
};

export default Buffer;
