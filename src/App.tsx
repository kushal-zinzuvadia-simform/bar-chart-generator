import { Toaster } from 'react-hot-toast';
import InputForm from './components/InputForm/InputForm';
import { useChartData } from './hooks/useChartData';
import { useEffect } from 'react';

function App() {
  const { chartData, addItem } = useChartData();

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <Toaster />
      <h2 className="text-2xl font-semibold">Create a Bar Chart</h2>
      <InputForm onAdd={addItem} />
    </div>
  );
}

export default App;
