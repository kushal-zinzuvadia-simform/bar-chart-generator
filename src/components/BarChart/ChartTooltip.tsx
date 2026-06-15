import { truncateLabel } from '../../utils/formatChart';

type ChartTooltipProps = {
  x: number;
  y: number;
  label: string;
  value: number;
  plotWidth: number;
  paddingRight: number;
};

const TOOLTIP_WIDTH = 110;
const TOOLTIP_HEIGHT = 48;
const TOOLTIP_OFFSET = 12;
const TOOLTIP_PADDING_X = 10;
const LABEL_FONT_SIZE = 13;

// Approximate character width for the label
const APPROX_CHAR_WIDTH = LABEL_FONT_SIZE * 0.56;
const MAX_LABEL_CHARS = Math.floor(
  (TOOLTIP_WIDTH - TOOLTIP_PADDING_X * 2) / APPROX_CHAR_WIDTH
);

export const ChartTooltip = ({
  x,
  y,
  label,
  value,
  plotWidth,
  paddingRight,
}: ChartTooltipProps) => {
  const rawX = x - TOOLTIP_WIDTH / 2;
  const clampedX = Math.min(
    Math.max(rawX, 0),
    plotWidth + paddingRight - TOOLTIP_WIDTH
  );
  const tooltipY = y - TOOLTIP_HEIGHT - TOOLTIP_OFFSET;
  const truncatedLabelText = truncateLabel(label, MAX_LABEL_CHARS);

  return (
    <g pointerEvents="none">
      <rect
        x={clampedX}
        y={tooltipY}
        width={TOOLTIP_WIDTH}
        height={TOOLTIP_HEIGHT}
        rx={6}
        fill="#1e293b"
        opacity={0.92}
      />
      <polygon
        points={`
          ${x - 6},${tooltipY + TOOLTIP_HEIGHT}
          ${x + 6},${tooltipY + TOOLTIP_HEIGHT}
          ${x},${tooltipY + TOOLTIP_HEIGHT + 6}
        `}
        fill="#1e293b"
        opacity={0.92}
      />
      <text
        x={clampedX + TOOLTIP_WIDTH / 2}
        y={tooltipY + 18}
        textAnchor="middle"
        fontSize={LABEL_FONT_SIZE}
        fill="#94a3b8"
        fontWeight={400}
      >
        {truncatedLabelText}
      </text>
      <text
        x={clampedX + TOOLTIP_WIDTH / 2}
        y={tooltipY + 36}
        textAnchor="middle"
        fontSize={15}
        fill="#f1f5f9"
        fontWeight={600}
      >
        {value}
      </text>
    </g>
  );
};
