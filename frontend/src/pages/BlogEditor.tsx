import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Suspense,
} from "react";
import { useRecoilValue } from "recoil";
import { blogState } from "../recoil/atoms/blogAtom";
import { Link, useParams } from "react-router-dom";
import { authState } from "../recoil/atoms/authAtom";
import { FolderOpenIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ReactQuill from "react-quill";
import DragAndDropImageUpload from "../components/utils/ImageUpload";
import { getFormattedDate } from "../utils/utilsFunctions";

const BlogEditor: React.FC = () => {
  const [image, setImage] = useState("");
  const blog = useRecoilValue(blogState);
  const [content, setContent] = useState<string>(blog?.content || "");
  const [published, setPublished] = useState(blog.published);
  const [title, setTitle] = useState(blog?.title || "");
  const [error, setError] = useState<string>("");
  const auth = useRecoilValue(authState);
  const { id } = useParams();

  const handleSave = useCallback(async () => {
    if (title && content) {
      const date = getFormattedDate();
      try {
        const data = { content, title, published, image, date, tag: blog.tag };
        const response = id
          ? await axios.put(
              `https://rooster.singhsunny031001.workers.dev/api/v1/blog/${id}`,
              data,
              { headers: { Authorization: `Bearer ${auth.token}` } }
            )
          : await axios.post(
              "https://rooster.singhsunny031001.workers.dev/api/v1/blog",
              data,
              { headers: { Authorization: `Bearer ${auth.token}` } }
            );
        console.log(response);
      } catch (error) {
        setError("Error saving blog");
      }
    }
  }, [title, content, published, image, blog.tag, id, auth.token]);

  const handlePublish = async () => {
    await axios.put(
      `https://rooster.singhsunny031001.workers.dev/api/v1/blog/publish/${id}`,
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
    setPublished(true);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "link"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://rooster.singhsunny031001.workers.dev/api/v1/blog/${id}`,
            { headers: { Authorization: `Bearer ${auth.token}` } }
          );
          const { blog } = response.data;
          if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setPublished(blog.published);
          }
        } catch (error) {
          setError("Error fetching blog");
        }
      }
    };
    fetchBlog();
  }, [auth.token, id]);

  return (
    <>
      <div className="w-full bg-white border-b z-10 sticky top-0">
        <div className="py-3 w-9/12 mx-auto">
          <div className="logo flex items-center justify-between">
            <Link to={"/"}>
              <h3 className="text-2xl font-bold text-rooster-accent">
                Rooster<span className="text-rooster-black">.</span>
              </h3>
            </Link>
            <div className="flex gap-5">
              <div onClick={handleSave} className="btnOutline py-1 px-3">
                <FolderOpenIcon className="w-4 h-4" /> &nbsp;Save
              </div>
              {id && (
                <div
                  onClick={handlePublish}
                  className="btnSecondary py-2 px-3 text-sm"
                >
                  <PaperAirplaneIcon className="w-4 h-4 -rotate-45" /> &nbsp;{" "}
                  {published ? "Published" : "Publish"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-7 mx-auto w-9/12 h-screen overflow-hidden flex flex-col gap-7">
        {error && <div className="text-red-600 mb-2">Error: {error}</div>}
        <div>
          <span className="text-xs p-1.5 px-2 bg-rooster-accent rounded-full text-white">
            {blog.tag && blog.tag}
          </span>
        </div>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold border-b px-2 w-full py-2 outline-none placeholder:text-gray-300 transition-all duration-300"
            placeholder="Title"
          />
        </div>
        <div>
          <DragAndDropImageUpload setImage={setImage} />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write our creativity"
            className="flex-1 border overflow-y-scroll"
            modules={modules}
          />
        </Suspense>
      </div>
    </>
  );
};

export default BlogEditor;
