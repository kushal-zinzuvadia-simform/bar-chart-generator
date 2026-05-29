import { useState } from 'react';
import InputForm from './components/InputForm/InputForm';

export interface ChartItem {
  label: string;
  value: number;
}

function App() {
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h2 className="text-2xl font-semibold">Create a Bar Chart</h2>
      <InputForm />
    </div>
  );
}

export default App;
