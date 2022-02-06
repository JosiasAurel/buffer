import React, { useState } from "react";
import { Card, Text, Button } from "@geist-ui/react";
import { nanoid } from "nanoid";

type BufferedFile = {
  type: string;
  content: string;
  size: number;
  name: string;
};

type Props = {
  buffer: string;
};

const BufferFile: React.FC<Props> = ({ buffer }): JSX.Element => {
  const [dlURL, setDLURL] = useState<string>("");
  const file: BufferedFile = JSON.parse(buffer);

  // set the data uri of file on mount
  React.useEffect(() => {
    const data = new Blob([JSON.stringify(file.content.trim())], {
      type: `application/${file.type}`,
    });

    const newDLURL = URL.createObjectURL(data);

    setDLURL(newDLURL);
  }, []);

  return (
    <Card>
      <Text>File Type : {file.type}</Text>
      <Text> Size : {Math.floor(file.size)}mb </Text>
      <Text>filename : {file.name}</Text>
      <a href={dlURL} download={`${file.name}.${file.type}`}>
        <Button>Download</Button>
      </a>
    </Card>
  );
};

export default BufferFile;
