export const getStats = (data = []) => {
  if (!data || data.length === 0) return { avg: 0, min: 0, max: 0, sum: 0 };

  const sum = data.reduce((a, b) => a + b, 0);
  const avg = sum / data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);

  return {
    avg: parseFloat(avg.toFixed(1)),
    min: parseFloat(min.toFixed(1)),
    max: parseFloat(max.toFixed(1)),
    sum: parseFloat(sum.toFixed(1)),
  };
};
