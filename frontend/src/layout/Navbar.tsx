import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Dropdown from "../components/utils/Dropdown";
import { authState } from "../recoil/atoms/authAtom";
import { searchState } from "../recoil/atoms/searchAtom";
import { blogState } from "../recoil/atoms/blogAtom";

const Navbar = () => {
  const { pathname } = useLocation();
  const auth = useRecoilValue(authState);
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const setSearchState = useSetRecoilState(searchState);
  const resetAuth = useResetRecoilState(authState);
  const resetSearch = useResetRecoilState(searchState);
  const resetBlog = useResetRecoilState(blogState);
  const navigate = useNavigate();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchState({ search });
    if (!pathname.includes("search")) {
      navigate("/search/stories");
    }
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleLogout = () => {
    resetAuth();
    resetSearch();
    resetBlog();
    handleToggle();
    navigate("/");
  };

  const handleSettings = () => {
    handleToggle();
    navigate("/settings/account-details");
  };
  const handleProfile = () => {
    handleToggle();
    navigate(`/user/${auth?.username}`);
  };

  return (
    <>
      {!pathname.includes("editor") ? (
        <>
          {auth?.auth ? (
            <div className=" w-full  bg-white border-b z-10">
              <div className="p-3 w-10/12 mx-auto ">
                <div className="logo flex items-center justify-between gap-7">
                  <Link to={"/home"}>
                    <h3 className="text-2xl font-bold text-rooster-accent">
                      Rooster<span className="text-rooster-black">.</span>
                    </h3>
                  </Link>
                  <form
                    className="text-sm flex items-center justify-center gap-2 ml-auto py-2 px-3 rounded-full bg-gray-50"
                    onSubmit={handleSearch}
                  >
                    <MagnifyingGlassIcon className="w-5" />
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  </form>
                  <div className="relative">
                    <div
                      onClick={handleToggle}
                      className="w-9 h-9 rounded-full bg-rooster-accent text-white flex items-center justify-center cursor-pointer"
                    >
                      <UserIcon className="w-4" />
                    </div>
                    <Dropdown open={toggle} setOpen={setToggle}>
                      <ul className="p-2 text-sm text-rooster-textSimple">
                        <li
                          onClick={handleProfile}
                          className="p-2 hover:bg-gray-100 hover:text-black animate flex gap-2 items-center cursor-pointer rounded-sm"
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </li>
                        <li
                          onClick={handleSettings}
                          className="p-2 hover:bg-gray-100  hover:text-black animate flex gap-2 items-center cursor-pointer rounded-sm"
                        >
                          <Cog6ToothIcon className="w-4 h-4" />
                          Settings
                        </li>
                        <li
                          onClick={handleLogout}
                          className="p-2 hover:bg-gray-100 animate   hover:text-black flex gap-2 items-center cursor-pointer rounded-sm"
                        >
                          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                          Logout
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-full fixed top-0  bg-white border-b">
              <div className="p-3 w-10/12 mx-auto ">
                <div className="logo flex items-center justify-between">
                  <Link to={"/"}>
                    <h3 className="text-2xl font-bold text-rooster-accent">
                      Rooster<span className="text-rooster-black">.</span>
                    </h3>
                  </Link>
                  <div className="text-sm flex items-center justify-center gap-5">
                    <Link to={"/auth/login"}>
                      <div className="menu">Login</div>
                    </Link>
                    <div>
                      <Link to={"/auth/signup"}>
                        <button className="btnSecondary py-2 px-3 ">
                          Get Started
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
      {/* authenticated  */}
    </>
  );
};

export default Navbar;
