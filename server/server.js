const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const session = require('express-session');
const passport = require('passport');
const port = 3001;









const userRouter = require('./Routes/userRoute');
const dashboardRoute = require('./Routes/dashboardRoute');
const productRoute = require('./Routes/productRoute')
const homeRoute = require('./Routes/categoryRoute');
const categoryRoute = require('./Routes/categoryRoute');
const employeeRoute = require('./Routes/employeeRoute');
const contactusRoute = require('./Routes/contactusRoute');
const reactionRoute = require('./Routes/reactionRoute');
const userprofileRoute = require('./Routes/userprofileRoute');
const shoppingRoute = require('./Routes/shoppingRoute')
const googleRoute = require("./Routes/googleRoute");



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(userRouter);
app.use(dashboardRoute);
app.use(productRoute);
app.use(homeRoute);
app.use(categoryRoute);
app.use(employeeRoute);
app.use(contactusRoute);
app.use(reactionRoute);
app.use(userprofileRoute);
app.use(shoppingRoute);
app.use(googleRoute);




app.listen(port, ()=> {
    console.log(`server runnning in port ${port}`);
})



module.exports = app;