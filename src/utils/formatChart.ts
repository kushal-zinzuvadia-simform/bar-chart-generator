export const truncateLabel = (label: string, maxLen: number = 12): string => {
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
};

// Heckbert's Nice Numbers algorithm
const calculateNiceNumber = (range: number, round: boolean): number => {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / Math.pow(10, exponent);
  let niceFraction: number;

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
};

export const calculateNiceTicks = (
  maxValue: number,
  ticksCount: number = 5
): { ticks: Array<number>; max: number } => {
  if (maxValue <= 0) {
    return {
      ticks: [0, 25, 50, 75, 100],
      max: 100,
    };
  }

  const tickStep = calculateNiceNumber(maxValue / (ticksCount - 1), true);
  const maxTickValue = Math.ceil(maxValue / tickStep) * tickStep;

  const ticks: Array<number> = [];

  for (let i = 0; i < ticksCount; i++) {
    ticks.push((maxTickValue / (ticksCount - 1)) * i);
  }

  return {
    ticks,
    max: maxTickValue,
  };
};
