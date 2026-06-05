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

  const ticksCount = 5;

  const yTicks = Array.from({ length: ticksCount }, (_, i) =>
    Math.round((maxY / (ticksCount - 1)) * i)
  );

  const count = data.length;

  const xStep = count > 0 ? plotWidth / count : plotWidth;

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

            {yTicks.map((tickValue) => {
              const yPos =
                padding.top + plotHeight - (tickValue / maxY) * plotHeight;

              return (
                <g key={tickValue}>
                  <line
                    x1={padding.left}
                    y1={yPos}
                    x2={svgWidth - padding.right}
                    y2={yPos}
                    stroke="#888b90"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />

                  <text
                    x={padding.left - 10}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize={18}
                    fill="#64748b"
                  >
                    {tickValue}
                  </text>
                </g>
              );
            })}

            {data.map((item, index) => {
              const barWidth = Math.min(xStep * barRatio, maxBarWidth);
              const barHeight = (item.value / maxY) * plotHeight;
              const xPos =
                padding.left + index * xStep + (xStep - barWidth) / 2;
              const yPos = padding.top + plotHeight - barHeight;

              return (
                <g key={item.id}>
                  <rect
                    x={xPos}
                    y={yPos}
                    width={barWidth}
                    height={barHeight}
                    fill="#6366f1"
                    rx={5}
                  />

                  <text
                    x={xPos + barWidth / 2}
                    y={svgHeight - padding.bottom + 20}
                    textAnchor="middle"
                    fontSize={18}
                    fill="#64748b"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
