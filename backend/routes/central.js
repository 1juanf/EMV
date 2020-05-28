const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {pool,getDBamb,getDBper,getDBemer,gertresource,getemer} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const {opEmer} = require('../helpers/route');

router.get('/central', isAuthenticated,async (req, res)=>{
    const amb = await getDBamb(users.iduser);
    const per = await getDBper(users.iduser);
    res.render('central',{users, amb, per});
});

router.get('/person/add', isAuthenticated,(req, res)=>{
    res.render('person/new-person',{ users });
});

router.get('/mapemer1', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(1);
    console.log(1);
    res.render('maps/mapemer',{ rep, users });
});
router.get('/mapemer2', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(2);
    console.log(2);
    res.render('maps/mapemer',{ rep, users });
});
router.get('/mapemer3', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(3);
    console.log(3);
    res.render('maps/mapemer',{ rep, users });
});

router.get('/map', isAuthenticated, async (req, res)=>{
  const amb = await getDBamb(users.iduser);
  const emer = await getDBemer(1);//OJO
  //const hosp = await getDBhos();
  console.log(amb, emer);
  res.render('maps/map',{amb, emer, users})
});

router.get('/mapamb', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser);
    console.log(rep);
    res.render('maps/mapamb',{ rep, users });
});

router.get('/emergency', isAuthenticated, async (req, res)=>{
    const {option} = req.body;
    const rep = await getDBemer(option);
    res.render('table/emergency',{ rep, users });
});

router.get('/ambulance/add', isAuthenticated,(req, res)=>{
    res.render('ambulance/new-ambulance',{users});
});

router.get('/tablaper', isAuthenticated, async (req, res)=>{
    const rep = await getDBper(users.iduser);
    res.render('table/personTable', { rep, users });
});

router.get('/table/amb', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser);
    res.render('table/ambulanceTable',{ rep, users });
});

router.get('/table/resour', isAuthenticated, async (req, res)=>{
  const rep = await gertresource(users.iduser);
  res.render('table/resourceTable',{ rep, users });
});

router.get('/user/logout', isAuthenticated, async(req,res)=>{
  req.logout();
  //pool.end();
  res.render('index');
});

router.get('/user/:id', (req, res)=>{
  const id = parseInt(req.params.id);
  if (typeof users === 'undefined') {
      opEmer(1,id);
      res.status(200);
      res.send('ok');
  }
  else {
    req.flash('alert','Se le ha asignado una emergencia a un vehiculo. Desea aceptarla',id);
    console.log('entro');
    res.status(200);
    res.send('ok');
  }
});

module.exports = router;
