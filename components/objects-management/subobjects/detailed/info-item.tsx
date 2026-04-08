export default function InfoItem({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="flex justify-between  text-sm border-b border-gray-200 py-2 last:border-b-0">
      <span className="left">{name}</span>
      <span className="right font-medium">{value}</span>
    </div>
  );
}
