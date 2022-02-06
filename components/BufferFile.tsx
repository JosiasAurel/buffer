
import React, { useState } from "react";
import { Card, Text, Button } from "@geist-ui/react";
import { nanoid } from "nanoid";

type BufferedFile = {
    type: string
    content: string
    size: number
}

type Props = {
    buffer: string
}

const BufferFile: React.FC<Props> = ({ buffer }): JSX.Element => {
    const [dlURL, setDLURL] = useState<string>("");
    const file: BufferedFile = JSON.parse(buffer);

    function downloadFile(): void {
        const data = new Blob([JSON.stringify(file.content)], { type: `application/${file.type}` });

        const newDLURL = URL.createObjectURL(data);

        setDLURL(newDLURL)
    }
    return (
        <Card>
            <Text>
                File Type : {file.type}
            </Text>
            <Text> Size : {Math.floor(file.size)}mb </Text>
            <a href={dlURL} download={`${nanoid()}.${file.type}`}>
                <Button>
                    Download
                </Button>
            </a>
        </Card>
    )
}

export default BufferFile;