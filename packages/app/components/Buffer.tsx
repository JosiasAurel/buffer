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
          <Text>
            {content}
          </Text>
          :
          <Code block>
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
