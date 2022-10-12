const express = require('express');
const dotEnv =require('dotenv');
const cors = require('cors');
const dbConnection = require('./db/connection');

dotEnv.config()

const app = express();

//db connectivity
dbConnection();

// Cors
app.use(cors());

//Request payload
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/product', require('./routes/productRoutes'));

app.get('/', (req, res, next) => {
    res.send('Hello from Node server API');
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

//Error handler middleware
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {}
    });
  });