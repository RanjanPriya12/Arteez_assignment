const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./configs/db');
const bookRoute = require("./routes/books.route");
const userRoute = require("./routes/user.route");
const issueDBookRoute = require("./routes/book-issue.route");
const app = express();
app.use(cookieParser());
app.use(express.json());
connectDB();

app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);
app.use('/api', issueDBookRoute);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
