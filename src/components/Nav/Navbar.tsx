import React, { useState, useEffect } from "react";
import { LucideBell, Mic, Search, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContextProvider";
import { useUserProfile } from "../../context/UserProfileContext";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { profile, error, loading } = useUserProfile(); // Access profile from context

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 901);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {!isMobile ? (
        <DesktopNav
          profileImg={profile?.avatar || ""}
          onToggleSidebar={onToggleSidebar}
        />
      ) : isSearchOpen ? (
        <MobileSearchBar onClose={handleSearchToggle} />
      ) : (
        <MobileNav onSearchClick={handleSearchToggle} />
      )}
    </>
  );
};

const DesktopNav: React.FC<{ profileImg: string; onToggleSidebar: () => void }> = ({
  profileImg,
  onToggleSidebar,
}) => (
  <nav className="flex flex-row justify-between items-center w-full py-4 px-4 md:px-4">
    <div className="flex gap-4 items-center">
      <span onClick={onToggleSidebar}>
        <MenuButton />
      </span>
      <YouTubeLogo />
    </div>

    <div className="flex items-center max-w-[540px] w-full">
      <SearchBar />
      <VoiceSearchButton />
    </div>

    <div className="hidden md:flex items-center gap-4">
      {profileImg ? (
        <span className="flex flex-row items-center gap-3">
          <CreateButton />
          <LucideBell />
          <ProfileButton profileImg={profileImg} />
        </span>
      ) : (
        <SigninButton />
      )}
    </div>
  </nav>
);

const SigninButton: React.FC = () => {
  return (
    <Link to="/login">
      <button className="text-blue-600 font-medium rounded-[19px] outline-none border-gray-500 border flex items-center gap-1 text-center py-1 px-2">
        Signin <UserCircle2 />
      </button>
    </Link>
  );
};

const MobileNav: React.FC<{ onSearchClick: () => void }> = ({ onSearchClick }) => (
  <nav className="flex flex-row justify-between w-full border py-2">
    <div className="flex gap-4 items-center">
      <span className="pl-2">
        <YouTubeLogo />
      </span>
    </div>

    <div className="flex items-center">
      <button
        aria-label="Search"
        className="flex items-center justify-center p-2 rounded-[50%] bg-gray-200"
        onClick={onSearchClick}
      >
        <Search size={20} />
      </button>
    </div>
  </nav>
);

const MobileSearchBar: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex items-center w-full p-2">
    <button onClick={onClose} className="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </button>
    <input
      type="search"
      placeholder="Search YouTube"
      className="flex-grow p-2 rounded-full border border-gray-300"
    />
  </div>
);

const MenuButton: React.FC = () => (
  <button aria-label="Menu" className="p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
    </svg>
  </button>
);

const YouTubeLogo: React.FC = () => (
  <img src="src/assets/youtube-logo.png" alt="YouTube Logo" width={100} />
);

const SearchBar: React.FC = () => (
  <div className="relative flex items-center w-full">
    <input
      type="search"
      placeholder="Search"
      aria-label="Search"
      className="w-full h-10 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-l-full focus:outline-none "
    />
    <button
      aria-label="Search"
      className="flex items-center justify-center h-10 px-6 text-sm font-medium text-gray-600 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 outline-none"
    >
      <Search size={20} />
    </button>
  </div>
);

const VoiceSearchButton: React.FC = () => (
  <button aria-label="Voice search" className="rounded-full p-2 ml-2 text-white bg-black hidden md:inline">
    <Mic size={20} />
  </button>
);

const CreateButton: React.FC = () => (
  <button aria-label="Create" className="p-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"></path>
    </svg>
  </button>
);

const ProfileButton: React.FC<{ profileImg: string }> = ({ profileImg }) => (
  <button aria-label="Profile" className="rounded-full w-8 h-8 overflow-hidden">
    <img src={profileImg} alt="" className="w-full h-full object-cover" />
  </button>
);

export default Navbar;
