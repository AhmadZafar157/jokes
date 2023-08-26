const express = require('express');
const app = express();
const connectDB = require('./mongo_config.js');
const authentication = require('./mddlewares/authentication.js');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes.js');
const categoryRoutes = require('./Routes/categoryRoutes.js');
const jokeRoutes = require('./Routes/jokeRoutes.js');


const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(authentication);
console.log("came to index!");
app.use('/', authRoutes);
app.use('/', categoryRoutes);
app.use('/', jokeRoutes);

app.listen(PORT, async () => {
    // Call the run function from mongo_config.js
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
