import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/authAtom";
import axios from "axios";
import { useEffect, useRef } from "react";
import BlogSkeleton from "../skeleton/BlogSkeleton";

const Querfn = async ({
  id,
  token,
}: {
  id: string | undefined;
  token: string;
}) => {
  try {
    const response = await axios.get(
      `https://rooster.singhsunny031001.workers.dev/api/v1/blog/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

const Blog = () => {
  const { id } = useParams();
  const { token } = useRecoilValue(authState);

  const { isLoading, data: blog } = useQuery({
    queryKey: ["blog", id, token],
    queryFn: () => Querfn({ id, token }),
  });

  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (contentRef.current && blog?.content) {
      contentRef.current.innerHTML = blog.content;
    }
  }, [blog?.content]);

  if (isLoading) {
    return <BlogSkeleton />;
  }

  return (
    <div className="w-1/2 py-5 mx-auto mt-7">
      <Link to={"/home"}>
        <span className="flex items-center text-sm cursor-pointer">
          <ChevronLeftIcon className="w-4" /> Back
        </span>
      </Link>
      <h1 className="text-3xl font-semibold mt-5">{blog.title}</h1>
      <div className="flex gap-3 items-center my-3">
        <div className="w-7 rounded-full h-7 bg-rooster-accent flex items-center justify-center">
          <UserIcon className="w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold leading-4">{blog.author?.name}</h3>
          <span className="text-sm text-rooster-textSecondary">
            {blog.author?.username}
          </span>
        </div>
      </div>
      <p className="text-rooster-textSecondary text-sm">
        Posted on {blog.date}
      </p>
      <div className="my-5">
        <img src={blog.image} alt="" className="w-full" />
      </div>
      <div className="content mt-3 text-sm" ref={contentRef}></div>
    </div>
  );
};

export default Blog;
