import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

type SaveNote = {
  buffer: string;
  key: string;
  keys: string[]
};

export default async function fetchNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { keys }: SaveNote = req.body;
    const fetchedBuffers = [];

    try {
      for (let i = 0; i < keys.length; i++) {
        const fetchedBuffer = await (await buffers.fetch({ owner: keys[i] })).items;
      fetchedBuffers.push(fetchedBuffer);
      }
    // console.log(fetchedBuffers);
      res.json(fetchedBuffers);
    } catch (err) {
      res.json({
        status: "Failed",
      });
    }
  }

  return;
}
