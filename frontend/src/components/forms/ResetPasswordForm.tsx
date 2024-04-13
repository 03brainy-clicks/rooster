import React, { useState } from "react";
import ButtonLoader from "../utils/ButtonLoader";
import PasswordInputField from "./Elements/PasswordInputField";
import { authState } from "../../recoil/atoms/authAtom";
import { useRecoilValue } from "recoil";
import axios from "axios";

const ResetPasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const { username, token } = useRecoilValue(authState);

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      setLoader((prev) => !prev);
      const passwords = {
        username,
        currentPassword,
        newPassword,
      };
      const response = await axios.put(
        `https://rooster.singhsunny031001.workers.dev/api/v1/auth/user/resetpassword`,
        passwords,
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

  return (
    <form action="" className="space-y-3">
      <PasswordInputField
        value={currentPassword}
        title={"Current Password"}
        setValue={setCurrentPassword}
      />{" "}
      <PasswordInputField
        value={newPassword}
        title={"New Password"}
        setValue={setNewPassword}
      />{" "}
      <PasswordInputField
        value={confirmPassword}
        title={"Confirm Password"}
        setValue={setConfirmPassword}
      />
      <div className="mt-7">
        <button
          disabled={loader}
          className="btnSecondary py-2 px-5 md:w-1/3"
          onClick={handleResetPassword}
        >
          {loader && <ButtonLoader />}
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
