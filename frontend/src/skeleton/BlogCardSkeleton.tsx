const Skeleton = () => {
  return (
    <div className="w-full py-5 border-b">
      <div className="flex items-center gap-12 ">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-200 animate-pulse"></div>
            <div className="text-xs">
              <span className="inline-block h-3 w-20 bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
              <span className="ml-1 inline-block h-3 w-10 bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
            </div>
            <span className="p-1 px-2 ml-auto bg-gray-100 dark:bg-gray-200 text-xs rounded-full animate-pulse">
              <span className="inline-block h-4 w-10 bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
            </span>
          </div>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2 animate-pulse">
            <span className="inline-block h-5 w-1/2 bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
          </h3>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 line-clamp-3 animate-pulse">
            <span className="inline-block h-3 w-full bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
            <span className="inline-block h-3 w-full bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>{" "}
            <span className="inline-block h-3 w-full bg-gray-100 dark:bg-gray-200 rounded-full animate-pulse"></span>
          </p>
        </div>
        <div className="w-28 h-28 overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

const BlogCardSkeleton = () => {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
};

export default BlogCardSkeleton;
