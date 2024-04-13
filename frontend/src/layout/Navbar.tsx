import { Link, useLocation, useNavigate } from "react-router-dom";
import { authState } from "../recoil/atoms/authAtom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useState } from "react";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { searchState } from "../recoil/atoms/searchAtom";
import Dropdown from "../components/utils/Dropdown";
import { blogState } from "../recoil/atoms/blogAtom";

// unauhtenticated
const Unauhtenticated = () => {
  return (
    <div className="w-full border-b fixed top-0 bg-white z-10">
      <div className=" w-full md:w-11/12 lg:w-9/12  mx-auto p-5 flex justify-between ">
        <Link to={"/"}>
          <h4 className="text-2xl font-bold ">
            <span className="text-rooster-accent">Rooster</span>.
          </h4>
        </Link>
        <div className="flex gap-5 items-center text-sm">
          <Link to={"/auth/login"}>
            {" "}
            <div className=" border-b border-transparent hover:border-b hover:border-rooster-accent animate py-2 px-5 cursor-pointer">
              Login
            </div>
          </Link>
          <Link to="/auth/signup">
            {" "}
            <button className="btnSecondary py-2 px-5 rounded">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// auhtenticated
const Authenticated = () => {
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const { username } = useRecoilValue(authState);
  const setSearchState = useSetRecoilState(searchState);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const AuthReset = useResetRecoilState(authState);
  const SearchReset = useResetRecoilState(searchState);
  const BlogReset = useResetRecoilState(blogState);

  // * Handle Search
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (search) {
      setSearchState({ search });
      if (!pathname.includes(search)) {
        navigate("/search/stories");
      }
    }
  };

  // * Handle Toggle
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  // * Handle Logout
  const handleLogout = () => {
    AuthReset();
    BlogReset();
    SearchReset();
    navigate("/");
  };

  return (
    <div className="w-full border-b top-0">
      <div className=" w-full md:w-11/12 lg:w-9/12  mx-auto p-5 flex justify-between ">
        <Link to={"/home"}>
          <h4 className="text-2xl font-bold ">
            <span className="text-rooster-accent">Rooster</span>.
          </h4>
        </Link>
        <div className="flex gap-5 items-center text-sm ">
          {/* search  */}
          <form onSubmit={handleSearch}>
            <div className="bg-gray-50 py-1 px-3 flex items-center gap-1 rounded-full">
              <MagnifyingGlassIcon className="w-5 text-rooster-textSimple " />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-1 px-2 bg-transparent outline-none  w-28 md:w-full"
              />
            </div>
          </form>
          {/* user  */}
          <div className="relative">
            <div
              onClick={handleToggle}
              className="w-8 h-8 rounded-full bg-rooster-accent flex items-center justify-center text-white cursor-pointer"
            >
              <UserIcon className="w-5 h-5" />
            </div>
            <Dropdown open={toggle} setOpen={setToggle}>
              <div className="p-2 text-sm rounded">
                <Link to={`/user/${username}`}>
                  <div
                    onClick={handleToggle}
                    className="py-1 px-2 flex items-center gap-2 hover:bg-rooster-accent hover:text-white animate rounded cursor-pointer"
                  >
                    <UserIcon className="w-4" />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link to={`/settings/account`}>
                  <div
                    onClick={handleToggle}
                    className="py-1 px-2 flex items-center gap-2 hover:bg-rooster-accent hover:text-white animate rounded cursor-pointer"
                  >
                    <Cog6ToothIcon className="w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
                <div
                  onClick={handleLogout}
                  className="py-1 px-2 flex items-center gap-2 hover:bg-rooster-accent hover:text-white animate rounded cursor-pointer"
                >
                  <ArrowRightStartOnRectangleIcon className="w-4" />
                  <span>Logout</span>
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const pathname = useLocation().pathname;
  const { auth } = useRecoilValue(authState);
  return (
    <>
      {auth ? (
        <>{!pathname.includes("editor") && <Authenticated />}</>
      ) : (
        <Unauhtenticated />
      )}
    </>
  );
};

export default Navbar;
