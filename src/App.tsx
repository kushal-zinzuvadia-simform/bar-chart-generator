import DataTable from './components/DataTable/DataTable';
import InputForm from './components/InputForm/InputForm';
import { useChartData } from './hooks/useChartData';

function App() {
  const { chartData, addItem } = useChartData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Create a Bar Chart</h1>
      <InputForm onAdd={addItem} />
      <DataTable data={chartData} />
    </div>
  );
}

export default App;
