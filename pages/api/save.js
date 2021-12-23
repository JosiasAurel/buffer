
const { Deta } = require("deta");

const deta = Deta(process.env.NEXT_PUBLIC_DETA_PROJECT_KEY);

const notes = deta.Base("notes");

export default function saveNote(req, res) {
    if (req.method === "POST") {
        const { note, key } = req.body;

        try {
            notes.put({
                note,
                owner: key
            });
            res.json({status: "Success"});
        } catch(err) { res.json({status: "Failed"}); }
        return;
    }

    res.send("Save Function");
}