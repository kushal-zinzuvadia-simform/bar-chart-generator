import BarChart from './components/BarChart/BarChart';
import DataTable from './components/DataTable/DataTable';
import InputForm from './components/InputForm/InputForm';
import { useChartData } from './hooks/useChartData';

function App() {
  const { chartData, addItem, deleteItem, clearAllData } = useChartData();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans">
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:py-12 z-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Create a Bar Chart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6 w-full items-center lg:items-stretch">
            <InputForm onAdd={addItem} />
            <DataTable
              data={chartData}
              onDelete={deleteItem}
              onClearAll={clearAllData}
            />
          </div>

          <div className="lg:col-span-7 w-full">
            <BarChart data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
