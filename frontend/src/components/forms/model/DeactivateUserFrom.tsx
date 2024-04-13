import React, { useState } from "react";
import InputField from "../Elements/InputField";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/authAtom";
import axios from "axios";
import ButtonLoader from "../../utils/ButtonLoader";
import { useNavigate } from "react-router-dom";

const DeactivateUserForm: React.FC = () => {
  const { token } = useRecoilValue(authState);
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBlog = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (confirm === "CONFIRM" && password) {
        setLoading((prev) => !prev);
        const response = await axios.put(
          `https://rooster.singhsunny031001.workers.dev/api/v1/auth/user/deactivate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setLoading((prev) => !prev);
        navigate("/");
      }
    } catch (error) {
      setLoading((prev) => !prev);
      console.log("Error", error);
    }
  };

  return (
    <div>
      <p className="text-sm">
        To confirm, type <span className="font-medium ">"{`CONFIRM`}"</span> in
        the box below.
      </p>
      <form className="flex gap-3 flex-col mt-2" onSubmit={handleDeleteBlog}>
        <InputField
          title={""}
          value={confirm}
          setValue={setConfirm}
          type={"text"}
          placeholder="Confirm"
        />
        <InputField
          title={``}
          value={password}
          setValue={setPassword}
          type={"text"}
          placeholder="Password"
        />
        <div className="mt-3  ">
          <button
            disabled={loading}
            onClick={handleDeleteBlog}
            className="btnSecondary py-2 px-3 w-full"
          >
            {loading && <ButtonLoader />}
            Deactivate Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeactivateUserForm;
