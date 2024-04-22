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

let koszyk = []; 

app.post('/api/koszyk', (req, res) => {
    koszyk.push(req.body); 
    res.status(201).send('Produkt dodany do koszyka');
});

app.get('/api/koszyk', (req, res) => {
    res.json(koszyk); 
});

app.delete('/api/koszyk/:produktId', (req, res) => {
    const produktId = parseInt(req.params.produktId);
    koszyk = koszyk.filter(produkt => produkt.id !== produktId); 
    res.send('Produkt usunięty z koszyka');
});

app.post('/api/zamowienie', (req, res) => {
    const { produkty, danePlatnosci } = req.body; 

    console.log('Produkty w zamówieniu:', produkty);
    console.log('Dane płatności:', danePlatnosci);

    res.send('Zamówienie zostało przetworzone pomyślnie');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serwer dziala na porcie ${PORT}`);
});