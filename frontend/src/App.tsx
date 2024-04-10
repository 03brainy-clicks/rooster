import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Loader from "./components/utils/Loader";

// Lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogEditor = lazy(() => import("./pages/BlogEditor"));
const Search = lazy(() => import("./pages/Search"));
const Stories = lazy(() => import("./components/query/QueryByStories")); // Assuming you have a component for stories
const Topics = lazy(() => import("./components/query/QueryByTopic")); // Assuming you have a component for topics
const People = lazy(() => import("./components/query/QueryByPeople")); // Assuming you have a component for people

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/editor" element={<BlogEditor />} />
          <Route path="/editor/:id" element={<BlogEditor />} />
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
