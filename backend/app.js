
// app.js

// Import dotenv and configure it
const dotenv = require('dotenv');
dotenv.config();

// Import other dependencies
const express = require('express');
const connectDB = require('./configuration/db');
const cors = require('cors');

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users'); 
const ordersRoutes = require('./routes/orders');


// Create an Express app
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
     res.send('API is running');
});

app.use('/categories', categoriesRoutes);

app.use('/products', productsRoutes);

app.use('/orders', ordersRoutes);

app.use('/users', usersRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
