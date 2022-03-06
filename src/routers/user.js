const express = require(`express`);
const router = new express.Router();
const User = require(`../db/models/user`);

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(err);
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});
router.patch(`/users/:id`, async (req, res) => {
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
router.delete(`/users/:id`, async (req, res) => {
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
module.exports = router;
