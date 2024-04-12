import React, { useState } from "react";
import InputField from "./Elements/InputField";
import TextareaField from "./Elements/TextareaField";
import DragAndDropImageUpload from "../utils/ImageUpload";
import ButtonLoader from "../utils/ButtonLoader";
import axios from "axios";
import { authState } from "../../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import Loader from "../utils/Loader";

type UserDetails = {
  username: string;
  email: string;
  name: string;
  image: string;
  description: string;
  designation: string;
};

const QueryFn = async ({
  token,
  username,
}: {
  token: string;
  username: string | undefined;
}) => {
  const response = await axios.get(
    `https://rooster.singhsunny031001.workers.dev/api/v1/auth/user/${username}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.user as UserDetails;
};

const UserDetailsForm: React.FC = () => {
  const { token, username: userName } = useRecoilValue(authState);
  const { isLoading, data: user } = useQuery({
    queryKey: ["user", token, userName],
    queryFn: () => QueryFn({ token, username: userName }),
  });

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [description, setDescription] = useState(user?.description || "");
  const [designation, setDesignation] = useState(user?.designation || "");
  const [loader, setLoader] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader((prev) => !prev);
      const updatedDetails = {
        username,
        email,
        name,
        image,
        description,
        designation,
      };
      const response = await axios.put(
        `https://rooster.singhsunny031001.workers.dev/api/v1/auth/user`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoader((prev) => !prev);
      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form onSubmit={handleUpdate} className="space-y-3">
      <InputField
        value={username}
        type={"text"}
        title={"Username"}
        setValue={setUsername}
        disabled={true}
      />
      <InputField
        value={email}
        type={"email"}
        title={"Email"}
        setValue={setEmail}
        disabled={true}
      />
      <DragAndDropImageUpload setImage={setImage} />
      <InputField
        value={name}
        type={"text"}
        title={"Name"}
        setValue={setName}
      />
      <InputField
        value={designation}
        type={"text"}
        title={"Designation"}
        setValue={setDesignation}
      />
      <TextareaField
        value={description}
        title={"Description"}
        setValue={setDescription}
      />
      <div className="mt-7">
        <button disabled={loader} className="btnSecondary py-2 px-3 w-1/3">
          {loader && <ButtonLoader />}
          Update
        </button>
      </div>
    </form>
  );
};

export default UserDetailsForm;
