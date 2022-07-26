import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchBuffers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ownerHash, publicKey } = req.body;

  console.log(ownerHash);
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

    console.log(buffers);

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
