import Notes, {
  find,
  findByIdAndDelete,
  findOneAndUpdate,
  findById,
} from "../models/noteModel";

const noteCtrl = {
  //get all notes
  getNotes: async (req, res) => {
    try {
      const notes = await find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  // create a note
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
  // delete a note
  deleteNote: async (req, res) => {
    try {
      await findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted a note" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //update a note
  updateNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      await findOneAndUpdate(
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
  //get a note using its id
  getNote: async (req, res) => {
    try {
      const note = await findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default noteCtrl;
