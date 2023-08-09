const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '',             // Replace with Host
  user: '',             // User
  password: '',         // Password
  database: ''          // Database name
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  connection.query('SELECT * FROM notes ORDER BY id DESC', (error, results) => {
    if (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ message: 'Error retrieving notes' });
    } else {
      res.json(results);
    }
  });
});


app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  connection.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (error, results) => {
      if (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'Error adding note' });
      } else {
        const newNote = {
          id: results.insertId,
          title,
          content
        };
        res.status(201).json(newNote);
      }
    }
  );
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const [result] = await connection.promise().query(
      'UPDATE notes SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ id, title, content });
  } catch (error) {
    console.error('Server-Side Error:', error);
    res.status(500).json({ message: 'Error updating note' });
  }
});


app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM notes WHERE id = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Error deleting note' });
      } else {
        res.sendStatus(204);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

