import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function delteBuffer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bufferId } = req.body;

  try {
    await prisma.buffer.delete({
      where: { id: bufferId },
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
