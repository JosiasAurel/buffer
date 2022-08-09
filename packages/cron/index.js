
const { app } = require("deta");
const axios = require("axios");

app.lib.cron(async _ => {
    axios("https://BufferedCleaner.josiasaurel.repl.co")
        .then(r => console.log(r));
});

module.exports = app;
