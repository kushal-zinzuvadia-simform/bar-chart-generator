import type { ChartItem } from '../../types/chart';

type DataRowProps = {
  row: ChartItem;
  onDelete: (id: string) => void;
};

export const DataRow = ({ row, onDelete }: DataRowProps) => (
  <tr className="border-b last:border-b-0 text-sm">
    <td className="px-4 py-3 font-medium truncate max-w-37.5">{row.label}</td>
    <td className="px-4 py-3 text-right font-mono">{row.value}</td>
    <td className="px-4 py-3 text-center">
      <button
        onClick={() => onDelete(row.id)}
        className="hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 hover:cursor-pointer transition-all duration-200"
        title="Delete entry"
      >
        <img src="/images/delete.svg" alt="Delete" />
      </button>
    </td>
  </tr>
);
