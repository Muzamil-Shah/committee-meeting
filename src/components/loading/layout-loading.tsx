import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useNavigate } from "react-router-dom";

type Props = {};

function LayoutLoader({}: Props) {
  const navigate = useNavigate();
  const [unauthorized,setUnauthorized] = useState<boolean>(false);

  setTimeout(() => {
    setUnauthorized(true)
  },1000* 10)

  if(unauthorized){
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
  <h1 className="text-9xl font-extrabold text-gray-900">403</h1>
  <h2 className="text-3xl font-bold mt-4">Access Denied</h2>
  <p className="mt-2 text-gray-600">
    Sorry, you don’t have permission to access this page.
  </p>
  <button
    onClick={() => navigate("/login")}
    className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-red-300"
  >
    Go to Login
  </button>
</div>

  )
  }
  return (
    <div className="w-full h-screen flex justify-start items-start  p-2 gap-2">
      <Skeleton className="w-3/12 h-full rounded-xl shadow" />
      <div className="w-9/12 h-full flex flex-col justify-start items-start gap-2">
        <Skeleton className="w-full  h-10 rounded-lg shadow" />

        <Skeleton className="w-full h-full rounded-lg shadow" />
      </div>
    </div>
  );
}

export default LayoutLoader;
