const SkeletonList = ({ numberToRender }: { numberToRender: number }) => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-4">
      {Array(numberToRender)
        .fill(1)
        .map((s, i) => (
          <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            <div className="flex items-center space-x-2 w-full">
              <div className="h-4 bg-gray-600 rounded-full w-32"></div>
              <div className="h-4 bg-gray-700 rounded-full w-24"></div>
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <div className="h-4 bg-gray-600 rounded-full w-full"></div>
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
              <div className="h-4 bg-gray-700 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[400px]">
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
              <div className="h-4 bg-gray-600 rounded-full w-80"></div>
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[480px]">
              <div className="h-4 bg-gray-600 rounded-full w-full"></div>
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
              <div className="h-4 bg-gray-700 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[440px]">
              <div className="h-4 bg-gray-700 rounded-full w-32"></div>
              <div className="h-4 bg-gray-700 rounded-full w-24"></div>
              <div className="h-4 bg-gray-600 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 max-w-[360px]">
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
              <div className="h-4 bg-gray-600 rounded-full w-80"></div>
              <div className="h-4 bg-gray-700 rounded-full w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
    </div>
  );
};

export default SkeletonList;
