import type { ChartItem } from '../types/chart';

type ValidationResult = { valid: true } | { valid: false; message: string };

type ChartInput = {
  chartData: Array<ChartItem>;
  label: string;
  value: string;
};

export function validateChartInput({
  chartData,
  label,
  value,
}: ChartInput): ValidationResult {
  if (!label) return { valid: false, message: 'Please add X-axis data.' };

  if (!/[a-zA-Z0-9]/.test(label))
    return {
      valid: false,
      message: 'X-axis label cannot contain only special characters.',
    };

  if (value === '') return { valid: false, message: 'Please add Y-axis data.' };

  if (isNaN(Number(value)))
    return { valid: false, message: 'Y-axis must be a number.' };

  if (Number(value) < 0)
    return { valid: false, message: 'Y-axis must be non-negative.' };

  const isDuplicate = chartData.some(
    (item) => item.label.toLowerCase() === label.toLowerCase()
  );

  if (isDuplicate)
    return { valid: false, message: 'X-axis label must be unique.' };

  return { valid: true };
}
