import React from 'react';
import { useKoszyk } from './KoszykContext.js';
import { useNavigate } from 'react-router-dom'; 

const Koszyk = () => {
    const { koszyk, usunZKoszyka, wyczyscKoszyk } = useKoszyk();
    const navigate = useNavigate(); 

    const przejdzDoPlatnosci = () => {
        navigate('/platnosci'); 
    };

    return (
        <div>
            <h2>Koszyk</h2>
            {koszyk.length > 0 ? (
                <div>
                    <ul>
                        {koszyk.map((produkt, index) => (
                            <li key={index}>
                                {produkt.nazwa} - {produkt.cena} zł
                                <button onClick={() => usunZKoszyka(produkt.id)}>Usuń z koszyka</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={wyczyscKoszyk}>Wyczyść koszyk</button>
                    <button onClick={przejdzDoPlatnosci}>Przejdź do płatności</button> {}
                </div>
            ) : (
                <p>Koszyk jest pusty</p>
            )}
        </div>
    );
};

export default Koszyk;
