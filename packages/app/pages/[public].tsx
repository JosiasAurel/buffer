import React from "react";
import { Card, Grid, Text, useClipboard } from "@geist-ui/core";
import { PrismaClient } from "@prisma/client";
import toast from "react-hot-toast";

type Props = { data: string };

const PublicBuffersPage: React.FC<Props> = ({ data }): JSX.Element => {
    const buffers: Buffer[] = JSON.parse(data);
    const { copy } = useClipboard();
    // console.log(data);
    return (
        <div>
            <div style={{ margin: "2em" }}>
                <Grid.Container justify="center" gap={2}>
                    {buffers.map(item => (
                        <Grid key={item.id}>
                            <Card onClick={_ => {
                                copy(item.content);
                                toast("Copied to clipboard", { icon: "📎" });
                            }}>
                                <Text>
                                    {item.content}
                                </Text>
                            </Card>
                        </Grid>
                    ))}
                </Grid.Container>
            </div>

        </div>
    )
}

export async function getServerSideProps(ctx: any) {

    const publicKey: string = ctx.query.public;
    // console.log(ctx.query);

    const prisma = new PrismaClient();

    const results = await prisma.buffer.findMany({
        where: {
            isPublic: true,
            publicOwner: publicKey
        }
    });

    // console.log(results);

    return {
        props: { data: JSON.stringify(results) }
    }
}

export default PublicBuffersPage;