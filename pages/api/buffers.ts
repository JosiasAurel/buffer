import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

export default async function fetchNotes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key } = req.body;

    const fetchedBuffers = await (await buffers.fetch({ owner: key })).items;

    res.json({ fetchedBuffers });
    return;
  }

  res.send("Failed");
}
