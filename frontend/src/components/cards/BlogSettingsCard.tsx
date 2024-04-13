import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Dropdown from "../utils/Dropdown";
import { Link } from "react-router-dom";
import DeleteBlogFrom from "../forms/model/DeleteBlogFrom";
import Modal from "../utils/Modal";

type BlogSettingsCardProps = {
  blogId: string;
};

const BlogSettingsCard: React.FC<BlogSettingsCardProps> = ({ blogId }) => {
  const [toggle, setToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleDeleteToggle = () => {
    setDeleteToggle((prev) => !prev);
  };

  return (
    <div>
      <EllipsisVerticalIcon
        onClick={handleToggle}
        className="w-4 cursor-pointer"
      />
      <Dropdown open={toggle} setOpen={setToggle}>
        <div className="p-2 text-sm">
          <Link to={`/editor/${blogId}`}>
            <div
              onClick={handleToggle}
              className="py-1 px-2 flex items-center gap-2 hover:bg-rooster-accent hover:text-white animate rounded cursor-pointer"
            >
              <PencilSquareIcon className="w-4" />
              <span>Edit</span>
            </div>
          </Link>
          <div
            onClick={handleDeleteToggle}
            className="py-1 px-2 flex items-center gap-2 hover:bg-red-500 hover:text-white animate rounded cursor-pointer"
          >
            <TrashIcon className="w-4" />
            <span>Delete</span>
          </div>
          <Modal open={deleteToggle} setOpen={setDeleteToggle} heading={"Delete Blog"}>
            <>
              <DeleteBlogFrom blogId={blogId} />
            </>
          </Modal>
        </div>
      </Dropdown>
    </div>
  );
};

export default BlogSettingsCard;
