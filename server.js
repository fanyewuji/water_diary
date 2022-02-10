const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to Water Diary!'
    })
})

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})