const { MongoClient, ObjectId } = require("mongodb");

const connURL = "mongodb://127.0.0.1/27017";
const dbName = "task-manager";

// MongoClient.connect(connURL,(err,res)=>{
//     if (err) {
//        return console.log('error in connecting.');
//     }
//     return console.log('COnnected...');
// })

const client = new MongoClient(connURL);

async function main() {
  await client.connect();

  const db = client.db(dbName);
  //   await db
  //     .collection("tasks")
  //     .insertMany([
  //       { desc: "first task", completed: false },
  //       { desc: "second task", completed: true },
  //       { desc: "third task", completed: false },
  //     ])
  //     .then(console.log)
  //     .catch((reason) => console.log);
  // const res = await db.collection("tasks").find({ completed: false }).toArray();
  // const res = await db
  //   .collection("tasks")
  //   .updateOne(
  //     { _id: new ObjectId("61f6aeb52d6b9e3e2c652677") },
  //     { $set: { desc: "updated task" } }
  //   );
  // const res = await db.collection("tasks").updateMany(
  //   { completed: false },
  //   {
  //     $set: {
  //       completed: true,
  //     },
  //   }
  // );
  const res = await db
    .collection("tasks")
    .deleteMany({ _id: new ObjectId("61f6aeb52d6b9e3e2c652678") });
  console.log(res);
  return "connected.";
}

main()
  .then(console.log)
  .catch((err) => {
    console.log("some error");
  })
  .finally();
