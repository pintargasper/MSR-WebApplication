import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const HalfCircleGraph = ( {value, maxValue} ) => {
    const data = {
        labels: [],
        datasets: [
            {
                data: [value, maxValue - value],
                backgroundColor: ["#ce1212", "#eeeeee"],
                borderWidth: 0
            },
        ],
    };

    const options = {
        rotation: 280,
        circumference: 160,
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                display: false
            },
            tooltip: {
                enabled: false
            },
        },
        hover: {
            mode: null
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%"
    };
    return <Doughnut data={data} options={options} />;
};

export default HalfCircleGraph;