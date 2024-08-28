import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Legend, ArcElement, ChartDataLabels);

const CircleChart = ({ value, maxValue }) => {

    const centerValue = Math.round(value / maxValue * 100);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "#ec2727");
    gradient.addColorStop(1, "#ce1212");

    const CenterTextPlugin = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { ctx: context, chartArea: { top, bottom, left, right } } = chart;

            context.save();
            context.font = "bold 24px Arial";
            context.fillStyle = "#000000";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(centerValue + "%", (left + right) / 2, (top + bottom) / 2);
            context.restore();
        },
    };

    const data = {
        labels: ["Wins", "Losses"],
        datasets: [
            {
                data: [value, maxValue - value],
                backgroundColor: [gradient, "#eeeeee"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        return null;
                    },
                },
            },
            legend: {
                display: false,
            },
            datalabels: {
                display: false
            },
            centerText: true
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: "80%"
    };

    return (
        <Doughnut
            data={data}
            options={options}
            plugins={[CenterTextPlugin]}
        />
    );
};

export default CircleChart;