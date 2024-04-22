import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { useKoszyk } from '../Koszyk/KoszykContext.js';
import { useNavigate } from 'react-router-dom'; 

const Produkty = () => {
    const [produkty, setProdukty] = useState([]);
    const { dodajDoKoszyka } = useKoszyk();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProdukty = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/produkty'); 
                setProdukty(response.data);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania produktów', error);
            }
        };

        fetchProdukty(); 
    }, []);


    const przejdzDoKoszyka = () => {
        navigate('/koszyk'); 
    };

    return (
        <div>
            <h2>Lista Produktów</h2>
            <p>Test renderowania komponentu</p>
            <button onClick={przejdzDoKoszyka}>Przejdź do koszyka</button>
            {}
            <ul>
                {produkty.map(produkt => (
                    <li key={produkt.id}>
                        {produkt.nazwa} - {produkt.cena} zł
                        <button onClick={() => dodajDoKoszyka(produkt)}>Dodaj do koszyka</button>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default Produkty;
