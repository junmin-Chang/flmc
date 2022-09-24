const SkeletonPlaylist = () => {
  return (
    <div role="status" className="w-full max-w-sm animate-pulse px-6">
      <div className="w-full flex flex-row gap-4">
        <span className="h-8 bg-gray-700 rounded-md w-16 mb-4"></span>
        <span className="h-8 bg-gray-700 rounded-md w-16 mb-4"></span>
        <span className="h-8 bg-gray-700 rounded-md w-16 mb-4"></span>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonPlaylist;
