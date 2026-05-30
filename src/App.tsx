import { Toaster } from 'react-hot-toast';
import InputForm from './components/InputForm/InputForm';
import { useChartData } from './hooks/useChartData';
import DataTable from './components/DataTable/DataTable';

function App() {
  const { chartData, addItem } = useChartData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <Toaster />
      <h2 className="text-2xl font-semibold">Create a Bar Chart</h2>
      <InputForm onAdd={addItem} />
      <DataTable data={chartData} />
    </div>
  );
}

export default App;
