export default function formatDate(date: Date): string {
  if (!date || isNaN(date.getTime())) {
    return " ";
  }
  const padZero = (num: number): string => String(num).padStart(2, "0");

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export const renderCellWithStyle = (params: any) => (
  <div
    style={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    {params.value}
  </div>
);
