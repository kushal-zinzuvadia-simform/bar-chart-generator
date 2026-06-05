import { useEffect } from 'react';
import type { ChartItem } from '../../types/chart';

type BarChartProps = {
  data: Array<ChartItem>;
};

const BarChart = ({ data }: BarChartProps) => {
  useEffect(() => console.log(data), []);

  return (
    <div className="border rounded-2xl p-6 w-full flex flex-col gap-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Visual Analytics</h3>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
