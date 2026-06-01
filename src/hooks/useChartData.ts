import { useState } from 'react';
import toast from 'react-hot-toast';
import type { ChartItem } from '../types/chart';
import { validateChartInput } from '../utils/validateChartInput';

export function useChartData() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  function addItem(label: string, value: string) {
    const result = validateChartInput(chartData, label, value);

    if (result.valid === false) {
      toast.error(result.message);
      return false;
    }

    setChartData((prev) => [...prev, { label, value: Number(value) }]);

    toast.success(`Added data "${label}: ${value}"`, { duration: 3000 });
    return true;
  }

  return { chartData, addItem };
}
