const express = require(`express`);
const app = express();
const util = require("util");
require("./db/mongoose-connection");
const userRoutes = require(`./routers/user`);
const taskRoutes = require(`./routers/task`);

const port = process.env.port || 3000;

app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.listen(port, () => {
  console.log(`app is listening on ${port}.....`);
});
