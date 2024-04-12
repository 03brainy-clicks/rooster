import { useQuery } from "@tanstack/react-query";
import QueryByUsername from "../components/query/QueryByUsername";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/authAtom";
import { useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import React, { useState } from "react";

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
  const [activeCategory, setActiveCategory] = useState("about");
  const { token } = useRecoilValue(authState);
  const { username } = useParams();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", token, username],
    queryFn: () => QueryFn({ token, username }),
  });

  const categoryList = [
    { title: "About", value: "about" },
    { title: "Blogs", value: "blogs" },
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
    <div className="w-7/12 mx-auto min-h-screen relative">
      <div className="py-7 flex-1 flex gap-5 items-center">
        <div className="w-16 h-16 bg-red-500 rounded-full overflow-hidden flex items-center justify-center">
          <img src={user?.image} alt="" />
        </div>
        <h1 className="text-5xl font-semibold ">{user.name}</h1>
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
        {activeCategory === "blogs" && <QueryByUsername />}
        {activeCategory === "about" && "hello"}
        <div>
          <h3 className="text-xl"> {}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
