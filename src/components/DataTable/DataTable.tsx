import type { ChartItem } from '../../types/chart';

type DataTableProps = {
  data: ChartItem[];
};

const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-2 text-left">X</th>
            <th className="px-4 py-2 text-left">Y</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-4 py-8 text-center text-gray-500">
                No data points added yet.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={`${row.label}-${index}`}
                className="border-b last:border-b-0 even:bg-gray-100"
              >
                <td className="px-4 py-2">{row.label}</td>
                <td className="px-4 py-2">{row.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
