import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchBuffers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ownerHash, publicKey } = req.body;

  try {
    const buffers = await prisma.buffer.findMany({
      where: ownerHash
        ? {
            owner: ownerHash,
          }
        : {
            publicOwner: publicKey,
          },
    });

    res.json({
      status: true,
      buffers: buffers,
    });
  } catch (error) {
    res.json({
      status: false,
    });
  }
  return prisma.$disconnect();
}
