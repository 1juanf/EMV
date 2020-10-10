const { Router } = require('express');
const router = Router();
const { getDBamb, insertamb, deleteamb, validateamb } = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const { notification } = require('../helpers/route');

//retourn center//
router.get('/central', isAuthenticated, (req, res)=>{
    res.rendirect('/center');
});
//reload//
// router.get('/ambulance/add',isAuthenticated,(req, res)=>{
//     res.render('ambulance/new-ambulance',{ users });
// });
//get ambulance table//
router.get('/tablaamb', isAuthenticated,async (req, res)=>{
      const rep = await getDBamb(users.iduser);
      const emerT = await notification();
      // console.log(rep);
      //JSON.stringify(rep)
      res.render('table/ambulanceTable',{ rep, users });
  });
//insert person//
router.post( '/ambulance/new-ambulance', isAuthenticated, async (req, res)=>{
    const {placa, codigo, marca, modelo, tipo} = req.body;
    console.log(req.body);
    var errors = 0;
    const Validate_id = await validateamb(codigo)[0];
    //console.log(Validate_id[0].idamb);
    //console.log(Validate_id);
    //console.log(Username, cargo, idcc);
    if(!tipo){
      req.flash('message','Ingrese el tipo de ambulancia');
      // errors.push({ text: 'Ingrese el tipo de ambulancia'});
      errors++;
      console.log('tipo');
    }
    if(!placa){
      // errors.push({text: 'Ingrese la placa del vehículo'});
      req.flash('message','Ingrese la placa del vehículo');
      console.log('placa');
      errors++;
    }
    if(!marca){
      // errors.push({text: 'Ingrese la marca del vehículo'});
      req.flash('message','Ingrese la marca del vehículo');
      console.log('marca');
      errors++;
    }
    if(!modelo){
      // errors.push({text: 'Ingrese el año del vehículo'});
      req.flash('message','Ingrese el año del vehículo');
      console.log('modelo');
      errors++;
    }
    if(!codigo){
      console.log('validando');
      if(!codigo)
      {
        // errors.push({text:'Ingrese un ID'});
        req.flash('message','Ingrese ID')
        console.log('Ingrese un ID');
        errors++;
      }
      if (codigo == Validate_id.idamb)
      {
        // errors.push({text:'ID existente'});
        req.flash('message','ID exsistente');
        console.log('ID existente');
        errors++;
      }
    }
    if(errors.length > 0 ){
      res.redirect('/table/amb',{
        codigo,
        tipo,
        placa,
        marca,
        modelo
      });
    }else {
        const resp = await insertamb(codigo, tipo, placa, marca, modelo, users.iduser);
        //console.log(resp);
        req.flash('success','Ambulance added successfully');
        res.rendirect('/table/amb');
    }
  });
//delete person from the table//
router.delete('/ambulance/delete/:idamb', isAuthenticated,async (req,res)=>{
    const id = await req.params.idamb;
    console.log(id);
    await deleteamb(id,users.iduser);
    res.redirect('/table/amb');
});


module.exports = router;
