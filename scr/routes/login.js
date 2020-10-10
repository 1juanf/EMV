const {Router} = require('express');
const router = Router();
const passport = require('passport');

// router.get('/login',(req, res)=>{
//   //console.log('entro');
//     res.render('login/login');
// });

router.post('/login', (req, res, next) => {
  const {op} = req.body;
  console.log(req.body);
  if(op==1){
      passport.authenticate('local-login',{
      successRedirect : '/central',
      failureRedirect : '/',
      failureFlash : true
    })(req, res, next);
    //console.log('1');
  }
  if(op==0){
    res.render('hospital')
    //console.log('2');
  // passport.authenticate('local-login',{
  //     successRedirect :'./hospital',
  //     failureRedirect :'/login',
  //     failureFlash : true
  //   })(req, res, next);
  }
});

module.exports = router;
