import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchBuffers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bufferId = req.query.id;

  const currentDate = new Date(new Date().toUTCString());
  const expiryDate = new Date().setDate(currentDate.getDate() + 1);
  try {
    await prisma.buffer.update({
      where: { id: bufferId as string },
      data: {
        date: currentDate,
        expiryDate: new Date(expiryDate),
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
