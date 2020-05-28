const {Router} = require('express');
const router = Router();
const {getDBamb, insertamb, deleteamb, validateamb} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");

//retourn center//
router.get('/central', isAuthenticated, (req, res)=>{
    res.render('central', { users });
});
//reload//
router.get('/ambulance/add',isAuthenticated,(req, res)=>{
    res.render('ambulance/new-ambulance',{ users });
});
//get ambulance table//
router.get('/tablaamb', isAuthenticated,async (req, res)=>{
      const rep = await getDBamb(users.iduser);
      console.log(rep);
      //JSON.stringify(rep)
      res.render('table/ambulanceTable',{ rep, users });
  });
//insert person//
router.post( '/ambulance/new-ambulance', isAuthenticated, async (req, res)=>{
    const {id_amb, type_amb, placa_amb, brand_amb, model_amb} = req.body;
    console.log(req.body);
    var errors = 0;
    const Validate_id = await validateamb(id_amb)[0];
    //console.log(Validate_id[0].idamb);
    //console.log(Validate_id);
    //console.log(Username, cargo, idcc);
    if(!type_amb){
      req.flash('message','Ingrese el tipo de ambulancia');
      // errors.push({ text: 'Ingrese el tipo de ambulancia'});
      errors++;
      console.log('tipo');
    }
    if(!placa_amb){
      // errors.push({text: 'Ingrese la placa del vehículo'});
      req.flash('message','Ingrese la placa del vehículo');
      console.log('placa');
      errors++;
    }
    if(!brand_amb){
      // errors.push({text: 'Ingrese la marca del vehículo'});
      req.flash('message','Ingrese la marca del vehículo');
      console.log('marca');
      errors++;
    }
    if(!model_amb){
      // errors.push({text: 'Ingrese el año del vehículo'});
      req.flash('message','Ingrese el año del vehículo');
      console.log('modelo');
      errors++;
    }
    if(!id_amb){
      console.log('validando');
      if(!id_amb)
      {
        // errors.push({text:'Ingrese un ID'});
        req.flash('message','Ingrese ID')
        console.log('Ingrese un ID');
        errors++;
      }
      if (id_amb == Validate_id.idamb)
      {
        // errors.push({text:'ID existente'});
        req.flash('message','ID exsistente');
        console.log('ID existente');
        errors++;
      }
    }
    if(errors.length > 0 ){
      res.render('ambulance/new-ambulance',{
        id_amb,
        type_amb,
        placa_amb,
        brand_amb,
        model_amb
      });
    }else {
        const resp = await insertamb(id_amb, type_amb, placa_amb, brand_amb, model_amb, users.iduser);
        //console.log(resp);
        req.flash('success','Ambulance added successfully');
        res.render('ambulance/new-ambulance');
    }
  });
//delete person from the table//
router.delete('/ambulance/delete/:idamb', isAuthenticated,async (req,res)=>{
    const id = await req.params.id_amb;
    console.log(id);
    await deleteamb(id);
    res.redirect('../../tabla/ambulanceTable');
});


module.exports = router;
