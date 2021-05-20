const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('room', { roomId: 1 });
});

module.exports = app;
