import expres from "express";
import { createBarang, deleteBarang, getBarangByid, getBarangBynama, updateBarang } from "../controllers/barangController.js";
import { upload } from "../midleware/saveImg.js";

const barangRouter = expres.Router();

barangRouter
.route("/")
.post(upload.single("file"),createBarang)
.put(upload.single("file"),updateBarang)
barangRouter
barangRouter
.route("/delete/:id/:tb")
.delete(deleteBarang)
barangRouter
.route("/:id")
.get(getBarangByid)
barangRouter
.route("/:id/:nama")
.get(getBarangBynama)



export default barangRouter