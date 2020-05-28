const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getUser} = require('../database');


/*passport.use('local-login',new LocalStrategy({
  usernameField : 'iduser',
  passwordField : 'password',
  passReqToCallback : true
}, async (req, iduser, password, done) =>{
  console.log(req.body)
  console.log(iduser)
  console.log(password)
}));*/
passport.use('local-login',new LocalStrategy({
  usernameField : 'iduser',
  passwordField : 'password',
  passReqToCallback: true
}, async (req,iduser,password,done)=>{
    const {op}=(req.body);
     users = await getUser(iduser);
    if (!users) {
      return done(null,false,req.flash('message','the user is not found.'));
      console.log('Not user found.');
    }else {
      console.log('1');
      if (password==users.pass) {
        console.log('2');
        if(Boolean(op) == users.entity){
            console.log('ok');
            done(null, users,req.flash('success','welcome'+ users.fullname));
        }else{
            done(null,false,req.flash('message','incorrect emtity'));
            console.log('incorrect emtity');
        }
      }else {
        return done(null,false,req.flash('message','incorrect password'));
        console.log('incorrect password');
      }
    }

}));

passport.serializeUser((users,done)=>{
  console.log(users.iduser);
  done(null,users.iduser);
});

passport.deserializeUser(async (id,done) =>{
  //console.log(id);
  const row = await getUser(id);
  done(null,row);
});
