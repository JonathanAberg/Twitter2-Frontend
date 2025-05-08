const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/twitter-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Ansluten till MongoDB'))
.catch(err => console.error('Kunde inte ansluta till MongoDB', err));



app.get('/', (req, res) => {
    res.send('Twitter API is running');
});

app.listen(PORT, () => {
    console.log('Server är igång på port ${PORT}');
});