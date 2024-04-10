const BlogSkeleton = () => {
  return (
    <div className="w-7/12 py-5 mx-auto flex gap-7">
      <div className="flex-1">
        <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse"></div>
        <div className="mt-2 h-4 w-1/2 bg-gray-100 rounded animate-pulse"></div>
        <div className="flex gap-3 items-center mt-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse"></div>
          <div>
            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
            <div className="mt-1 h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="h-96 bg-gray-100 rounded animate-pulse my-3"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <p
              key={index}
              className="mt-1 text-sm text-gray-400 line-clamp-3 animate-pulse"
            >
              <span className="inline-block h-3 w-full bg-gray-100 rounded-full animate-pulse"></span>
              <span className="inline-block h-3 w-full bg-gray-100 rounded-full animate-pulse"></span>{" "}
              <span className="inline-block h-3 w-full bg-gray-100 rounded-full animate-pulse"></span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
