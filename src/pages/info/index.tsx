import { useEffect, useState } from "react";
import { useAccountInfo } from "../../hooks/useAccount";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";
import type { AccountResponse } from "../../api/accountApi";
import { KeySquare, Save, SquarePen, SquareX } from "lucide-react";
import personIcon from "../../assets/icons8-person-94.png";
import { Spinner } from "../../components/Spiner";
import Modal from "../../components/Modal";

const InfoPage = () => {
  const { mutate, isPending } = useAccountInfo();
  const { id: pathId } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");
  const [userInfo, setUserInfo] = useState<AccountResponse | null>(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    // Only show validation error if both fields have content
    // This prevents errors showing when the modal first opens
    if (confirmPassword.length > 0 && newPassword.length > 0) {
      setIsValidConfirmPassword(newPassword === confirmPassword);
    } else {
      // Don't show error when either field is empty
      setIsValidConfirmPassword(true);
    }
  }, [newPassword, confirmPassword]);

  const handleOpenModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleCloseModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleOpenModalChangePassword = () => {
    // Reset fields before opening the modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsValidConfirmPassword(true);
    setIsFormSubmitted(false);
    setErrors({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
    setIsModalChangePasswordOpen(true);
  };

  const handleCloseModalChangePassword = () => {
    setIsModalChangePasswordOpen(false);
    // Reset password fields when closing the modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsValidConfirmPassword(true);
    setIsFormSubmitted(false);
    setErrors({
      oldPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: oldPassword.length === 0,
      newPassword: newPassword.length === 0,
      confirmPassword: confirmPassword.length === 0,
    };

    setErrors(newErrors);

    // Form is valid if there are no errors and passwords match
    return (
      !Object.values(newErrors).some((error) => error) && isValidConfirmPassword
    );
  };
  useEffect(() => {
    const id = pathId || queryId;

    if (id) {
      mutate(id, {
        onSuccess: (response) => {
          console.log("User information loaded successfully:", response);
          if (response && response.data) {
            setUserInfo(response.data);
          } else {
            toast.error("Failed to load user information");
          }
        },
      });
    } else {
      toast.error("No ID provided in the URL");
    }
  }, [pathId, queryId, mutate]);

  return isPending ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center h-screen bg-gray-100 pt-6">
      <Modal
        isOpen={isModalEditOpen}
        onClose={handleCloseModalEdit}
        onSubmit={() => {
          // Handle form submission logic here
          handleCloseModalEdit();
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="flex flex-col mb-4 gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-28 text-sm text-start font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={userInfo?.fullname || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-28 text-sm text-start font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              readOnly
              defaultValue={userInfo?.username || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-28 text-sm text-start font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              readOnly
              defaultValue={userInfo?.email || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div></div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModalEdit}
            className="px-3 py-1 bg-red-400 hover:bg-red-600 rounded "
          >
            <SquareX />
          </button>
          <button
            onClick={() => {
              // Handle form submission
              handleCloseModalEdit();
            }}
            className="px-3 py-1 rounded bg-blue-400 hover:bg-blue-600"
          >
            <Save />
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isModalChangePasswordOpen}
        onClose={handleCloseModalChangePassword}
        onSubmit={() => {
          // Handle form submission logic here
          handleCloseModalChangePassword();
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col mb-4 gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-40 text-sm text-start font-medium mb-2">
              Old Password
            </label>{" "}
            <div className="flex flex-col w-full">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  if (e.target.value.length > 0) {
                    setErrors((prev) => ({ ...prev, oldPassword: false }));
                  }
                }}
                className={`w-full px-3 py-2 border ${
                  errors.oldPassword && isFormSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.oldPassword && isFormSubmitted && (
                <span className="text-start text-sm text-red-400 mt-1">
                  Old password is required.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-40 text-sm text-start font-medium mb-2">
              New Password
            </label>{" "}
            <div className="flex flex-col w-full">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (e.target.value.length > 0) {
                    setErrors((prev) => ({ ...prev, newPassword: false }));
                  }
                }}
                className={`w-full px-3 py-2 border ${
                  errors.newPassword && isFormSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.newPassword && isFormSubmitted && (
                <span className="text-start text-sm text-red-400 mt-1">
                  New password is required.
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center">
            <label className="w-40 text-sm text-start font-medium mb-2">
              Confirm Password
            </label>
            <div className="flex flex-col w-full">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (e.target.value.length > 0) {
                    setErrors((prev) => ({ ...prev, confirmPassword: false }));
                  }
                }}
                className={`w-full px-3 py-2 border ${
                  (errors.confirmPassword || !isValidConfirmPassword) &&
                  isFormSubmitted
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.confirmPassword && isFormSubmitted && (
                <span className="text-start text-sm text-red-400 mt-1">
                  Confirm password is required.
                </span>
              )}
              {!errors.confirmPassword &&
                !isValidConfirmPassword &&
                confirmPassword.length > 0 && (
                  <span className="text-start text-sm text-red-400 mt-1">
                    Confirm password not match.
                  </span>
                )}
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModalChangePassword}
            className="px-3 py-1 bg-red-400 hover:bg-red-600 rounded "
          >
            <SquareX />
          </button>
          <button
            onClick={() => {
              // Handle form submission
              setIsFormSubmitted(true);
              if (validateForm()) {
                // Continue with API call or whatever is needed
                toast.success("Password changed successfully!");
                handleCloseModalChangePassword();
              }
            }}
            className="px-3 py-1 rounded bg-blue-400 hover:bg-blue-600"
          >
            <Save />
          </button>
        </div>
      </Modal>
      {userInfo ? (
        <div
          className={`bg-white px-6 rounded-lg shadow-md w-3/5 transition-all duration-300 ${
            isModalEditOpen ? "blur-[1px] opacity-60 pointer-events-none" : ""
          }`}
        >
          <div className="flex justify-between rounded-lg h-[100px]">
            <div className="flex items-center justify-center gap-2">
              <img
                src={personIcon}
                alt="info"
                className="w-10 h-10"
                title="Avatar"
              />
              <h2 className="text-2xl font-semibold items-center justify-center">
                {userInfo.fullname}
              </h2>
            </div>
            <div className="flex flex-row">
              <button
                className="flex flex row gap-1 p-3 justify-center items-center cursor-pointer"
                title="Edit Profile"
                onClick={handleOpenModalEdit}
              >
                <SquarePen />
              </button>
              <button
                className="flex flex row gap-1 p-3 justify-center items-center cursor-pointer"
                title="Change Password"
                onClick={handleOpenModalChangePassword}
              >
                <KeySquare />
              </button>
            </div>
          </div>

          <div className="space-y-2 border border-slate-100 rounded-lg mb-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 p-9">
              <div className="flex flex-col items-start justify-center gap-10 p-4 border-b border-slate-100">
                <span className="font-bold text-lg">Username</span>
                <p className="ml-1"> {userInfo.username}</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-10 p-4 border-b border-slate-100">
                <span className="font-bold text-lg">Email</span>
                <p className="ml-1"> {userInfo.email}</p>
              </div>
              <div className="flex flex-col items-start justify-center gap-10 p-4 border-b border-slate-100">
                <span className="font-bold text-lg">Created</span>
                <p className="ml-1">
                  {new Date(userInfo.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-700">Loading user information...</p>
      )}
    </div>
  );
};
export default InfoPage;
