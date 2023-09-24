import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Visualization = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance

  useEffect(() => {
    // Check if data is available
    if (data.length === 0) return;

    if (chartInstanceRef.current) {
      // If a chart instance already exists, destroy it
      chartInstanceRef.current.destroy();
    }

    const labels = data.map((item) => item.Year);
    const intensityData = data.map((item) => item.Intensity);
    const likelihoodData = data.map((item) => item.Likelihood);

    const ctx = chartRef.current.getContext('2d');

    const newChartInstance = new Chart(ctx, {
      type: 'bar', // You can choose the chart type you prefer
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Intensity',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: intensityData,
          },
          {
            label: 'Likelihood',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: likelihoodData,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Store the chart instance for future reference
    chartInstanceRef.current = newChartInstance;
  }, [data]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default Visualization;
