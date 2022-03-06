const connURL = "mongodb://127.0.0.1:27017/task-manager-api";
const dbName = "task-manager-api";

const mongoose = require(`mongoose`);

mongoose
  .connect(connURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`DB Connected....`);
  });
