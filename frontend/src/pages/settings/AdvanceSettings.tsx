import { useState } from "react";
import DeactivateUserForm from "../../components/forms/model/DeactivateUserFrom";
import DeleteUserForm from "../../components/forms/model/DeleteUserForm";
import Modal from "../../components/utils/Modal";

const AdvanceSettings = () => {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [deactivateToggle, setDeactivateToggle] = useState(false);
  return (
    <div className="space-y-7 mt-5">
      <div>
        <h5 onClick={()=>setDeactivateToggle(prev=>!prev)} className="text-sm text-red-600 cursor-pointer">
          Deactivate Account
        </h5>
        <p className="text-sm text-rooster-textSimple">
          Deactivate will suspend your account until you signin back.
        </p>
        <Modal
          open={deactivateToggle}
          setOpen={setDeactivateToggle}
          heading="Deactivate account"
        >
          <DeactivateUserForm />
        </Modal>
      </div>
      <div>
        <h5  onClick={()=>setDeleteToggle(prev=>!prev)} className="text-sm text-red-600 leading-4 cursor-pointer">
          Delete Account
        </h5>
        <p className="text-sm text-rooster-textSimple">
          Permanently delete your account and all of your content.
        </p>
        <Modal
          open={deleteToggle}
          setOpen={setDeleteToggle}
          heading="Delete account"
        >
          <DeleteUserForm />
        </Modal>
      </div>
    </div>
  );
};

export default AdvanceSettings;
