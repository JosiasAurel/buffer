
const { Deta } = require("deta");

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const notes = deta.Base("notes");

export default async function fetchNotes(req, res) {
    if (req.method === "POST") {
        const { key } = req.body;

        const notes_ = await notes.fetch({owner: key});
        const notes__ = await notes_.items;
        
        res.json({notes: notes__});
        return;
    }

    res.send("Failed");
}