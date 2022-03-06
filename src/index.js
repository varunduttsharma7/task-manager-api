const express = require(`express`);
const app = express();
const util = require("util");
require("./db/mongoose-connection");
const User = require(`./db/models/user`);
const Task = require(`./db/models/task`);

const port = process.env.port || 3000;

app.use(express.json());
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(err);
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.patch(`/users/:id`, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send(`user not found`);
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(`Server Issue: ${e}`);
  }
});
app.delete(`/users/:id`, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send(`user not found`);
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(`Server Issue: ${e}`);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});
app.patch(`/tasks/:id`, async (req, res) => {
  try {
    const allowedUpdates = [`description`, `completed`];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isAllowed) {
      return res.status(404).send(`operation not allowed`);
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).send(`task not found`);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(`Server Issue: ${e}`);
  }
});
app.delete(`/tasks/:id`, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send(`task not found`);
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(`Server Issue: ${e}`);
  }
});

app.listen(port, () => {
  console.log(`app is listening on ${port}.....`);
});
