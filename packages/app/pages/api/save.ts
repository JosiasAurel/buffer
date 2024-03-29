import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export default async function saveBuffer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, ownerHash, content, isPublic, publicKey } = req.body;

  const currentDate = new Date(new Date().toUTCString());
  const expiryDate = new Date().setDate(currentDate.getDate() + 1);

  // write the buffer to the database
  try {
    const savedBuffer = await prisma.buffer.create({
      data: {
        content: content,
        isPublic: isPublic,
        type: type,
        publicOwner: publicKey,
        date: currentDate,
        owner: ownerHash,
        id: nanoid(5),
        expiryDate: new Date(expiryDate),
      },
    }).catch(error => console.log(error));

    res.json({
      status: true,
      buffer: savedBuffer,
    });
  } catch (error) {
    res.json({
      status: false,
      error: error,
    });
  }

  return prisma.$disconnect();
}
