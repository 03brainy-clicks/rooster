import { useState } from "react";
import HeroCard from "../components/cards/HeroCard";
import QuoteCard from "../components/cards/QuoteCard";
import QueryByTag from "../components/query/QueryByTag";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("foryou");
  const categoryList = [
    { title: "For you", value: "foryou" },
    { title: "Travel", value: "Travel" },
    { title: "Food", value: "Food" },
    { title: "Fashion", value: "Fashion" },
    { title: "Lifestyle", value: "Life Style" },
    { title: "Technology", value: "Technology" },
    { title: "Finance", value: "Finance" },
    { title: "Art", value: "Art" },
  ];

  return (
    <>
      <div className="w-9/12 mx-auto px-3 pt-5">
        {/* Hero */}
        <div>
          <HeroCard />
        </div>
        {/* topic */}
        <div className="flex gap-7 mt-7 items-start relative">
          <div className="flex-1">
            <ul className="w-full flex gap-3 text-sm border-b sticky top-0 bg-white pt-5 mb-5">
              {categoryList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setActiveCategory(item.value)}
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
            {/* <div className="h-screen overflow-auto mb-5"> */}
            <div className=" mb-5">
              <QueryByTag tag={activeCategory} />
            </div>
          </div>
          <QuoteCard />
        </div>
      </div>
    </>
  );
};

export default Home;
