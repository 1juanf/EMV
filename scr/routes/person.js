const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {config,insertper, getDBper, deleteper, validateper} = require('../database');

//retourn center//
router.get('/central',(req, res)=>{
    res.render('central');
});
//get person table//
router.get('/tablaper', async (req, res)=>{
      const rep = await getDBper(users.iduser);
      console.log(rep);
      res.render('table/personTable',{ rep, users});
  });
//delete person from the table//
router.delete('/delete/:idcc',async (req,res)=>{
    const id = await req.params.idcc;
    console.log(id);
    await deleteper(id);
    res.redirect('../../tabla/personTable');
});
//reload//
router.get('/add',(req, res)=>{
    res.render('person/new-person',{users});
});
//insert person//
router.post( '/new-person' , async (req, res)=>{
  const {Username, cargo, idcc} = req.body;
  //console.log(req.body);
  const errors = [];
  //const Validate_id = await validateper(idcc);
  //console.log(Validate_id);
  //console.log(Validate_id[0].idcc);
  //console.log(Username, cargo, idcc);
  if(!Username){
    req.flash('message','Ingrese un nombre');
    errors.push({ text: 'Ingrese un Nombre'});
    console.log('Ingrese un Nombre');
  }
  if(!cargo){
    req.flash('message','Ingrese un cargo');
    //errors.push({text: 'Ingrese un cargo'});
    console.log('Ingrese un cargo');
  }
  if(!idcc){
    console.log('validando');
    if(!idcc)
    {
      //errors.push({text:'Ingrese documento de identidad'});
      req.flash('message','Ingrese documento de identidad');
      console.log('Ingrese documento de identidad');
    }
    else if(idcc == Validate_id[0].idcc)
    {
      req.flash('message','Documento ya ingresado')
      //errors.push({text:'Documento ya ingresado'});
      console.log('Documento ya ingresado');
    }
  }
  if(errors.length > 0 ){
    res.render('person/new-person',{
      errors,
      Username,
      cargo,
      idcc
    });
  }else {
      const resp = await insertper(idcc ,Username,cargo,users.iduser);
      //console.log(resp);
      req.flash('success','Perdon added successfully');
      res.render('person/new-person');
  }
});

module.exports = router;
