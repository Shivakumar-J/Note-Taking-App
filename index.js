const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    id: Date.now(),
    title,
    content
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = notes.find(note => note.id === parseInt(id));
  if (note) {
    note.title = title;
    note.content = content;
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(note => note.id === parseInt(id));
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
