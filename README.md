# Note Taking App
The Note Taking App is a simple application that allows users to create, edit, and delete notes with titles and content. 

## Features

- Add notes with titles and content.
- Edit existing notes.
- Delete notes.


## Usage

1. Install the required dependencies by running the following command in your terminal:  npm install


2. Set up the database:
- The app communicates with a MySQL database for storing and managing notes.
- Make sure you have MySQL installed and running.
- create a table called "notes"
  
    SQL Query for creating the notes table :
  
        CREATE TABLE notes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            content TEXT,
        );


3. Start the server by running the following command:  node app.js

4. Open your web browser and navigate to `http://localhost:3000` to use the Note Taking App.


## How to Use

1. **Add a Note:**
- Fill in the title and use the Quill editor to add content.
- Click the "Save" button to add the note.

2. **Edit a Note:**
- In the "Notes" list, click the "Edit" button for the note you want to edit.
- The title and content of the note will appear in the form fields.
- Modify the title or content as needed.
- Click the "Save" button to update the note.

3. **Delete a Note:**
- In the "Notes" list, click the "Delete" button for the note you want to delete.
- The note will be removed from the list.

