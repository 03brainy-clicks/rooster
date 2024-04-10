import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authAtom";
import axios from "axios";
import BlogCard from "../cards/BlogCard";
import BlogCardSkeleton from "../../skeleton/BlogCardSkeleton";

type QueryByTagProps = {
  tag: string;
};

type Blog = {
  id: string;
  author: { name?: string | null; username: string };
  date: string;
  tag: string;
  title: string;
  content: string;
  image: string;
};

const QueryFn = async ({ token, tag }: { token: string; tag: string }) => {
  if (tag !== "foryou") {
    const response = await axios.get(
      `https://rooster.singhsunny031001.workers.dev/api/v1/blog/search/tag/${tag}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const blogs = response.data.blogs;
    return blogs;
  } else {
    const response = await axios.get(
      `https://rooster.singhsunny031001.workers.dev/api/v1/blog`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const blogs = response.data.blogs;
    return blogs;
  }
};

const QueryByTag = ({ tag }: QueryByTagProps) => {
  const { token } = useRecoilValue(authState);
  const {
    isLoading,
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["blogs", token, tag],
    queryFn: () => QueryFn({ token, tag }),
    enabled: false, // Start with query disabled
  });

  useEffect(() => {
    // Enable query and refetch when tag changes
    refetch();
  }, [tag, refetch]);

  return (
    <>
      {isLoading ? (
        <>
          <BlogCardSkeleton />
        </>
      ) : (
        <>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog: Blog) => {
              return (
                <BlogCard
                  key={blog.id}
                  username={blog.author.username}
                  date={blog.date}
                  tag={blog.tag}
                  title={blog.title}
                  content={blog.content}
                  image={blog.image}
                  id={blog.id}
                />
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-48">
              <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
              <p className="text-lg text-gray-300 mb-8">
                Oops! Blogs Not Found
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default QueryByTag;
