const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = 3000;


app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.disable('etag');


const productRoutes = require("../routes/productRoutes");
const orderRoutes = require ("../routes/orderRoutes");
const orderItemRoutes = require ("../routes/orderItemRoutes")

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/items", orderItemRoutes);

app.listen(port, () => {
    console.log(`Project server running on http://localhost:${port}`);
})

/* Ensure transaction handling for the deletion of products to also delete related `order_items`
* Ensure transaction handling for the deletion of orders to also delete related `order_items`
*/
