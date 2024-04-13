import React, { useState } from "react";
import InputField from "../Elements/InputField";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/authAtom";
import axios from "axios";
import ButtonLoader from "../../utils/ButtonLoader";

type DeleteBlogFromProps = {
  blogId: string;
};

const DeleteBlogFrom: React.FC<DeleteBlogFromProps> = ({ blogId }) => {
  const { token } = useRecoilValue(authState);
  const [deleteBlog, setDeleteBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteBlog = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (deleteBlog === `/blog/${blogId}`) {
        setLoading((prev) => !prev);
        const response = await axios.delete(
          `https://rooster.singhsunny031001.workers.dev/api/v1/blog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setLoading((prev) => !prev);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <p>
        To confirm, type{" "}
        <span className="font-medium ">"{`/blog/${blogId}`}"</span> in the box
        below.
      </p>
      <form className="flex gap-3 flex-col mt-2" onSubmit={handleDeleteBlog}>
        <InputField
          title={``}
          value={deleteBlog}
          setValue={setDeleteBlog}
          type={"text"}
        />
        <div className="mt-3  ">
          <button
            disabled={loading}
            onClick={handleDeleteBlog}
            className="btnSecondary py-2 px-3 w-full"
          >
            {loading && <ButtonLoader />}
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteBlogFrom;
