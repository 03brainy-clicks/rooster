import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { blogState } from "../../recoil/atoms/blogAtom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const setBlog = useSetRecoilState(blogState);

  const handleGenerateBlog = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title && tag) {
      setBlog({ title, tag });
      navigate("/editor");
    }
  };

  return (
    <form className="flex gap-3 flex-col" onSubmit={handleGenerateBlog}>
      <div>
        <label htmlFor="title" className="text-xs text-rooster-textSimple">
          Title{" "}
        </label>
        <input
          type="text"
          className="inputField"
          value={title}
          required={true}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tag" className="text-xs text-rooster-textSimple">
          Tag
        </label>
        <input
          type="text"
          className="inputField"
          required={true}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="mt-3  ">
        <button
          onClick={handleGenerateBlog}
          className="btnSecondary py-2 px-3 w-full"
        >
          Generate Blog
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
