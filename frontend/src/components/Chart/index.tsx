import { ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';

export const Chart: React.FC<{
  onClick?: (e: any, chart?: any, options?: any) => void;
  scores: any;
  labels: string[];
  strokeWidth?: number;
}> = ({ scores, labels, strokeWidth = 5, onClick }) => {
  const option: ApexOptions = {
    chart: {
      id: 'apexchart-example',
      events: {
        dataPointSelection: onClick,
      },
    },
    labels: labels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: strokeWidth,
      colors: ['#FFE09D'],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6,
      },
    },
  };

  return <ApexChart options={option} series={scores} type='polarArea' height={300} width={350} />;
};
