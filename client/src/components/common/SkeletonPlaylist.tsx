const SkeletonPlaylist = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse pl-6">
      <div className="flex flex-row gap-4">
        <span className="h-8 bg-gray-700 rounded-md w-48 mb-4"></span>
        <span className="h-8 bg-gray-700 rounded-md w-48 mb-4"></span>
        <span className="h-8 bg-gray-700 rounded-md w-48 mb-4"></span>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonPlaylist;
