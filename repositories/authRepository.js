import db from "../config/db.js";

const createUser = (first_name, last_name, email, password, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (first_name, last_name, email, password, role, is_verified) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, password, role, false],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

const verifyUser = (email) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE users SET is_verified = TRUE WHERE email = ?", [email], (err, result) => {
      if (err) reject(err);
      resolve(result.affectedRows > 0);
    });
  });
};

export default { createUser, getUserByEmail, verifyUser };
