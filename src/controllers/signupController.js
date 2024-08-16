import { response } from "../components/response.js";
import { db } from "../database/connection.js";
import regValid from "../validation/registerValidator.js";
import bcrypt from "bcrypt";

export const signup = (req, res) => {
  const hasil = regValid(req.body);
  const { username, email, password } = hasil.data;
  const sql = `INSERT INTO user (email, username, password, role) VALUES (?, ?, ?, "user")`;
  const sql2 = "SELECT email FROM user where  email = ?";
  if (hasil.message.length > 0) {
    response(400, "invalid", hasil.message[0], res);
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw err;
      bcrypt.hash(hasil.data.password, salt, function (err, hash) {
        if (err) throw err;
        db.query(sql2, [email], (err, result) => {
          if (result[0]?.email === hasil.data.email) {
            response(400, "email is alreadi", "Email Telah digunakan", res);
          } else {
            db.query(sql, [email, username, hash], (err, result) => {
              if (err) {
                response(400, "invlid", result, res);
              } else {
                response(
                  201,
                  "Akun anda berhasil di daftarkan, silahkan melakukan login...",
                  result,
                  res
                );
              }
            });
          }
        });
      });
    });
  }
};
