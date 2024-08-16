import { db } from "../database/connection.js";
import {response} from "../components/response.js"

const checkTable = (tabel) => {
  const namatb = tabel.replace(/\s+/g, "");
  const sql = ` SELECT COUNT(*) AS count 
          FROM information_schema.tables 
          WHERE table_schema = 'db_stipln' 
          AND table_name = 'tb_${namatb}'`;
  const sql2 = `CREATE TABLE tb_${namatb} (id_barang INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(255) NOT NULL, no_seri VARCHAR(255),mac_address VARCHAR(255), tahun DATE, versi_os VARCHAR(255), penempatan VARCHAR(255), deskripsi TEXT, img VARCHAR(255), link VARCHAR(255))`;
  try {
    db.query(sql, (err, result) => {
        if (err) res.send(err);
        if (result[0].count !== 0) {
          console.log("ada");
        } else {
          db.query(sql2, (err, result) => {
            if (err) throw err;
            if (result) {
              console.log(result);
            }
          });
        }
      });
  } catch (error) {
    console.log("Eror")
  }
};

// create
export const createBarang =(req, res)=>{
  
   const {jenis, nama, noseri, mac, tahun, os, penempatan, deskripsi}= req.body;
  const jenisbrg = jenis.replace(/\s+/g,'').toLowerCase();
  const file = req.file.filename;
  const link = `/detail/${jenis}/${nama}`
  const img = `${req.protocol}://${req.get("host")}/img/${file}`;
  const sql = `INSERT INTO tb_${jenisbrg} (nama, no_seri, mac_address, tahun, versi_os, penempatan, deskripsi, img, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  checkTable(jenisbrg)
 try {
 db.query(sql, [nama, noseri, mac, tahun, os, penempatan, deskripsi, img, link],(err, result)=>{
    if(err){
      response( 500, err, "internal server eror", res)

      console.log(err)
    }else{
      response(201, result, "success", res)
    }
  }) 
 } catch (error) {
  console.log(error)
 }
     
}

// get barang by id
export const getBarangByid=async(req, res)=>{
  const {id} = req.params;
  const sql = `SELECT * FROM tb_${id}`
  db.query(sql, (err, result)=>{
    if(err) {
      throw err
    }else{
      response(200, result ,"Oke", res)
      }

  })
}

// get barang by nama
export const getBarangBynama=async(req, res)=>{
  const {id, nama} = req.params;
  console.log(req.params)
  const sql = `SELECT * FROM tb_${id} WHERE nama = "${nama}"`
  db.query(sql, (err, result)=>{
    if(err) {
      throw err
    }else{
      response(200, result ,"Oke", res)
      }

  })
}

// delete
export const deleteBarang = async(req, res)=>{
  const {id,tb} = req.params
  const nama_tb = tb.toLowerCase()
  const sql = `DELETE FROM tb_${nama_tb} WHERE id_barang = ?`
  db.query(sql, [id], (err, result)=>{
    if (err){
      response(500, err, "internal server eror", res)
    }else{
      response(200, result, "oke", res)
    }
  })
}

// update
export const updateBarang = async(req, res)=>{
  const {jenis, nama, noseri, mac, tahun, os, penempatan, deskripsi, id_barang} = req.body
  const jenisbrg = jenis.replace(/\s+/g,'').toLowerCase();
  const file = req.file.filename;
  const link = `/detail/${jenis}/${nama}`
  const img = `${req.protocol}://${req.get("host")}/img/${file}`;
  const sql = `UPDATE tb_${jenisbrg} SET nama =?, no_seri =?, mac_address=?, tahun =?, versi_os =?, penempatan = ?, deskripsi = ?, img = ?, link = ? WHERE id_barang = ? `
  db.query(sql, [ nama, noseri, mac, tahun, os, penempatan, deskripsi, img, link, id_barang], (err, result)=>{
    if (err) {
      response(500, err, "Internal Server eror", res)
    } else {
      response(200, result, "Success", res)
    }
  })
}