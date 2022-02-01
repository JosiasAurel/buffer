import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

type SaveNote = {
  buffer: string
  key: string
}

export default function saveNote(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { buffer, key }: SaveNote = req.body;
    try {
      buffers.put({
        buffer,
        owner: key,
        date: new Date().toUTCString(),
      });
      res.json({ status: "Success" });
    } catch (err) {
      res.json({ status: "Failed" });
    }
    return;
  }
}
