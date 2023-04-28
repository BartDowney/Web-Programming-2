import { Request, Response, NextFunction } from 'express';

export interface Note {
  id: number | null;
  title: string;
  body: string;
}

const notes: Note[] = [];

export function getNote(req: Request, res: Response, next: NextFunction) {
  // Retrieve a single note by ID
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find((n) => n.id === noteId);

  if (note) {
    res.json({ note });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
}

export function getNotes(req: Request, res: Response, next: NextFunction) {
  // Retrieve all notes
  res.json({ notes });
}

export function createNote(req: Request, res: Response, next: NextFunction) {
  // Create a new note
  const { title, body } = req.body;
  const newNote: Note = { id: null, title, body };
  const generatedId = Date.now();
  newNote.id = generatedId;
  notes.push(newNote);
  res.status(201).json({ message: 'Note created', note: newNote });
}

export function updateNote(req: Request, res: Response, next: NextFunction) {
  // Update an existing note
  const noteId = parseInt(req.params.id, 10);
  const { title, body } = req.body;
  const noteIndex = notes.findIndex((n) => n.id === noteId);

  if (noteIndex !== -1) {
    const updatedNote: Note = { id: noteId, title, body };
    notes[noteIndex] = updatedNote;
    res.json({ message: 'Note updated', note: updatedNote });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
}

export function deleteNote(req: Request, res: Response, next: NextFunction) {
  // Delete a note
  const noteId = parseInt(req.params.id, 10);
  const noteIndex = notes.findIndex((n) => n.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
}
