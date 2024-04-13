import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authAtom";
import axios from "axios";
import BlogCard from "../cards/BlogCard";
import BlogCardSkeleton from "../../skeleton/BlogCardSkeleton";
import { useParams } from "react-router-dom";

type Blog = {
  id: string;
  author: { name?: string | null; username: string };
  date: string;
  tag: string;
  title: string;
  content: string;
  image: string;
};

const QueryFn = async ({
  token,
  username,
}: {
  token: string;
  username: string | undefined;
}) => {
  const response = await axios.get(
    `https://rooster.singhsunny031001.workers.dev/api/v1/blog/search/username/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const blogs = response.data.blogs;
  return blogs;
};

const QueryByUsername = () => {
  const { token,username:currentUsername } = useRecoilValue(authState);
  const { username } = useParams();
  const {
    isLoading,
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["profile", token, username],
    queryFn: () => QueryFn({ token, username }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [username, refetch]);

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
                currentUsername={currentUsername}
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
              User have no Blogs
            </div>
          )}
        </>
      )}
    </>
  );
};

export default QueryByUsername;
