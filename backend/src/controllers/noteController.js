const {} = require("../models/noteModel");

const createNoteHandler = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user_id = req.user ? req.user.id : req.session.userId;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content required.!" });
    }
    const note = await createNote({ user_id, title, content });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNoteHandler = async (req, res) => {
  try {
    const user_id = req.user ? req.user.id : req.session.userId;
    const notes = await getNoteHandler(user_id);
    res.json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

const updateNoteHandler = async(req, res) => {
        try {
            
        } catch (error) {
            res.status(500).json({success: false, message: error.message})
        }
}

module.exports = {
  createNoteHandler,
  getNoteHandler,
  updateNoteHandler
};
