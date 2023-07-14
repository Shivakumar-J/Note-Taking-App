document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-note-form');
  const notesList = document.getElementById('notes');

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
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          `;
          const editBtn = li.querySelector('.edit-btn');
          const deleteBtn = li.querySelector('.delete-btn');

          // Attach event listeners to edit and delete buttons
          editBtn.addEventListener('click', () => editNote(note.id));
          deleteBtn.addEventListener('click', () => deleteNote(note.id));

          notesList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Function to add a new note
  function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

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

  // Function to edit a note
  function editNote(id) {
    const title = prompt('Enter new title:');
    const content = prompt('Enter new content:');

    fetch(`/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(response => response.json())
      .then(note => {
        console.log('Note edited:', note);
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
    addNote();
  });

  renderNotes();
});
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('add-note-form');
//   const notesList = document.getElementById('notes');

//   const quill = new Quill('#editor', {
//     theme: 'snow',
//     placeholder: 'Write your note here...'
//   });

//   // Function to render notes
//   function renderNotes() {
//     fetch('/notes')
//       .then(response => response.json())
//       .then(notes => {
//         notesList.innerHTML = '';
//         notes.forEach(note => {
//           const li = document.createElement('li');
//           li.classList.add('note-item');
//           li.innerHTML = `
//             <h3>${note.title}</h3>
//             <div class="note-content">${note.content}</div>
//             <button class="edit-btn">Edit</button>
//             <button class="delete-btn">Delete</button>
//           `;
//           const editBtn = li.querySelector('.edit-btn');
//           const deleteBtn = li.querySelector('.delete-btn');

//           // Attach event listeners to edit and delete buttons
//           editBtn.addEventListener('click', () => editNote(note.id));
//           deleteBtn.addEventListener('click', () => deleteNote(note.id));

//           notesList.appendChild(li);
//         });
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   // Function to add a new note
//   function addNote() {
//     const title = document.getElementById('title').value;
//     const content = quill.root.innerHTML;

//     fetch('/notes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ title, content })
//     })
//       .then(response => response.json())
//       .then(note => {
//         console.log('Note added:', note);
//         form.reset();
//         quill.root.innerHTML = '';
//         renderNotes();
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   // Function to edit a note
//   function editNote(id) {
//     const title = prompt('Enter new title:');
//     const content = quill.root.innerHTML;

//     fetch(`/notes/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ title, content })
//     })
//       .then(response => response.json())
//       .then(note => {
//         console.log('Note edited:', note);
//         renderNotes();
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   // Function to delete a note
//   function deleteNote(id) {
//     fetch(`/notes/${id}`, {
//       method: 'DELETE'
//     })
//       .then(() => {
//         console.log('Note deleted');
//         renderNotes();
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }

//   form.addEventListener('submit', event => {
//     event.preventDefault();
//     addNote();
//   });

//   renderNotes();
// });
