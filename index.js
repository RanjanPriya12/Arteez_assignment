const express = require('express');
const connectDB = require('./configs/db');
const bookRoute = require("./routes/books.route");
const userRoute = require("./routes/user.route");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
connectDB();

app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
