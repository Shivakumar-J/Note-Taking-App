# Note Taking App
A note-taking application which allows users to effortlessly create, edit and delete notes, providing a seamless and organized way to capture and manages thoughts.

## Features

- Add notes with titles and content.
- Edit existing notes.
- Delete notes.


## Usage

1. Install the required dependencies by running the following command in your terminal:  npm install


2. Set up the database:
- The app communicates with a MySQL database for storing and managing notes.
- Keep the credentials of your database in index.js file.
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
