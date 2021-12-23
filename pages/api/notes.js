
const { Deta } = require("deta");

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const notes = deta.Base("notes");

export default async function fetchNotes(req, res) {
    if (req.method === "POST") {
        const { key } = req.body;

        const notes = await notes.fetch({owner: key}).items;

        res.json({notes});
    }

    res.send("Failed");
}