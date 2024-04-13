import { UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogSettingsCard from "./BlogSettingsCard";
type BlogCardProps = {
  username: string;
  date: string;
  tag: string;
  title: string;
  content: string;
  image: string;
  id: string;
  currentUsername?: string;
};

const BlogCard = ({
  username,
  date,
  tag,
  title,
  content,
  image,
  id,
  currentUsername,
}: BlogCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="w-full py-7 border-b flex flex-col items-center gap-5 md:gap-12 md:flex-row ">
      <div className="flex-1 order-2 md:order-1 ">
        <div className=" flex items-center gap-2 text-sm">
          <div className="w-7 rounded-full h-7 bg-rooster-accent flex items-center justify-center">
            {image ? (
              <UserIcon className="w-5 text-white" />
            ) : (
              <UserIcon className="w-5 text-white" />
            )}
          </div>
          <p className="text-sm uppercase">
            <Link to={`/user/${username}`}>{username}</Link>
          </p>
          <span>·</span>
          <span className="text-rooster-textSimple text-sm "> {date}</span>
          <span className="p-1 px-2 ml-auto bg-rooster-gray text-xs rounded-full ">
            {tag}
          </span>
          {currentUsername && currentUsername === username ? (
            <BlogSettingsCard blogId={id} />
          ) : null}
        </div>
        <Link to={`/blog/${id}`}>
          <span className="text-lg font-semibold mt-2 line-clamp-2 cursor-pointer">
            {title}
          </span>
        </Link>
        <div
          ref={contentRef}
          className="mt-1 text-sm text-rooster-textSecondary line-clamp-3"
        ></div>
      </div>
      <div className=" w-full overflow-hidden flex items-center justify-center order-1 rounded  md:w-28 md:h-28 ">
        <img src={image} alt="image" className="rounded" />
      </div>
    </div>
  );
};

export default React.memo(BlogCard);
