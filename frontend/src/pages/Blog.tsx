import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
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
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-5 mx-auto md:w-10/12 lg:w-6/12 lg:py-5 lg:mt-7">
      <span
        onClick={handleBack}
        className="flex items-center text-sm cursor-pointer"
      >
        <ChevronLeftIcon className="w-4" /> Back
      </span>
      <h1 className="text-3xl font-semibold mt-5">{blog.title}</h1>
      <div className="flex gap-3 items-center my-5">
        <div className="w-8  rounded-full h-8 bg-rooster-accent flex items-center justify-center">
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
        <img src={blog.image} alt="" className="w-full rounded" />
      </div>
      <div className="content mt-3 " ref={contentRef}></div>
    </div>
  );
};

export default Blog;
