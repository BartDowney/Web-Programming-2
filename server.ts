import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { getNote, Note, getNotes, createNote, updateNote, deleteNote } from './src/app/Shared/note.model';

const app = express();

// Connect to MongoDB
const connectOptions: ConnectOptions = {};

mongoose
  .connect('mongodb://127.0.0.1:27017/notes', connectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());

// Define the Note model
const NoteSchema = new mongoose.Schema({
  title: String,
  body: String
});

type NoteModel = mongoose.Document & Note;

const NoteModel = mongoose.model<NoteModel>('Note', NoteSchema);

// Routes
// Get all notes
app.get('/api/notes', async (req: Request, res: Response) => {
  try {
    const notes: Note[] = await NoteModel.find();
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single note by id
app.get('/api/notes/:id', getNote, (req: Request, res: Response<Note>) => {
  res.json(res.locals.note);
});


// Create a new note
app.post('/api/notes', async (req: Request, res: Response) => {
  const note: Note = {
    id: null,
    title: req.body.title,
    body: req.body.body
  };

  try {
    const newNote: NoteModel = await NoteModel.create(note);
    res.status(201).json(newNote);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing note by id
app.put('/api/notes/:id', getNote, async (req: Request, res: Response) => {
  if (req.body.title != null) {
    res.locals.note.title = req.body.title;
  }

  if (req.body.body != null) {
    res.locals.note.body = req.body.body;
  }

  try {
    const updatedNote = await res.locals.note.save();
    res.json(updatedNote);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a note by id
app.delete('/api/notes/:id', getNote, async (req: Request, res: Response) => {
  try {
    await res.locals.note.remove();
    res.json({ message: 'Note deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


// Start the server
const port = 3100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});