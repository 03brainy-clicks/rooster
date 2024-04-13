import { useRecoilValue } from "recoil";
import { searchState } from "../../recoil/atoms/searchAtom";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Search = () => {
  const { search } = useRecoilValue(searchState);
  const [activeCategory, setActiveCategory] = useState("stories");
  const categoryList = [
    { title: "Stories", value: "stories" },
    { title: "People", value: "people" },
    { title: "Topics", value: "topics" },
  ];

  return (
    <div className="p-5 mx-auto md:w-11/12 lg:w-7/12">
      <h3 className="text-4xl font-bold line-clamp-1">
        <span className="text-rooster-textSimple">Results for</span> {search}
      </h3>
      <ul className="w-full flex gap-3 text-sm border-b sticky top-0 bg-white pt-5 mb-5 mt-5">
        {categoryList.map((item) => (
          <Link to={`/search/${item.value}`}>
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
          </Link>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
