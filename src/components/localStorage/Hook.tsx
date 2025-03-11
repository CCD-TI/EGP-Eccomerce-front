// useLocalStorageObserver.js
import { useState, useEffect } from 'react';

const useLocalStorageObserver = (key:any) => {
    // Manejar el valor inicial en caso de que localStorage no tenga la clave
    const [storedValue, setStoredValue] = useState(() => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : []; // Devuelve un array vacío si no existe
    });

    const updateLocalStorage = (newValue:any) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const value = localStorage.getItem(key);
            setStoredValue(value ? JSON.parse(value) : []); // Evitar asignación de null
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [storedValue, updateLocalStorage];
};

export default useLocalStorageObserver;
