import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";
import { nanoid } from "nanoid";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

type SaveNote = {
  buffer: string;
  key: string;
};

export default async function saveNote(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { buffer, key }: SaveNote = req.body;
    // console.log(buffer);
    try {
      // console.log(buffer);
      const oneDay: number = 24 * 60 * 60; // a day in seconds
      const item = await buffers.put(
        {
          buffer,
          owner: key,
        },
        nanoid(5),
        { expireIn: oneDay }
      );
      // console.log(item);
      return res.json({
        status: "Success",
        key: item.key,
        buffer: item.buffer,
      });
    } catch (err) {
      console.log(err);
      return res.json({ status: "Failed" });
    }
  }
}
