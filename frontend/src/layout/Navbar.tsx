import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms/authAtom";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { searchState } from "../recoil/atoms/searchAtom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { auth } = useRecoilValue(authState);
  const [search, setSearch] = useState<string>("");
  const setSearchState = useSetRecoilState(searchState);
  const navigate = useNavigate();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSearchState({ search });
    if (!pathname.includes("search")) {
      navigate("/search");
    }
  };

  return (
    <>
      {!pathname.includes("editor") ? (
        <>
          {auth ? (
            <div className=" w-full  bg-white border-b z-10">
              <div className="p-3 w-10/12 mx-auto ">
                <div className="logo flex items-center justify-between gap-7">
                  <h3 className="text-2xl font-bold text-rooster-accent">
                    Rooster<span className="text-rooster-black">.</span>
                  </h3>
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
                  <div className="w-9 h-9 rounded-full bg-rooster-accent text-white flex items-center justify-center cursor-pointer">
                    <UserIcon className="w-4" />
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