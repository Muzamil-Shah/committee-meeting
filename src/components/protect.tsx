import React from "react";
import { useUser } from "../contexts/user-context";

type Props = {
  role: string[];
  children: React.ReactNode;
};

function Protect({ role, children }: Props) {
    const {user} = useUser()
//   const roles = ["User", "HOD", "MRO"];

  if (!role?.includes(user?.role!)) {
    return null;
  }
  return children;
}

export default Protect;
