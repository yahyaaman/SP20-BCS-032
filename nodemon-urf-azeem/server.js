const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/images'));
app.get('/homepage', (request, response) => {
    response.render('../views/frontpage');
});

app.get('/contact-us', (request, response) => {
    response.send('<h1>Hello Friend</h1>');
});

app.get('/about-us', (request, response) => {
    response.send('about');
});


app.listen(8000);