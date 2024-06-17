import { Card, Metric, Text } from '@tremor/react';


export function StatCard() {
  return (
    <Card
      className="mx-auto max-w-xs border-t-blue-500"
      decoration="top"
    //   decorationColor="blue"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Donaciones</p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">$</p>
      {/* <Donut /> */}
    </Card>
  );
}
export default StatCard