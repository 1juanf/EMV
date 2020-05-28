
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
console.log(process.env.NODE_ENV);

const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const methodoverride =require('method-override');
const flash = require('connect-flash');
require('dotenv').config();

//initializationsnew-person
const app = express();
require('./config/passport');
require('./helpers/route');

//settings
app.set('port',process.env.PORT)
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middelwares
app.use(methodoverride('_method'));
app.use(session({
  secret:'emvcenter',
  resave: true,
  saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//global
app.use((req,res,next)=> {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.alert = req.flash('alert');
  app.locals.users = req.users;
  next();
});

//routs
app.use(require('./routes/index'));
app.use(require('./routes/central'));
app.use('/person',require('./routes/person'));
app.use(require('./routes/login'));
app.use(require('./routes/hospital'));
app.use(require('./routes/ambulance'));

//static fails
app.use(express.static(path.join(__dirname, 'public')));

//star the server
app.listen(app.get('port'),() =>{
    console.log('server op port', app.get('port'));
})
