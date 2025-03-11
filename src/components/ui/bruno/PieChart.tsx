// components/PieChart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface Data {
    correct: number;
    incorrect: number;
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ correct, incorrect }: Data) => {
    const data = {
        labels: ['Correctas', 'Incorrectas'],
        datasets: [
            {
                data: [correct, incorrect],
                backgroundColor: ['#4a90e2', '#26365b'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Ocultar la leyenda
            },
            datalabels: {
                color: '#fff', // Color del texto
                formatter: (value: number, context: any) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc:any, val:any) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + '%'; // Calcular porcentaje
                    return percentage; // Mostrar porcentaje
                },
            },
        },
    };

    return (
        <div style={{ width: '150px', height: '150px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
