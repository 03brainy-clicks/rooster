import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { blogState } from "../../recoil/atoms/blogAtom";
import InputField from "./Elements/InputField";

const CreateBlogForm: React.FC = () => {
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
      <InputField
        title="Title"
        value={title}
        setValue={setTitle}
        type={"text"}
      />
      <InputField title="Tag" value={tag} setValue={setTag} type={"text"} />
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

export default CreateBlogForm;
