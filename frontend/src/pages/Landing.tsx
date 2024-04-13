import React from "react";
import RandomImage from "../components/utils/RandomImage";
import { getFormattedDate } from "../utils/utilsFunctions";
import {
  Travel,
  Music,
  LifeStyle,
  Fashion,
  World,
} from "../assets/landing/blogs";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

type CardProps = {
  tag: string;
  title: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ tag, title, image }) => {
  return (
    <div className="flex  gap-5 items-center justify-between py-4">
      <div className="flex-1">
        <p className="text-sm text-rooster-textSimple">
          {getFormattedDate()}&nbsp; <span>·</span> &nbsp; #{tag}
        </p>
        <Link to={"/auth/login"}>
          <h4 className="text font-medium mt-1 cursor-pointer">{title}</h4>
        </Link>
      </div>
      <div className=" overflow-hidden flex items-center justify-center">
        <img src={image} alt="" className="w-20  rounded" />
      </div>
    </div>
  );
};

const Landing = () => {
  const blogList = [
    {
      tag: "Travel",
      title:
        "Embark on a Journey to Explore New Horizons and Discover the Wonders of the World",
      image: Travel,
    },
    {
      tag: "Fashion",
      title:
        "Stay Chic and Stylish with the Latest Fashion Must-Haves and Trendy Outfit Ideas",
      image: Fashion,
    },
    {
      tag: "Music",
      title:
        "Let Your Soul Dance to the Melodies and Experience the Transformative Power of Music",
      image: Music,
    },
    {
      tag: "Lifestyle",
      title:
        "Find Balance and Wellness in Your Life with Simple Tips and Healthy Habits",
      image: LifeStyle,
    },
    {
      tag: "World",
      title:
        "Expand Your Global Perspective and Uncover Hidden Treasures Around the World",
      image: World,
    },
  ];

  return (
    <div className="pt-56 md:w-11/12 lg:w-7/12 mx-auto p-5 pb-0">
      <div className="lg:w-11/12 mx-auto">
        <div className="text-4xl font-medium text-center leading-snug">
          <span className="text-rooster-accent font-bold mb-2 "> Rooster</span>.{" "}
          <br /> Your All-in-One Blogging Hub.
        </div>{" "}
        <p className="mt-5 text-center mx-auto">
          Welcome to Rooster: Your hub for captivating content and effortless
          account management. Explore diverse blogs, manage your profile with
          ease, and join a thriving community. Start your journey today!
        </p>
      </div>
      <div className="mx-auto py-7">
        <RandomImage />
      </div>
      <div className="mx-auto py-12 flex flex-col gap-5 lg:w-11/12 ">
        <h6 className="font-medium">Recent Publications</h6>
        <div className="">
          {blogList.map((blog) => (
            <Card
              key={blog.tag}
              title={blog.title}
              tag={blog.tag}
              image={blog.image}
            />
          ))}
        </div>
        <div className="text-center pt-10">
          <Link to={"/auth/login"}>
            <button className="btnSecondary py-2 w-1/2 mx-auto  ">
              View More
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 border-b py-5 lg:w-11/12 mx-auto">
        <div className="flex-1">
          <div className="font-bold mb-2 text-xl">
            <span className="text-rooster-accent  "> Rooster</span>.
          </div>
          <p className="text-sm text-rooster-textSecondary mt-3">
            This app is designed and developed by{" "}
            <span className="underline text-rooster-accent cursor-pointer">
              03brainy-clicks
            </span>{" "}
            with the aim of providing an accessible and user-friendly blogging
            platform. It's an open-source application, available for download on{" "}
            <span className="underline text-rooster-accent cursor-pointer">
              GitHub
            </span>
            .
          </p>
        </div>
        <div className="">
          <ul className="flex gap-2 text-sm md:flex-col">
            <li className="flex items-center gap-2 cursor-pointer underline ">
              <a href="" className="flex items-center gap-2 cursor-pointer ">
                LinkedIn
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            </li>{" "}
            <li className="flex items-center gap-2 cursor-pointer underline">
              <a
                href=""
                className="flex items-center gap-2 cursor-pointer underline"
              >
                GitHub
                <ArrowUpRightIcon className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-5 text-center text-rooster-textSimple text-sm">
        © 2024 03brainy-clicks
      </div>
    </div>
  );
};

export default Landing;
