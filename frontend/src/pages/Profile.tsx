import { useQuery } from "@tanstack/react-query";
import QueryByUsername from "../components/query/QueryByUsername";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/authAtom";
import { useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import { useState } from "react";
import { ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/outline";

const QueryFn = async ({
  token,
  username,
}: {
  token: string;
  username: string | undefined;
}) => {
  const response = await axios.get(
    `https://rooster.singhsunny031001.workers.dev/api/v1/auth/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.user;
};

const Profile = () => {
  const [activeCategory, setActiveCategory] = useState("home");
  const { token } = useRecoilValue(authState);
  const { username } = useParams();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", token, username],
    queryFn: () => QueryFn({ token, username }),
  });

  const categoryList = [
    { title: "Home", value: "home" },
    { title: "About", value: "about" },
  ];

  const handleCategory = (value: string) => {
    setActiveCategory(value);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-5  mx-auto min-h-screen relative md:w-11/12 lg:w-8/12">
      <div className="py-7 flex-1 flex flex-col gap-3 items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
          {user.image ? (
            <img src={user?.image} alt="" className="min-w-32 " />
          ) : (
            <>
              {" "}
              <div className="w-full h-full flex items-center justify-center bg-rooster-accent text-white">
                <UserIcon className="w-10 h-10" />
              </div>
            </>
          )}
        </div>
        <h1 className="text-3xl lg:text-5xl  font-semibold uppercase">
          {user.username}
        </h1>
      </div>
      <ul className="w-full flex gap-3 text-sm border-b sticky top-0 bg-white pt-5 mb-5 z-1">
        {categoryList.map((item) => (
          <li
            key={item.value}
            onClick={() => handleCategory(item.value)}
            className={`category ${
              activeCategory === item.value
                ? "border-black text-black"
                : "border-transparent text-rooster-textSimple"
            }`}
          >
            {item.title}
          </li>
        ))}
      </ul>
      <div>
        {activeCategory === "home" && <QueryByUsername />}
        {activeCategory === "about" && (
          <div className="mt-12">
            <h3 className="text-2xl font-medium mb-2 leading-3">{user.name}</h3>
            <span className="text-lg fon-medium ">{user.designation}</span>
            <p className="md:w-2/3 text-sm mt-3">{user.description}</p>
            <ul className="flex gap-2 text-sm mt-3">
              {" "}
              {user.github && (
                <li className="flex items-center gap-2 cursor-pointer underline">
                  <a
                    href={user.github}
                    target="_black"
                    className="flex items-center gap-2 cursor-pointer underline"
                  >
                    GitHub
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </a>
                </li>
              )}
              {user.linkedin && (
                <li className="flex items-center gap-2 cursor-pointer underline">
                  <a
                    href={user.github}
                    target="_black"
                    className="flex items-center gap-2 cursor-pointer underline"
                  >
                    Linkedin
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
