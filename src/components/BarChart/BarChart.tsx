import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import type { ChartItem } from '../../types/chart';
import { calculateNiceTicks, truncateLabel } from '../../utils/formatChart';
import { ChartTooltip } from './ChartTooltip';

type BarChartProps = {
  data: Array<ChartItem>;
};

type TooltipState = {
  id: string | null;
  visible: boolean;
  x: number;
  y: number;
  label: string;
  value: number;
};

const BarChart = ({ data }: BarChartProps) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const [tooltip, setTooltip] = useState<TooltipState>({
    id: null,
    visible: false,
    x: 0,
    y: 0,
    label: '',
    value: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const rect = entries[0].contentRect;
      setContainerWidth(rect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const showTooltip = (
    item: ChartItem,
    xPos: number,
    yPos: number,
    barWidth: number
  ) => {
    setTooltip({
      id: item.id,
      visible: true,
      x: xPos + barWidth / 2,
      y: yPos,
      label: item.label,
      value: item.value,
    });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({
      ...prev,
      visible: false,
      id: null,
    }));
  };

  if (data.length === 0) {
    return (
      <div className="border rounded-2xl p-6 w-full flex flex-col gap-4 relative min-h-87.5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Visual Analytics</h3>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
            No data available. Add data points to generate a chart.
          </p>
        </div>
      </div>
    );
  }

  const maxDataValue = Math.max(...data.map((item) => item.value));
  const ticksCount = 5;
  const { ticks: yTicks, max: maxY } = calculateNiceTicks(
    maxDataValue,
    ticksCount
  );

  // Styling settings
  const minBarWidth = 24;
  const maxBarWidth = 48;
  const barRatio = 0.6;
  const minXStep = minBarWidth / barRatio; // 40

  const count = data.length;
  const shouldRotate =
    data.some((item) => item.label.length > 6) || data.length > 8;

  const maxTickLabelLength = Math.max(
    ...yTicks.map((val) => val.toString().length),
    1
  );
  const paddingLeft = Math.max(55, maxTickLabelLength * 8.5 + 15);

  const padding = {
    top: 60,
    right: 30,
    bottom: shouldRotate ? 75 : 45,
    left: paddingLeft,
  };

  // width of plot area
  const containerPlotWidth = Math.max(
    0,
    containerWidth - padding.left - padding.right
  );
  const plotWidth = Math.max(containerPlotWidth, count * minXStep);
  const xStep = plotWidth / count;

  const svgHeight = 400;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  return (
    <div
      ref={containerRef}
      className="border rounded-2xl p-6 w-full flex flex-col gap-4 relative"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Visual Analytics</h3>
        </div>
      </div>

      <div className="relative w-full grow flex items-stretch min-h-75">
        <div className="shrink-0" style={{ width: padding.left }}>
          <svg
            width={padding.left}
            height={svgHeight}
            className="overflow-visible block"
          >
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={svgHeight - padding.bottom}
              stroke="rgba(148, 163, 184, 1)"
              strokeWidth={1.5}
            />

            {yTicks.map((tickValue, index) => {
              const yPos =
                padding.top + plotHeight - (tickValue / maxY) * plotHeight;

              return (
                <g key={`y-tick-${index}-${tickValue}`}>
                  <text
                    x={padding.left - 10}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize={12}
                    className="fill-slate-500 font-mono"
                  >
                    {tickValue}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="overflow-x-auto overflow-y-hidden grow select-none scrollbar-thin scrollbar-thumb-slate-300">
          <svg
            width={plotWidth + padding.right}
            height={svgHeight}
            className="overflow-visible block"
          >
            <line
              x1={0}
              y1={svgHeight - padding.bottom}
              x2={plotWidth}
              y2={svgHeight - padding.bottom}
              stroke="rgba(148, 163, 184, 1)"
              strokeWidth={1.5}
            />

            {yTicks.map((tickValue, index) => {
              const yPos =
                padding.top + plotHeight - (tickValue / maxY) * plotHeight;

              return (
                <line
                  key={`grid-${index}-${tickValue}`}
                  x1={0}
                  y1={yPos}
                  x2={plotWidth}
                  y2={yPos}
                  stroke="rgba(226, 232, 240, 0.8)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              );
            })}

            {data.map((item, index) => {
              const barWidth = Math.min(xStep * barRatio, maxBarWidth);
              const barHeight = (item.value / maxY) * plotHeight;
              const xPos = index * xStep + (xStep - barWidth) / 2;
              const yPos = padding.top + plotHeight - barHeight;

              return (
                <g key={item.id}>
                  <rect
                    x={xPos}
                    y={yPos}
                    width={barWidth}
                    height={barHeight}
                    tabIndex={0}
                    aria-label={`${item.label}: ${item.value}`}
                    fill={
                      tooltip.visible && tooltip.id === item.id
                        ? '#4f46e5'
                        : '#6366f1'
                    }
                    rx={5}
                    style={{ cursor: 'pointer', transition: 'fill 0.15s ease' }}
                    onMouseEnter={() => showTooltip(item, xPos, yPos, barWidth)}
                    onMouseLeave={hideTooltip}
                    onFocus={() => showTooltip(item, xPos, yPos, barWidth)}
                    onBlur={hideTooltip}
                  />

                  {shouldRotate ? (
                    <text
                      x={xPos + barWidth / 2}
                      y={svgHeight - padding.bottom + 16}
                      textAnchor="end"
                      transform={`rotate(-40, ${xPos + barWidth / 2}, ${svgHeight - padding.bottom + 16})`}
                      fontSize={11}
                      className="fill-slate-500 font-medium"
                    >
                      {truncateLabel(item.label)}
                    </text>
                  ) : (
                    <text
                      x={xPos + barWidth / 2}
                      y={svgHeight - padding.bottom + 20}
                      textAnchor="middle"
                      fontSize={11}
                      className="fill-slate-500 font-medium"
                    >
                      {item.label}
                    </text>
                  )}
                </g>
              );
            })}

            {tooltip.visible && (
              <ChartTooltip
                x={tooltip.x}
                y={tooltip.y}
                label={tooltip.label}
                value={tooltip.value}
                plotWidth={plotWidth}
                paddingRight={padding.right}
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
