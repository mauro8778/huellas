import { BarChart } from '@tremor/react';


const chartData = [
  {
    name: 'Refugio A',
    'Donaciones': 500,
  },
  {
    name: 'Refugio B',
    'Donaciones': 300,
  },
  {
    name: 'Refugio C',
    'Donaciones': 400,
  },
  {
    name: 'Refugio D',
    'Donaciones': 200,
  },
  {
    name: 'Refugio E',
    'Donaciones': 200,
  },
  {
    name: 'Refugio F',
    'Donaciones': 200,
  },
  {
    name: 'Refugio G',
    'Donaciones': 200,
  },
  {
    name: 'Refugio H',
    'Donaciones': 200,
  },
  {
    name: 'Refugio I',
    'Donaciones': 200,
  },
];

const dataFormatter = (number: number | bigint) => Intl.NumberFormat('us').format(number).toString();

export function BarChartShelter() {
  return (
    <div className=' bg-white shadow-2xl rounded-s-xl rounded-e-xl p-6' >
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Donaciones a Refugios
      </h3>
      <BarChart
        className="mt-6 h-72 "
        data={chartData}
        index="name"
        categories={['Donaciones']}
        colors={['teal']}

        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </div>
  );
}
