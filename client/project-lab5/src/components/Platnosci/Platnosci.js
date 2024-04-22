import { useEffect } from 'react';
import axios from 'axios';

const Platnosci = () => {
    useEffect(() => {
        const danePlatnosci = {
            numerKarty: '1234567890123456',
            dataWaznosci: '01/23',
            cvv: '123'
        };

        const wyslijPlatnosc = async () => {
            try {
                const response = await axios.post('http://localhost:3001/api/platnosci', danePlatnosci);
                console.log('Płatność przetworzona pomyślnie!', response.data); 
            } catch (error) {
                console.error('Wystąpił błąd podczas przetwarzania płatności', error);
            }
        };

        wyslijPlatnosc();
    }, []);

    return null; 
};

export default Platnosci;
