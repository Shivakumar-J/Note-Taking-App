document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-note-form');
  const notesList = document.getElementById('notes');
  const editorContainer = document.getElementById('editor-container');
  
  const quill = new Quill('#editor-container', {
  theme: 'snow'
});

  let editedNoteId = null; // To store the ID of the note being edited

  // Function to render notes
  function renderNotes() {
    fetch('/notes')
      .then(response => response.json())
      .then(notes => {
        notesList.innerHTML = '';
        notes.forEach(note => {
          const li = document.createElement('li');
          li.classList.add('note-item');
          li.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button class="edit-btn">Edit 🖊️</button>
            <button class="delete-btn">Delete 🚮</button>
          `;
          const editBtn = li.querySelector('.edit-btn');
          const deleteBtn = li.querySelector('.delete-btn');

          // Attach event listeners to edit and delete buttons
          editBtn.addEventListener('click', () => editNote(note));
          deleteBtn.addEventListener('click', () => deleteNote(note.id));

          notesList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to edit a note
  function editNote(note) {
    editedNoteId = note.id;

    // Fill the form with the note's title and content
    document.getElementById('title').value = note.title;
    quill.root.innerHTML = note.content;
  }

  // Function to update an edited note
  function updateNote() {
    const title = document.getElementById('title').value;
    const content = quill.root.innerHTML; // Retrieve content from Quill editor
  
    fetch(`/notes/${editedNoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(response => response.json())
      .then(note => {
        form.reset();
        quill.root.innerHTML = ''; // Clear Quill editor content
        renderNotes();
        editedNoteId = null;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  

  // Function to add a new note
  function addNote() {
    const title = document.getElementById('title').value;
    const content = quill.root.innerHTML;

    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(response => response.json())
      .then(note => {
        console.log('Note added:', note);
        form.reset();
        renderNotes();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to delete a note
  function deleteNote(id) {
    fetch(`/notes/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Note deleted');
        renderNotes();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (editedNoteId !== null) {
      updateNote();
    } else {
      addNote();
    }
  });

  renderNotes();
});

