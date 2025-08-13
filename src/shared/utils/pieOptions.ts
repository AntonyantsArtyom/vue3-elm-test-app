export function pieOptions(title: string, data: { name: string; value: number }[]) {
  return {
    title: { text: title, left: "center" },
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
