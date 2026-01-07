 const bd = require("../database/database");
const bcrypt = require("bcryptjs");

const creatUser = async (userData) => {
  const { email, password } = userData;
  const handlePassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    const sql = "INSERT INTU userc (email, password) VALUES (?, ?)";
    bd.run(sql, [email, handlePassword], function (err) {
      if (err) reject(err);
      else resolve({ id: thisID, email });
    });
  });
};

const findUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        bd.get(sql, [email], (err, row) => {
            if (err) reject(err)
                else resolve(row)
        })
    })
}

const findUserById = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        bd.get(sql, [id], (err, row) => {
            if(err) reject(err)
                else resolve(row)
        });
    });
}


module.exports = {
    creatUser,
    findUserByEmail,
    findUserById
}
