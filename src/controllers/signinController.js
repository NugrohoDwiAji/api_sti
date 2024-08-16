import { response } from "../components/response.js";
import { db } from "../database/connection.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export const signin = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user where email = ?";
  db.query(sql, [email], (err, data) => {
    if (!email || !password) {
      response(400, "Failed", "Priksa kembali Email dan Password", res);
    } else {
      console.log(data);
      if (email === data[0].email) {
        bcrypt.compare(password, data[0].password, function(err, result){
          if(result){
            req.session.result = data;
            const username = data[0].username;
            const email = data[0].email;
            const role = data[0].role;
            const expiresIn = 60 * 1;
            const accessToken = jwt.sign(
              { username, email, role },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: expiresIn,
              }
            );
            response(200, accessToken, "Berhasil Login", res);
          }else{
            response(400, err, "Masukan email dan password dengan benar", res)
          }
        })
      } else {
        response(400, "Eror", "Masukan Email Dan Password Dengan Benar", res);
      }
    }
  });
};
