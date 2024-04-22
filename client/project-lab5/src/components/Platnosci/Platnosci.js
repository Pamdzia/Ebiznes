import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Platnosci = () => {
    const [danePlatnosci, ustawDanePlatnosci] = useState({
        numerKarty: '',
        dataWaznosci: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const obsluzZmianeInputa = (zdarzenie) => {
        const { name, value } = zdarzenie.target;
        ustawDanePlatnosci(poprzedniStan => ({
            ...poprzedniStan,
            [name]: value
        }));
    };

    const wyslijPlatnosc = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/platnosci', danePlatnosci, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Płatność przetworzona pomyślnie!', response.data);
            alert('Płatność przetworzona pomyślnie!');
            navigate('/');
        } catch (error) {
            console.error('Wystąpił błąd podczas przetwarzania płatności', error);
            alert('Wystąpił błąd podczas przetwarzania płatności.');
        }
    };

    return (
        <div>
            <h1>Formularz płatności</h1>
            <form onSubmit={wyslijPlatnosc}>
                <div>
                    <label>Numer karty:</label>
                    <input
                        type="text"
                        name="numerKarty"
                        value={danePlatnosci.numerKarty}
                        onChange={obsluzZmianeInputa}
                        required
                    />
                </div>
                <div>
                    <label>Data ważności:</label>
                    <input
                        type="text"
                        name="dataWaznosci"
                        value={danePlatnosci.dataWaznosci}
                        onChange={obsluzZmianeInputa}
                        required
                    />
                </div>
                <div>
                    <label>CVV:</label>
                    <input
                        type="text"
                        name="cvv"
                        value={danePlatnosci.cvv}
                        onChange={obsluzZmianeInputa}
                        required
                    />
                </div>
                <button type="submit">Zapłać</button>
            </form>
        </div>
    );
};

export default Platnosci;
