import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchBuffers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bufferId } = req.body;

  try {
    await prisma.buffer.delete({
      select: {
        id: bufferId,
      },
      where: {},
    });

    res.json({
      status: true,
    });
  } catch (error) {
    res.json({
      status: false,
    });
  }
  return prisma.$disconnect();
}
