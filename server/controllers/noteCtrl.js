const Notes = require("../models/noteModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;

      const newNote = new Notes({
        title,
        content,
        user_id: req.user.id,
        name: req.user.name,
      });
      // res.json({ user_id: req.user.id, name: req.user.name })
      await newNote.save();
      res.json({ message: "Created a new note." });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted a note" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
        }
      );
      res.json({ message: "Updated a note" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = noteCtrl;
