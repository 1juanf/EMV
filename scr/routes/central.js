const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {pool,getDBamb,getDBper,getDBemer,gertresource,getemer,getUsapp, getDBhos, setUserapp} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");
const {opEmer, notification} = require('../helpers/route');

router.get('/central', isAuthenticated,async (req, res)=>{
    const amb = await getDBamb(users.iduser,0);
    const per = await getDBper(users.iduser);
    const emerT = await notification();
    console.log(emerT);
    res.render('center',{users, amb, per, emerT});
});

//Emergencias Atendidas//---------------------------------------------------------------------------------
router.get('/mapemer1', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(3);
    const emerT = await notification();
    // const amb = await getDBamb(users.iduser);
    // const hos = await getDBhos();
    // console.log(rep,amb);
    // console.log(1);
    res.render('maps/mapemer',{ rep, users, emerT});
});

//General//---------------------------------------------------------------------------------
router.get('/mapemer', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(3);
    const emerT = await notification();
    const amb = await getDBamb(users.iduser,1);
    const hos = await getDBhos();
    // console.log(rep,amb);
    // console.log(1);
    res.render('maps/mapall',{ rep, users, emerT, amb, hos });
});

//emergencias en atención//---------------------------------------------------------------------------------
router.get('/mapemer2', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(2);
    const emerT = await notification();
    // console.log(2);
    res.render('maps/mapemer',{ rep, users, emerT });
});

// emergencias sin atender//---------------------------------------------------------------------------------
router.get('/mapemer3', isAuthenticated, async (req, res)=>{
    const rep = await getDBemer(1);
    const emerT = await notification();
    // console.log(3);
    res.render('maps/mapemer',{ rep, users, emerT });
});

//ambulancias disponibles//---------------------------------------------------------------------------------
router.get('/map', isAuthenticated, async (req, res)=>{
  const rep = await getDBamb(users.iduser,1);
  const emerT = await notification();
  res.render('maps/map',{rep, users, emerT})
});

//ambulancias no disponibles//---------------------------------------------------------------------------------
router.get('/NDmapamb', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser,4);
    const emerT = await notification();
    // console.log(rep);
    res.render('maps/map',{ rep, users, emerT });
});

//Ambulancias en atención//---------------------------------------------------------------------------------
router.get('/mapamb', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser,2);
    const emerT = await notification();
    // console.log(rep);
    res.render('maps/map',{ rep, users, emerT });
});

//Ambulancias //---------------------------------------------------------------------------------
router.get('/mapamball', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser,0);
    const emerT = await notification();
    // console.log(rep);
    res.render('maps/map',{ rep, users, emerT });
});


router.get('/emergency', isAuthenticated, async (req, res)=>{
    const {option} = req.body;
    const rep = await getDBemer(option);
    const emerT = await notification();
    res.render('table/emergency',{ rep, users, emerT });
});


router.get('/tablaper', isAuthenticated, async (req, res)=>{
    const rep = await getDBper(users.iduser);
    const emerT = await notification();
    res.render('table/personTable', { rep, users, emerT });
});

router.get('/table/amb', isAuthenticated, async (req, res)=>{
    const rep = await getDBamb(users.iduser,0);
    const emerT = await notification();
    res.render('table/ambulanceTable',{ rep, users, emerT });
});

router.get('/table/resour', isAuthenticated, async (req, res)=>{
  const rep = await gertresource(users.iduser);
  const emerT = await notification();
  res.render('table/resourceTable',{ rep, users, emerT });
});

  router.get('/user/logout', isAuthenticated, async(req,res)=>{
  req.logout();
  //pool.end();
  res.render('index');
});

router.get('/note/:id', (req, res)=>{
  const id = req.params.id;
  console.log(id);
  console.log(typeof users);
  if (typeof users === 'undefined') {
      opEmer(1,id);
      setUserapp(id);
      res.status(200);
      res.send('ok');
  }
  else {
    req.flash('alert','Se le ha asignado una emergencia a un vehiculo. Desea aceptarla',id);
    console.log('entro');
    opEmer(1,id);
    setUserapp(id);
    res.redirect('/central')
  }
});

module.exports = router;


// router.get('/person/add', isAuthenticated,(req, res)=>{
//     res.render('person/new-person',{ users });
// });
// router.get('/ambulance/add', isAuthenticated,(req, res)=>{
//     res.render('ambulance/new-ambulance',{users});
// });
