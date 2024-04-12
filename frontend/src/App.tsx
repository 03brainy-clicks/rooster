import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Loader from "./components/utils/Loader";

// Lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/search/Search"));
const Stories = lazy(() => import("./components/query/QueryByStories"));
const Topics = lazy(() => import("./components/query/QueryByTopic"));
const People = lazy(() => import("./components/query/QueryByPeople"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const UserDetails = lazy(() => import("./pages/settings/UserDetails"));
const ResetPassword = lazy(() => import("./pages/settings/ResetPassword"));

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/editor" element={<BlogEditor />} />
          <Route path="/editor/:id" element={<BlogEditor />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="account-details" element={<UserDetails />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/search" element={<Search />}>
            <Route path="stories" element={<Stories />} />
            <Route path="topics" element={<Topics />} />
            <Route path="people" element={<People />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
