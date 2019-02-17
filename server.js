require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// express-mysql-session
const MySQLStore = require('express-mysql-session')(session);

const db = require('./models');
const dbStringToOptionsObj = require('./utils/dbStringToOptionsObj');

const app = express();
const PORT = process.env.PORT || 3000;

// var options = process.env.JAWSDB_URL || process.env.DATABASE_URL;
const options = dbStringToOptionsObj(
  process.env.JAWSDB_URL || process.env.DATABASE_URL,
);

// console.log("Database Options", JSON.stringify(options, null, 2));

const sessionStore = new MySQLStore(options);

// require passport.js
require('./config/passport.js')(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// express-validator
/** **************************************** */
app.use(expressValidator());

// passport-validation and express-session
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/** **************************************** */
// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

// Routes
// require("./routes/apiRoutes")(app);
require('./routes/htmlRoutes')(app);
require('./routes/loginRoutes')(app);

const syncOptions = { force: false };
// var syncOptions = { force: true }; //Drop Table

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT,
    );
  });
});

module.exports = app;
