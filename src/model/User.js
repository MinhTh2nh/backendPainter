// models/User.js

const db = require('../config/database');
const util = require('util');
const query = util.promisify(db.query).bind(db);
const bcrypt = require('bcrypt');


const getUserByEmailAndPassword = async (email, password) => {
  try {
    const rows = await query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
    console.log(rows)
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (email, password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const [result] = await query('INSERT INTO user (email, password , role ) VALUES (?, ? , ? )', [email, hashedPassword, 'user']);
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
  
  
module.exports = { getUserByEmailAndPassword, createUser };
