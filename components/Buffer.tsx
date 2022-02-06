import React from "react";

import { Note, useClipboard } from "@geist-ui/react";
import BufferFile from "./BufferFile";
import toast from "react-hot-toast";

type Props = {
  buffer: string | any;
};
const Buffer: React.FC<Props> = ({ buffer }): JSX.Element => {
  const { copy } = useClipboard();

  try {
    if (typeof JSON.parse(buffer) === "object") {
      return <BufferFile buffer={buffer} />;
    } else {
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
    }
  } catch (err) {
    // pass
  }

  /* 
    if (typeof JSON.parse(buffer) === "object") {
    return <BufferFile buffer={buffer} />
    } */
};

export default Buffer;
