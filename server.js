/** load library express */
const express = require(`express`)

/** create object that instances of express */ 
const app = express()

/** define port of server */ 
const PORT = 8000

/** load library cors */ 
const cors = require(`cors`)

const bodyParser = require('body-parser')

/** open CORS policy */ 
app.use(cors())

/** define all routes */
// const detailPemesananRoute = require("./routes/detail_pemesanan_routes")
// const {getAllDetailPemesanan, findDetailPemesanan,addDetailPemesanan,updateDetailPemesanan,deleteDetailPemesanan} = require("./controller/detail_pemesanan_controller")

const kamarRoute = require("./routes/kamar_routes")
const {getAllKamar, findKamar, addkamar, updateKamar, deleteKamar} = require("./controller/kamar_controller")

const pemesananRoute = require("./routes/pemesanan_routes")
const {getAllPemesanan, findPemesanan, addPemesanan, updatePemesanan, deletePemesanan} = require("./controller/pemesanan_controller")

const tipeKamarRoute = require("./routes/tipe_kamar_routes")
const {getAllTipeKamar, findTipeKamar, addTipeKamar, updateTipeKamar, deleteTipeKamar} = require("./controller/tipe_kamar_controller")

const userRoute = require("./routes/user_routes")
const {getAllUser, findUser, addUser, updateUser, deleteUser} = require("./controller/user_controller")

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/** define prefix for each route */ 
// app.use(`/detail_pemesanan`, detailPemesananRoute)
app.use(`/kamar`, kamarRoute)
app.use(`/pemesanan`, pemesananRoute)
app.use("/tipe_kamar", tipeKamarRoute)
app.use("/user", userRoute)
//app.use(express.static( dirname))

/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server of Pembayaran hotel runs on port 
    ${PORT}`)
})