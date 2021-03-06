import React from "react";

import { Note, useClipboard } from "@geist-ui/react";
import BufferFile from "./BufferFile";
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

  if (isSerialisable) {
    return <BufferFile buffer={buffer} />;
  }
  return (
    <Note
      style={{
        width: "80vw",
        overflow: "auto",
      }}
      onClick={(_) => {
        copy(buffer);
        toast("Copied to clipboard");
      }}
      label={false}
    >
      {buffer}
    </Note>
  );
};

/* 
  if (typeof JSON.parse(buffer) === "object") {
  return <BufferFile buffer={buffer} />
  } */

export default Buffer;
