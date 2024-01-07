"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error("Login Failed due to: " + error.message);
      console.log("LOGOUT FAILED: ", error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    console.log("USER DATA: ", response.data);
    setCurrentUser(response.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-3 rounded bg-green-600">
        {currentUser === "nothing" ? (
          "Nothing in here!"
        ) : (
          <Link href={`/profile/${currentUser}`}>{currentUser}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}
