import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "../utils/Modal";
import CreateBlogForm from "../forms/model/CreateBlogForm";

const HeroCard = () => {
  const [modalToggler, setModalToggler] = useState(false);

  const handleToggle = () => {
    setModalToggler(!modalToggler);
  };

  return (
    <div className=" p-5 flex overflow-hidden items-center background3 rounded">
      <div className="w-full h-full  flex items-center  text-white ">
        <div className="lg:w-1/2">
          <h3 className="text-3xl font-bold">
            Welcome to Rooster <br /> Your Ultimate Blogging Companion
          </h3>
          <p className="mt-3 text-sm  ">
            Unleash your creativity, find your niche, and connect with a vibrant
            community on Rooster. Write, collaborate, and share your voice with
            the world. Join us today and discover the power of storytelling.
          </p>
          <button
            onClick={handleToggle}
            className=" btnSecondary py-2 px-5 mt-5 flex items-center justify-center "
          >
            {" "}
            <PlusIcon className="w-4 h-4 text-white" /> &nbsp;Create
          </button>
          <Modal
            open={modalToggler}
            setOpen={handleToggle}
            heading="Create Blog"
          >
            <CreateBlogForm />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
