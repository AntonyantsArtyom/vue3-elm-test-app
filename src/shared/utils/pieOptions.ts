export function pieOptions(data: { name: string; value: number }[]) {
  return {
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        type: "pie",
        radius: "50%",
        data,
        label: { show: false },
        labelLine: { show: false },
      },
    ],
  };
}
