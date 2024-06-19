import { DonutChart } from '@tremor/react';

const datahero = [
  {
    name: 'Noche Holding AG',
    value: 9800,
  },
  {
    name: 'Rain Drop AG',
    value: 4567,
  },
  {
    name: 'Push Rail AG',
    value: 3908,
  },
  {
    name: 'Flow Steal AG',
    value: 2400,
  },
  {
    name: 'Tiny Loop Inc.',
    value: 2174,
  },
  {
    name: 'Anton Resorts Holding',
    value: 1398,
  },
];

const dataFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export const Donut = () => (
  <>
    <div className="mx-auto space-y-12">
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          donut variant 1
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="donut"
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          pie variant
        </span>
        <div className="flex justify-center">
          <DonutChart
            data={datahero}
            variant="pie"
            valueFormatter={dataFormatter}
            onValueChange={(v) => console.log(v)}
          />
        </div>
      </div>
    </div>
  </>
);