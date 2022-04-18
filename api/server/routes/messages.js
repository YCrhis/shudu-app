const router = require("express").Router();
const Message = require("../models/Message");

module.exports = router;

//add
router.post("/", async (req, res) => {
  const newMessate = new Message(req.body);
  try {
    const saveMessage = await newMessate.save();
    res.status(200).json(saveMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});
