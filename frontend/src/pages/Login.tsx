import { Link, useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { EmailRegex, PasswordRegex } from "../Regex";
import { useState } from "react";
import { SigninSchema } from "../Validation";
import { authState } from "../recoil/atoms/authAtom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import ButtonLoader from "../components/utils/ButtonLoader";

type ValidateType = {
  password: string;
  email: string;
};

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    password: "",
    email: "",
  });
  const updateAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

  const Validate = ({ email, password }: ValidateType) => {
    setError({
      password: "",
      email: "",
    });
    if (!EmailRegex.test(email)) {
      return setError((prev) => ({ ...prev, email: "Invalid email address" }));
    }
    if (!PasswordRegex.test(password)) {
      return setError((prev) => ({
        ...prev,
        password: "Invalid password should be atleast 8 character",
      }));
    }
    return true;
  };

  const resetState = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (Validate({ email, password })) {
        setLoader((prev) => !prev);
        const data = SigninSchema.safeParse({ email, password });
        if (data.success) {
          const response = await axios.post(
            "https://rooster.singhsunny031001.workers.dev/api/v1/auth/signin",
            { email, password }
          );
          const { token } = await response.data;
          updateAuth((currentState) => ({
            ...currentState,
            auth: true,
            token: token,
          }));
        }
        resetState();
        setLoader((prev) => !prev);
        navigate("/home");
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 authBackground1">
        <div className="w-full h-full bg-rooster-black bg-opacity-30 flex flex-col ">
          <div className="flex-1 flex items-center">
            <div className="text-5xl font-bold text-rooster-white text-center w-full">
              Rooster<span className="text-rooster-black">.</span>
            </div>
          </div>

          <div className="text-sm p-5 text-white">
            <a
              href="https://unsplash.com/@yusufevli"
              target="_blank"
              className="hover:border-b hover:border-white transition-all duration-300"
            >
              Yusuf Evli
            </a>
          </div>
        </div>
      </div>
      <div className="min-w-96 flex-1 flex items-center justify-center ">
        <div className="w-2/3 p-12 rounded bg-white">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <div className="mb-7  mt-5">
            <p className="text-sm text-rooster-textSecondary">
              New user?{" "}
              <Link to={"/auth/signup"}>
                <span className="text-rooster-accent">Create account</span>
              </Link>
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <div>
              <label
                htmlFor="email"
                className="text-xs text-rooster-textSimple"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-red-500 text-xs">
                {" "}
                {error.email && error.email}
              </span>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xs text-rooster-textSimple"
              >
                Password
              </label>
              <div className="flex gap-3">
                <input
                  type={toggle ? "text" : "password"}
                  className="inputField"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {toggle ? (
                  <EyeIcon
                    onClick={handleToggle}
                    className="w-5 cursor-pointer transition-all duration-300"
                  />
                ) : (
                  <EyeSlashIcon
                    onClick={handleToggle}
                    className="w-5 text-rooster-textSimple cursor-pointer transition-all duration-300"
                  />
                )}
              </div>
              <span className="text-red-500 text-xs">
                {" "}
                {error.password && error.password}
              </span>
            </div>
            <div className="mt-7">
              <button
                disabled={loader}
                onClick={handleLogin}
                className="btnSecondary py-2 px-3 w-1/2"
              >
                {" "}
                {loader && <ButtonLoader />}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
