import React from "react";
import { useWindowSize } from "../../context/ResponsiveContext";
import { Home, UserCircle } from "lucide-react";
import { useUserProfile } from "../../context/UserProfileContext";



const BottomNav= () => {
  const { isMobile } = useWindowSize();
  const {profile, error, loading}=useUserProfile()
   
  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <NavButton icon={<Home size={24} />} label="Home" />
        <NavButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
            </svg>
          }
          label="Reels"
        />
        <NavButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
            </svg>
          }
          label="Videos"
        />
      {profile? (  <ProfileButton profileImg={profile.avatar} />): (<a className="flex flex-col" href="/login"><UserCircle/> you</a>)}
      </div>
    </nav>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label }) => (
  <button className="flex flex-col items-center" aria-label={label}>
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

interface ProfileButtonProps {
  profileImg: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ profileImg }) => (
  <button
    aria-label="Profile"
    className="rounded-full w-8 h-8 overflow-hidden"
  >
    <img src={profileImg} alt="" className="w-full h-full object-cover" />
  </button>
);

export default BottomNav;