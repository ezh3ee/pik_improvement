export default function GeocoderListLoading() {
  return (
    <div className="flex w-[250px] max-w-md flex-col bg-white">
      <div className="animate-pulse p-4 border border-gray-300 rounded-lg cursor-pointer">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="animate-pulse p-4 border border-gray-300 rounded-lg cursor-pointer">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
      <div className="animate-pulse p-4 border border-gray-300 rounded-lg cursor-pointer">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}
