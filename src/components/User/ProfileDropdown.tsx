import React, { useState } from 'react';

type Props = {
    profileimg:string;
}

const ProfileDropdown = ({profileimg}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Profile Avatar (Click to open dropdown) */}
      <button
        className="flex items-center space-x-2"
        onClick={toggleDropdown}
      >
        <img
          src={profileimg} 
          alt="Profile Avatar"
          className="w-8 h-8 rounded-full"
        />
        
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/:username">Your Channel</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/settings">Settings</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/watch-history">Watch History</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/sign-out">Sign Out</a>
            </li>
          </ul>
        </div>
      )}

      {/* Click outside to close the dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProfileDropdown;
