import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  username?: string;
  role: string;
  uniqueNumber?: string;
  access?: string[];
  emailId?: string;
  preCheck?: boolean;
  expiryDate?: string;
  fullName?: string;
  token: string;
  department?: string;
  roleId?: number;
  userId?: number;
  userName?: string | null;
  email?: string;
}
type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);



export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem("token");
    const userDetails = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (token && userDetails) {
      setUser((pre) => ({...pre, token, ...userDetails }));
      setIsLoading(false)
    }
  }, []);

  // if (isLoading) {
  //   return <div>Loading... me</div>; // Or a spinner/loader
  // }


  return (
    <UserContext.Provider value={{ user, setUser,isLoading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};