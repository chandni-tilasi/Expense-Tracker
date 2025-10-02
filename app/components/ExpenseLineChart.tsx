import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseLineChartProps {
  data: { date: string; total: number }[];
  title?: string;
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ 
  data, 
  title = "Daily Expenses (Last 30 Days)" 
}) => {
  // Fill in missing dates with 0 values for better visualization
  const fillMissingDates = (data: { date: string; total: number }[]) => {
    if (data.length === 0) return [];
    
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const startDate = new Date(sortedData[0].date);
    const endDate = new Date(sortedData[sortedData.length - 1].date);
    
    const filledData: { date: string; total: number }[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const existingData = sortedData.find(item => item.date === dateStr);
      
      filledData.push({
        date: dateStr,
        total: existingData ? existingData.total : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return filledData;
  };

  const filledData = fillMissingDates(data);

  const chartData = {
    labels: filledData.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Daily Expenses',
        data: filledData.map(item => item.total),
        borderColor: '#014f99',
        backgroundColor: 'rgba(1, 79, 153, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#014f99',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#01417d',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: '#014f99',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(1, 79, 153, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#014f99',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Expenses: ₹${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(241, 241, 241, 0.8)',
        },
        ticks: {
          color: '#014f99',
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(241, 241, 241, 0.8)',
        },
        ticks: {
          color: '#014f99',
          callback: function(value) {
            return '₹' + value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExpenseLineChart;
