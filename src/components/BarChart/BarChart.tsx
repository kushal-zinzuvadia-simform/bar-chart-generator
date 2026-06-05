import type { ChartItem } from '../../types/chart';

type BarChartProps = {
  data: Array<ChartItem>;
};

const BarChart = ({ data }: BarChartProps) => {
  const svgWidth = 600;
  const svgHeight = 400;

  const padding = { top: 40, right: 30, bottom: 50, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxDataValue =
    data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0;
  const maxY = maxDataValue > 0 ? Math.ceil(maxDataValue * 1.15) : 100;

  const xStep = data.length > 0 ? plotWidth / data.length : plotWidth;
  const maxBarWidth = 48;
  const barRatio = 0.6;

  return (
    <div className="border rounded-2xl p-6 w-full flex flex-col gap-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Visual Analytics</h3>
        </div>
      </div>

      <div className="relative w-full flex-1 min-h-75 flex items-center justify-center">
        <div className="w-full relative select-none">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={svgHeight - padding.bottom}
              stroke="rgba(148, 163, 184, 1)"
              strokeWidth={1.5}
            />
            <line
              x1={padding.left}
              y1={svgHeight - padding.bottom}
              x2={svgWidth - padding.right}
              y2={svgHeight - padding.bottom}
              stroke="rgba(148, 163, 184, 1)"
              strokeWidth={1.5}
            />

            {data.map((item, index) => {
              const barWidth = Math.min(xStep * barRatio, maxBarWidth);
              const barHeight = (item.value / maxY) * plotHeight;
              const xPos =
                padding.left + index * xStep + (xStep - barWidth) / 2;
              const yPos = padding.top + plotHeight - barHeight;

              return (
                <rect
                  key={index}
                  x={xPos}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  rx={5}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
