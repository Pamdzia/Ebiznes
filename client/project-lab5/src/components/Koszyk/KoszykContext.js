import React, { createContext, useContext, useState, useEffect } from 'react';

const KoszykContext = createContext();

export const useKoszyk = () => useContext(KoszykContext);

export const KoszykProvider = ({ children }) => {
    const [koszyk, setKoszyk] = useState([]);

    useEffect(() => {
        console.log('Stan koszyka zmienił się:', koszyk);
    }, [koszyk]);

    const dodajDoKoszyka = (produkt) => {
        setKoszyk((aktualnyKoszyk) => {
            const nowyKoszyk = [...aktualnyKoszyk, produkt];
            console.log('Dodawanie do koszyka:', produkt);
            console.log('Aktualizacja koszyka: ', nowyKoszyk);
            return nowyKoszyk;
        });
    };

    const usunZKoszyka = (produktId) => {
        setKoszyk((aktualnyKoszyk) => {
            const koszykPoUsunieciu = aktualnyKoszyk.filter(produkt => produkt.id !== produktId);
            console.log(`Usuwanie z koszyka produktu o id: ${produktId}`);
            console.log('Aktualizacja koszyka po usunięciu: ', koszykPoUsunieciu);
            return koszykPoUsunieciu;
        });
    };

    const wyczyscKoszyk = () => {
        console.log('Czyszczenie koszyka');
        setKoszyk([]);
    };

    return (
        <KoszykContext.Provider value={{ koszyk, dodajDoKoszyka, usunZKoszyka, wyczyscKoszyk }}>
            {children}
        </KoszykContext.Provider>
    );
};
