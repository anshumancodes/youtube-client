import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Dot, User } from "lucide-react";

import SideBar from "../../components/Nav/SideBar";
import BottomNav from "../../components/Nav/BottomNav";
import Navbar from "../../components/Nav/Navbar";
import { useWindowSize } from "../../context/ResponsiveContext";
import TagsBar from "../../components/Video/TagsBar";

type UserProfile = {
  name: string;
  email: string;
  username: string;
  avatar: string;
  coverImage: string;
  watchHistory: [];
};

type Props = {};

function UserChannel({}: Props) {
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isMobile } = useWindowSize();
  const { isAuthenticated } = useAuth();
  const { username } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v0/user/get-user",
          {
            headers: {
              Authorization: `${token}`,
            },
            withCredentials: true,
          }
        );

        setProfile(response.data.data);

        setError(null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile. Please try again later.");
        setProfile(null);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isMobile && (
          <SideBar
            isCollapsed={isSidebarCollapsed}
            className={`transition-width duration-300 ${
              isSidebarCollapsed ? "w-16" : "w-64"
            }`}
          />
        )}

        {/* Main Content */}
        <main className="flex flex-col gap-4 px-4 sm:px-6 md:px-20 w-full">
          <div className="border-b border-gray-600 flex flex-col md:flex-row gap-4 py-4">
            <div className="flex justify-center">
              <img
                src={`${profile?.avatar}`}
                alt=""
                className="rounded-[50%] w-[100px] h-[100px] md:w-[180px] md:h-[180px]"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center md:ml-4 text-center md:text-left">
              <h1 className="text-xl md:text-2xl">{profile?.username}</h1>
              <div className="flex justify-center md:justify-start gap-1 items-center">
                <p>@{profile?.username}</p>
                <Dot />
                <p>{`subscribers`}</p>
              </div>
              <div className="flex justify-center md:justify-start space-x-2">
                <button className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-3xl">
                  Customize channel
                </button>
                <button className="py-2 px-4 text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-3xl">
                  Manage videos
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-2xl">Playlists</h2>
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
}

export default UserChannel;
