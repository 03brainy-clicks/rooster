import { useState } from "react";
import HeroCard from "../components/cards/HeroCard";
import QueryByTag from "../components/query/QueryByTag";
import QuoteCard from "../components/cards/QuoteCard";

// Define the type for category item
type CategoryItem = {
  title: string;
  value: string;
};

const Home: React.FC = () => {
  // State to manage active category
  const [activeCategory, setActiveCategory] = useState<string>("foryou");

  // List of categories
  const categoryList: CategoryItem[] = [
    { title: "For you", value: "foryou" },
    { title: "Travel", value: "travel" },
    { title: "Food", value: "food" },
    { title: "Fashion", value: "fashion" },
    { title: "Lifestyle", value: "lifestyle" },
    { title: "Finance", value: "finance" },
    { title: "Art", value: "art" },
  ];

  return (
    <>
      <div className="w-full md:w-11/12 lg:w-8/12 mx-auto p-5">
        {/* Hero section */}
        <div>
          <HeroCard />
        </div>
        <div className="flex gap-7 mt-7 items-start relative overflow-hidden">
          {/* Category section */}
          <div className="overflow-auto flex-1">
            <ul className="w-full flex text-sm border-b sticky top-0 bg-white pt-5 mb-5 overflow-auto text-center">
              {/* Map through categoryList to render categories */}
              {categoryList.map((item: CategoryItem) => (
                <li
                  key={item.value}
                  onClick={() => setActiveCategory(item.value)}
                  className={`category min-w-20 ${
                    activeCategory === item.value
                      ? "border-black text-black"
                      : "border-transparent text-rooster-textSimple"
                  }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            {/* Content based on active category */}
            <div className="mb-5">
              <QueryByTag tag={activeCategory} />
            </div>
          </div>
          {/* cards  */}
          <div className="hidden lg:block">
            <QuoteCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
