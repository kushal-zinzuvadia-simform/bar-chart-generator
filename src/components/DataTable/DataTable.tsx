import type { ChartItem } from '../../types/chart';

type DataTableProps = {
  data: Array<ChartItem>;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

const DataTable = ({ data, onDelete, onClearAll }: DataTableProps) => {
  return (
    <div className="border rounded-2xl p-6 w-full max-w-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Data List ({data.length})
        </h3>
        {data.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-semibold hover:cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-lg border"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="overflow-hidden border rounded-xl">
        <div className="overflow-y-auto max-h-70">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b font-semibold text-xs uppercase">
                <th className="px-4 py-3">Label (X)</th>
                <th className="px-4 py-3 text-right">Value (Y)</th>
                <th className="px-4 py-3 text-center w-16">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-12 text-center text-sm text-gray-500"
                  >
                    No data points added yet.
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0 text-sm">
                    <td className="px-4 py-3 font-medium truncate max-w-37.5">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {row.value}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onDelete(row.id)}
                        className="hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 hover:cursor-pointer transition-all duration-200"
                        title="Delete entry"
                      >
                        <img src="/assets/delete.svg" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
