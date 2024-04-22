const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

const produkty = [
    { id:1, nazwa: 'Produkt 1', cena: 29.99 },
    { id:2, nazwa: 'Produkt 2', cena: 59.99 },
];

app.get('/api/produkty', (req, res) => {
    res.json(produkty);
})

app.post('/api/platnosci', (req, res) => {
    console.log(req.body); 
    res.send('Platnosc przetworzona pomyslnie');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serwer dziala na porcie ${PORT}`);
});