import { NextApiRequest, NextApiResponse } from "next";

import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const buffers = deta.Base("buffers");

export default async function fetchBuffer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { bufferKey } = req.body;

    try {
      const fetchedBuffer = await buffers.get(bufferKey);

      res.json(fetchedBuffer);
    } catch (err) {
      res.json({
        status: "Failed",
      });
    }
  }

  return;
}
