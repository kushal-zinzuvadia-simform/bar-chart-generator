export const truncateLabel = (label: string, maxLen: number = 12): string => {
  if (label.length <= maxLen) return label;
  return label.slice(0, maxLen - 1) + '…';
};

// Heckbert's Nice Numbers algorithm
const niceNum = (range: number, round: boolean): number => {
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

export const getNiceTicks = (
  maxVal: number,
  ticksCount: number = 5
): { ticks: Array<number>; max: number } => {
  if (maxVal <= 0) {
    return {
      ticks: [0, 25, 50, 75, 100],
      max: 100,
    };
  }

  const range = niceNum(maxVal, false);
  const step = niceNum(range / (ticksCount - 1), true);
  const graphMin = 0;

  const ticks: Array<number> = [];
  for (let i = 0; i < ticksCount; i++) {
    ticks.push(parseFloat((graphMin + i * step).toFixed(8)));
  }

  const graphMax = ticks[ticksCount - 1];

  if (graphMax < maxVal) {
    const adjustedStep = niceNum((maxVal - graphMin) / (ticksCount - 1), false);
    const adjustedTicks: Array<number> = [];
    for (let i = 0; i < ticksCount; i++) {
      adjustedTicks.push(parseFloat((graphMin + i * adjustedStep).toFixed(8)));
    }
    return {
      ticks: adjustedTicks,
      max: adjustedTicks.at(-1),
    };
  }

  return {
    ticks,
    max: graphMax,
  };
};
