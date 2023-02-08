const express = require('express')

const app = express()

app.use(express.json())

const pemesananController = require ("../controller/pemesanan_controller")

app.get("/getAllPemesanan", pemesananController.getAllPemesanan)

app.post("/addPemesanan", pemesananController.addPemesanan)

app.get("/findPemesanan", pemesananController.findPemesanan)

app.put("/updatePemesanan/:id", pemesananController.updatePemesanan)

app.delete("/deletePemesanan/:id", pemesananController.deletePemesanan)

module.exports = app