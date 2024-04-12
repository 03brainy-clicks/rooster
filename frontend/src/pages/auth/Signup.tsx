import { Link, useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SignupSchema } from "../../Validation";
import { EmailRegex, PasswordRegex, UsernameRegex } from "../../Regex";
import axios from "axios";
import ButtonLoader from "../../components/utils/ButtonLoader";

type ValidateType = {
  username: string;
  password: string;
  email: string;
  name: string;
  designation: string;
};

const Signup = () => {
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name state
  const [designation, setDesignation] = useState(""); // Added designation state
  const [error, setError] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    designation: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const Validate = ({
    email,
    password,
    username,
    name,
    designation,
  }: ValidateType) => {
    setError({
      username: "",
      password: "",
      email: "",
      name: "",
      designation: "",
    });

    let isValid = true;

    if (!UsernameRegex.test(username)) {
      setError((prev) => ({
        ...prev,
        username: "Invalid username should be atleast 3 characters",
      }));
      isValid = false;
    }

    if (!EmailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: "Invalid email address" }));
      isValid = false;
    }

    if (!PasswordRegex.test(password)) {
      setError((prev) => ({
        ...prev,
        password: "Invalid password should be atleast 8 character",
      }));
      isValid = false;
    }

    if (name.trim() === "") {
      setError((prev) => ({
        ...prev,
        name: "Name cannot be empty",
      }));
      isValid = false;
    }

    if (designation.trim() === "") {
      setError((prev) => ({
        ...prev,
        designation: "Designation cannot be empty",
      }));
      isValid = false;
    }

    return isValid;
  };

  const resetState = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setName("");
    setDesignation("");
  };

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (Validate({ email, password, username, name, designation })) {
        setLoader((prev) => !prev);
        const data = SignupSchema.safeParse({
          email,
          password,
          username,
          name,
          designation,
        });
        if (data.success) {
          await axios.post(
            "https://rooster.singhsunny031001.workers.dev/api/v1/auth/signup",
            {
              email,
              password,
              username,
              name,
              designation,
            }
          );
        }
        resetState();
        setLoader((prev) => !prev);
        navigate("/auth/login");
      }
    } catch (error) {
      setLoader((prev) => !prev);
      console.log("Error : ", error);
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/2 authBackground2">
        <div className="w-full h-full bg-opacity-30 flex flex-col ">
          <div className="flex-1 flex items-center">
            <div className="text-5xl font-bold text-rooster-white text-center w-full">
              Rooster<span className="text-rooster-black">.</span>
            </div>
          </div>

          <div className="text-sm p-5 text-white">
            <a
              href="https://unsplash.com/@etiennegirardet"
              target="_blank"
              className="hover:border-b hover:border-white transition-all duration-300"
            >
              Etienne Girardet
            </a>
          </div>
        </div>
      </div>
      <div className="min-w-96 flex-1 flex items-center justify-center ">
        <div className="w-2/3 p-12 rounded bg-white">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <div className="my-7 ">
            <p className="font-semibold text-rooster-textSecondary">
              Sign up with email
            </p>
            <p className="text-sm text-rooster-textSecondary">
              Already have an account?{" "}
              <Link to={"/auth/login"}>
                <span className="text-rooster-accent">Login</span>
              </Link>
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <div>
              <label htmlFor="name" className="text-xs text-rooster-textSimple">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="inputField"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="text-red-500 text-xs">
                {error.name && error.name}
              </span>
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-xs text-rooster-textSimple"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="inputField"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="text-red-500 text-xs">
                {error.username && error.username}
              </span>
            </div>

            <div>
              <label
                htmlFor="designation"
                className="text-xs text-rooster-textSimple"
              >
                Designation
              </label>
              <input
                type="text"
                name="designation"
                className="inputField"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <span className="text-red-500 text-xs">
                {error.designation && error.designation}
              </span>
            </div>
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

              <div>
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
              </div>
              <span className="text-red-500 text-xs">
                {" "}
                {error.password && error.password}
              </span>
            </div>
            <div className="mt-7">
              <button
                disabled={loader}
                className="btnSecondary py-2 px-3 w-1/2"
                onClick={handleCreate}
              >
                {loader && <ButtonLoader />}
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
