import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

type SaveNote = {
  buffer: string;
  key: string;
};

export default async function fetchNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key }: SaveNote = req.body;

    try {
      const fetchedBuffers = await (await buffers.fetch({ owner: key })).items;

      res.json({ fetchedBuffers });
    } catch (err) {
      res.json({
        status: "Failed",
      });
    }
  }

  return;
}
