const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const postRoutes = require('./routes/post');
const dotenv = require('dotenv');
// const { getPosts } = require('./routes/route');
dotenv.config();

mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true , useNewUrlParser: true }).then(data => {
	// console.log(data)
	console.log("Database connection OK");
})

mongoose.connection.on("error",err => {
	console.log(`Database connetion error: ${err}`)
})

const PORT = process.env.PORT || 8080; 

// // Kendi middlewaremiz
// const benimMiddlewareim = (req, res, next) => {
// 	console.log("Benim middlewareim yayında");
// 	next();
// };
// app.use(benimMiddlewareim);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
// app.get('/' , getPosts);
app.use('/' , postRoutes);

app.listen(PORT, () => {
	console.log(`Server ${PORT} portunda yayında`)
});


