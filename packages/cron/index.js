
const { app } = require("deta");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.lib.cron(async _ => {

    const buffers = await prisma.buffer.findMany();
    
    for (let buffer of buffers) {
        const expiryDate = new Date(buffer.expiryDate);
        const today = new Date();

        if (today > expiryDate) {
            await prisma.buffer.delete({
                where: {
                    id: buffer.id
                }
            })
        }
    }
});

main();