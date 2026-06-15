import type { ChartItem } from '../../types/chart';
import { DataRow } from './DataRow';
import { EmptyTableState } from './EmptyTableState';

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
                <EmptyTableState />
              ) : (
                data.map((row) => (
                  <DataRow key={row.id} row={row} onDelete={onDelete} />
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
