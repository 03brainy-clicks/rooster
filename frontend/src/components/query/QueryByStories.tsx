import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authAtom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { searchState } from "../../recoil/atoms/searchAtom";
import { useEffect } from "react";
import BlogCard from "../cards/BlogCard";
import BlogCardSkeleton from "../../skeleton/BlogCardSkeleton";

type Blog = {
  id: string;
  author: { name?: string | null; username: string };
  date: string;
  tag: string;
  title: string;
  content: string;
  image: string;
};

const QueryFn = async ({ token, title }: { token: string; title: string }) => {
  const response = await axios.get(
    `https://rooster.singhsunny031001.workers.dev/api/v1/blog/search/title/${title}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const blogs = response.data.blogs;
  return blogs;
};

const QueryByStories = () => {
  const { token } = useRecoilValue(authState);
  const title = useRecoilValue(searchState).search;
  const {
    isLoading,
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["stories", token, title],
    queryFn: () => QueryFn({ token, title }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [title, refetch]);

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
            <div className="h-48 text-rooster-textSimple text-sm mt-10">
              <p> Make sure all words are spelled correctly.</p>{" "}
              <p>Try different keywords.</p>
              <p>Try more general keywords.</p>{" "}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default QueryByStories;
