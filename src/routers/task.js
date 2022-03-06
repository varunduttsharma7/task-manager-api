const express = require(`express`);
const router = new express.Router();
const Task = require(`../db/models/task`);

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.patch(`/tasks/:id`, async (req, res) => {
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
router.delete(`/tasks/:id`, async (req, res) => {
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

module.exports = router;
