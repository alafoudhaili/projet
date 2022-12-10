const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const session = require("express-session");
var bodyParser = require('body-parser')

const AdminJSMongoose = require("@adminjs/mongoose");
const User = require("./models/user");

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

mongoose.set("strictQuery", true);

function mongooseConnection() {
  mongoose.connect(
    "mongodb+srv://ala:20101998ala@cluster0.tqmkeb7.mongodb.net/projet?retryWrites=true&w=majority",
    (err, done) => {
      if (err) {
        console.log(err);
      }
      if (done) {
        console.log("connexion avec succes");
      }
    }
  );
}

function startServer() {
    app.use('/public', express.static(__dirname + '/public'));
    // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  app.set('view engine', 'ejs');

  mongooseConnection();

  const admin = new AdminJS({
    resources: [User],
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.use(
    session({
      secret: "keyboard cat",
      saveUninitialized: true,
      resave: true,
      cookie: { maxAge: 60000 * 5 },
    })
  );

  //defining routes
  app.use("/public", require("./routes/public"));
  app.use("/auth", require("./routes/auth"));

  app.listen(port, () => {
    console.log(`server a lecoute sur port ${port}`);
  });
}

startServer();
