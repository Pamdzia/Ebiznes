import React, { useEffect } from 'react';
import axios from 'axios';

const Produkty = () => {
    useEffect(() => {
        const fetchProdukty = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/produkty'); 
                console.log(response.data); 
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania produktów', error);
            }
        };

        fetchProdukty(); 
    }, []);

    return null; 
};

export default Produkty;
