const bd = require("../database/database");

const creatNote = async (noteData) => {
  const { user_id, title, content } = noteData;
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO notes (user_id, title, content), VALUES (?, ?, ?)"
    db.run(sql, [user_id, title, content], function(err) {
        if (err) reject(err)
            else resolve({ id: this.lastID, user_id, title, content })
    })
  })
};

module.exports = {
  creatNote,
};
