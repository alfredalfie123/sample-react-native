export const convertSecondToTime = (secondParams: number) => {
  const hours = Math.floor(secondParams / 3600);
  const minutes = Math.floor(secondParams / 60) % 60;
  const seconds = secondParams % 60;
  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};
