const bd = require("../database/database");

const creatNote = async (noteData) => {
  const { user_id, title, content } = noteData;
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO notes (user_id, title, content), VALUES (?, ?, ?)";
    db.run(sql, [user_id, title, content], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, user_id, title, content });
    });
  });
};

const getNotesByUserId = async (user_id) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC";
    db.all(sql, [user_id], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const updateNote = async (id, user_id, noteData) => {
  const { title, content } = noteData;
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE notes SET title = ?, content = ? WHER id = ? AND user_id = ? ";
    db.run(sql[(user_id, title, content, id)], function (err) {
      if (err) reject(err);
      else resolve({ id, title, content, changes: this.changes });
    });
  });
};

module.exports = {
  creatNote,
  getNotesByUserId,
  updateNote,
};
