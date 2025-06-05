import { useEffect, useState } from "react";
import { useAccountInfo } from "../../hooks/useAccount";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "react-router-dom";
import type { AccountResponse } from "../../api/accountApi";
import { KeySquare, SquarePen } from "lucide-react";
import personIcon from "../../assets/icons8-person-94.png";
import { Spinner } from "../../components/Spiner";

const InfoPage = () => {
  const { mutate, isPending } = useAccountInfo();
  const { id: pathId } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");
  const [userInfo, setUserInfo] = useState<AccountResponse | null>(null);

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
    <div className="flex flex-col items-center  h-screen bg-gray-100">
      {userInfo ? (
        <div className="bg-white px-6 rounded-lg shadow-md w-3/5 h-1/2">
          <div className="flex justify-between rounded-lg h-[100px]">
            <div className="flex items-center justify-center gap-2">
              <img src={personIcon} alt="info" className="w-10 h-10" />
              <h2 className="text-2xl font-semibold items-center justify-center">
                {userInfo.fullname}
              </h2>
            </div>
            <div className="flex flex-row gap-4">
              <button className="flex flex row gap-1  p-3 justify-center items-center cursor-pointer">
                <span>Edit</span>
                <SquarePen />
              </button>
              <button className="flex flex row gap-1 p-3 justify-center items-center cursor-pointer">
                <span>Change Password</span>
                <KeySquare />
              </button>
            </div>
          </div>

          <div className="space-y-2 border border-slate-100 rounded-lg ">
            <div className="grid grid-cols-2 p-9">
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
