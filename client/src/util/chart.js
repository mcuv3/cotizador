export const formatDataToChart = (consumptionsData) => {
  const data = [0, 0, 0, 0, 0, 0];

  for (let i of consumptionsData) {
    const indexGroup = i.bimester - 1;
    data[indexGroup] = data[indexGroup] + i.kw;
  }
  const chartValues = {
    labels: [
      "Bimestre 1",
      "Bimestre 2",
      "Bimestre 3",
      "Bimestre 4",
      "Bimestre 5",
      "Bimestre 6",
    ],
    series: [data],
  };

  return chartValues;
};

export const getHighest = (consumptionsData) => {
  const { series } = formatDataToChart(consumptionsData);
  const highest = series[0].sort((a, b) => b - a);
  return highest[0] + 300;
};
