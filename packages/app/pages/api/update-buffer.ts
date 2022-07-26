import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchBuffers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bufferId, content, type, isPublic } = req.body;

  try {
    await prisma.buffer.update({
      where: { id: bufferId },
      data: {
        content,
        type,
        isPublic,
      },
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
