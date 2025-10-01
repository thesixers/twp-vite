import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserModal({user, handleLogout}) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-[-23px] top-[50px] mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 animate-dropdown">
      <ul className="py-2 text-sm text-gray-700">
        {user?.isAuthor && (
          <li>
            <button
              onClick={() => navigate("/mywebtoons")}
              className="w-full text-left px-4 py-2 cursor-pointer hover:bg-orange-100 hover:text-orange-600 transition"
            >
              My Collection
            </button>
          </li>
        )}
        {user?.type.includes("admin") && (
          <li>
            <button
              onClick={() => navigate("/admin")}
              className="w-full text-left cursor-pointer px-4 py-2 hover:bg-orange-100 hover:text-orange-600 transition"
            >
              Admin
            </button>
          </li>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
