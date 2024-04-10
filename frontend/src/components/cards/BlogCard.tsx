import { UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type BlogCardProps = {
  username: string;
  date: string;
  tag: string;
  title: string;
  content: string;
  image: string;
  id: string;
};

const BlogCard = ({
  username,
  date,
  tag,
  title,
  content,
  image,
  id,
}: BlogCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="w-full py-5 border-b flex items-center gap-12 ">
      <div className="flex-1">
        <div className=" flex items-center gap-2 text-sm">
          <div className="w-7 rounded-full h-7 bg-rooster-accent flex items-center justify-center">
            <UserIcon className="w-5 text-white" />
          </div>
          <p className="text-sm uppercase">
            {username} &nbsp;·
            <span className="text-rooster-textSimple text-sm"> {date}</span>
          </p>

          <span className="p-1 px-2 ml-auto bg-rooster-gray text-xs rounded-full ">
            {tag}
          </span>
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
      <div className="w-28 h-28 overflow-hidden flex items-center justify-center">
        <img src={image} alt="image" />
      </div>
    </div>
  );
};

export default BlogCard;
