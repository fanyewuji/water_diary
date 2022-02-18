const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to Water Diary!'
    })
})

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/water', require('./routes/water'));


app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})