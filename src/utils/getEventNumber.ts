export function getCurrentCtNumber(timeStamp: number): number {
  const firstCT = 1660082400000;
  const timeDifference = firstCT - timeStamp;
  const calculateNumber = Math.floor(timeDifference / (14 * 24 * 60 * 60 * 1000));
  return Math.round(Math.abs(calculateNumber));
}
