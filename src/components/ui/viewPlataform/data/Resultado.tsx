// Resultados.tsx
import React from 'react';

interface ResultadosProps {
    score: number;
    totalQuestions: number;
}

const Resultados: React.FC<ResultadosProps> = ({ score, totalQuestions }) => {
    return (
        <div>
            <h1>Resultados del Examen</h1>
            <p>Tu puntaje: {score} / {totalQuestions}</p>
        </div>
    );
};

export default Resultados;
