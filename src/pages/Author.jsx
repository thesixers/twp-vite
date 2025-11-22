import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { Plus } from "lucide-react";
import { serverUrl } from "../../requests/apicalls";

export default function Author() {
  const [myWebtoons, setMyWebtoons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getMyWebtoons = async () => {
      try {
        const res = await axios.get(`${serverUrl}/twp/author`, {
          withCredentials: true,
        });
        if (res.data.webtoons) {
          setMyWebtoons(res.data.webtoons);
        }
      } catch (error) {
        console.error("Failed to fetch webtoons:", error);
        if(error.response){
          let status = error.response.status;
          if (status === 401 || status === 403) {
            setUser(null);
            navigate("/");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMyWebtoons();
  }, []);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading your webtoons...
      </div>
    );
  }

  return (
    <div className="w-full relative p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl text-gray-800">
          My Webtoons
        </h1>
      </div>

      {/* Webtoon Grid */}
      {myWebtoons.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {myWebtoons.map((toon) => {
            const diffDays = Math.floor(
              (new Date() - new Date(toon.createdAt)) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={toon._id}
                className="max-w-[250px] w-full bg-inherit border-none rounded-md overflow-hidden"
              >
                {/* Image Section */}
                <Link to={`/toon/${toon._id}`}>
                  <div className="relative aspect-[5/6] overflow-hidden group">
                    {/* "New" badge */}
                    {diffDays <= 21 && (
                      <span className="px-2 py-0.5 rounded-sm absolute top-2 left-2 bg-orange-100 text-orange-600 text-xs font-semibold">
                        New
                      </span>
                    )}

                    {/* Status badge */}
                    <span
                      className={`absolute top-2 right-2 rounded-full text-xs px-2 py-0.5 font-medium shadow-sm ${
                        toon.status === "approved"
                          ? "text-green-700 bg-green-100"
                          : toon.status === "pending"
                          ? "text-yellow-700 bg-yellow-100"
                          : "text-red-700 bg-red-100"
                      }`}
                    >
                      {toon.status}
                    </span>

                    <img
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      src={toon.coverImage}
                      alt={toon.title}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3 flex flex-col gap-1">
                    <h2 className="text-md font-semibold text-gray-800 hover:text-orange-600 transition-colors line-clamp-1">
                      {toon.title}
                    </h2>
                    <span className="text-sm text-orange-600 font-medium line-clamp-1">
                      {toon.genre}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-20">
          <p className="text-lg">You haven’t created any webtoons yet.</p>
          <button
            onClick={() => navigate("/publish")}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-600 transition"
          >
            Create Your First Webtoon
          </button>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-colors"
        onClick={() => navigate("/publish")}
      >
        <Plus size={22} />
      </button>
    </div>
  );
}
