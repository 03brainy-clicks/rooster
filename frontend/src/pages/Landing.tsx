import { Link } from "react-router-dom";
import BlogSkeleton from "../skeleton/BlogSkeleton";

const Landing = () => {
  return <div className="pt-16">hello how are you
  <Link to={"/home"}>
  home</Link>
  <BlogSkeleton/>
  </div>;

};

export default Landing;
