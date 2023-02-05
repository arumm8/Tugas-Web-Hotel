const pemesananModel = require ("../models/index").pemesanan
const query = require('sequelize').Op

exports.getAllPemesanan = async (request,response) =>{
    let pemesanan = await pemesananModel.findAll()
        return response.json({
            success : true,
            data : pemesanan,
            message : `All pemesanan have been loaded`
        })
}

exports.findPemesanan = async(request,response) =>{
    
    let id_pemesanan = request.body.id_pemesanan

    let pemesanan = await pemesananModel.findAll({ 
        where : {
        [query.or] : [
            {id_pemesanan : {[query.substring]: id_pemesanan} }
        ]
        }
    })

    return response.json({
        success : true,
        data : pemesanan,
        message: `All pemesanan have been loaded`
    })
}

exports.addPemesanan = async(request,response) =>{

    let newPemesanan = {
        nomor_pesanan: request.body.nomor_pesanan, 
        nama_pemesan: request.body.nama_pemesan,
        email: request.body.email,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_user: request.body.id_user,
        status_pemesanan: request.body.status_pemesanan,
        id_tipe_kamar: request.body.id_tipe_kamar
    }

    console.log(newPemesanan.nama_pemesan)
    pemesananModel.create(newPemesanan)
        .then(result => {
        return response.json({
            success: true, 
            data: result,
            message: `New pemesanan has been inserted`
        })
    })

    .catch(error => {
        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.updatePemesanan = async(request,response) =>{

    let dataPemesanan = {
        nomor_pesanan: request.body.nomor_pesanan, 
        nama_pemesan: request.body.nama_pemesan,
        email: request.body.email,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar,
        status_pemesanan: request.body.status_pemesanan,
        id_user: request.body.id_user
    }

    let id_pemesanan = request.params.id_pemesanan

    console.log(id_pemesanan)
    console.log(dataPemesanan)

    pemesananModel.update(dataPemesanan, {where : {id : id_pemesanan}})

    .then (result =>{
        return response.json({
        success: true,
        message: `Data pemesanan has been updated`
        })
    })

    .catch(error =>{
        return response.json({
            success: false, 
            message: error.message
        })
    })
}

exports.deletePemesanan = (request,response) =>{

    let id_pemesanan = request.params.id_pemesanan

    pemesananModel.destroy({where: {id:id_pemesanan}})

    .then(result => {
        return response.json({
            success: true,
            message: `Data pemesanan has been deleted`
        })
    })

    .catch(error => {
        /** if update's process fail */ 
        return response.json({
            success: false,
            message: error.message
        })
    })
}