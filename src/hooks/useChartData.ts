import { useState } from 'react';

import toast from 'react-hot-toast';
import type { AddItemProps, ChartItem } from '../types/chart';
import { validateChartInput } from '../utils/validateChartInput';

const INITIAL_DATA: Array<ChartItem> = [
  { id: '1', label: 'Jan', value: 65 },
  { id: '2', label: 'Feb', value: 80 },
  { id: '3', label: 'Mar', value: 45 },
  { id: '4', label: 'Apr', value: 95 },
  { id: '5', label: 'May', value: 75 },
  { id: '6', label: 'Jun', value: 110 },
];

export function useChartData() {
  const [chartData, setChartData] = useState<Array<ChartItem>>(INITIAL_DATA);

  function addItem({ label, value }: AddItemProps) {
    const result = validateChartInput({ chartData, label, value });

    if (result.valid === false) {
      toast.error(result.message);
      return false;
    }

    const newItem: ChartItem = {
      id: Math.random().toString(36).substring(2, 9),
      label,
      value: Number(value),
    };

    setChartData((prev) => [...prev, newItem]);
    toast.success(`Added "${label}: ${value}"`);
    return true;
  }

  function deleteItem(id: string) {
    const itemToDelete = chartData.find((item) => item.id === id);
    if (itemToDelete) {
      toast.success(`Deleted "${itemToDelete.label}"`);
    }
    setChartData((prev) => prev.filter((item) => item.id !== id));
  }

  function clearAllData() {
    setChartData([]);
    toast.success('Cleared all data points');
  }

  return { chartData, addItem, deleteItem, clearAllData };
}
