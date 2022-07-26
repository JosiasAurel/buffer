import React from "react";

import { Card, useClipboard } from "@geist-ui/core";
import toast from "react-hot-toast";

type Props = {
  buffer: string | any;
};
const Buffer: React.FC<Props> = ({ buffer }): JSX.Element => {
  const { copy } = useClipboard();
  let isSerialisable = false;

  try {
    if (typeof JSON.parse(buffer) === "object") {
      isSerialisable = true;
    }
  } catch (error) {
    // pass
  }

  return (
    <Card>
      <h2>Hello World</h2>
    </Card>
  );
};

export default Buffer;
