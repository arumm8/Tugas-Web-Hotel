const express = require('express')

const app = express()

app.use(express.json())

const detailPemesananController = require ("../controller/detail_pemesanan_controller")

app.get("/getAllDetailPemesanan", detailPemesananController.getAllDetailPemesanan)

app.post("/addDetailPemesanan", detailPemesananController.addDetailPemesanan)

app.get("/findDetailPemesanan", detailPemesananController.findDetailPemesanan)

app.put("/updateDetailPemesanan/:id", detailPemesananController.updateUser)

app.delete("/deleteDetailPemesanan/:id", detailPemesananController.deleteDetailPemesanan)

module.exports = app