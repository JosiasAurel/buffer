const { app, Deta } = require("deta");
const { DETA_PROJECT } = require("./config");
const deta = Deta(DETA_PROJECT);

const buffers = deta.Base("buffers");

app.lib.cron(async (event) => {
  const fetchedBuffers = await buffers.fetch();

  fetchedBuffers.items.forEach((item) => {
    buffers.delete(item.key);
  });
});

module.exports = app;
