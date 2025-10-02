import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  data: { category: string; total: number }[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data }) => {
  // Generate beautiful colors for each category
  const generateColors = (count: number) => {
    const colors = [
      '#014f99', // Primary blue
      '#e11d48', // Rose red
      '#059669', // Emerald green
      '#dc2626', // Red
      '#7c3aed', // Violet
      '#ea580c', // Orange
      '#0891b2', // Cyan
      '#65a30d', // Lime
      '#c2410c', // Orange-red
      '#7c2d12', // Brown
      '#be185d', // Pink
      '#1e40af', // Blue
      '#166534', // Green
      '#92400e', // Amber
      '#581c87', // Purple
    ];
    
    // If we need more colors, generate them with better saturation
    while (colors.length < count) {
      const hue = (colors.length * 137.508) % 360; // Golden angle approximation
      colors.push(`hsl(${hue}, 75%, 45%)`);
    }
    
    return colors.slice(0, count);
  };

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: generateColors(data.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
          color: '#014f99',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          },
        },
        backgroundColor: 'rgba(1, 79, 153, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#014f99',
        borderWidth: 1,
      },
    },
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No expense data available for chart</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ExpensePieChart;
