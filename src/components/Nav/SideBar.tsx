import React from "react";
import { History, Home, ThumbsUp } from "lucide-react";

interface Subscription {
  id: number;
  url: string;
  name: string;
}

interface SideBarProps {
  isCollapsed: boolean;
  subscriptions?: Subscription[];
}

const SideBar: React.FC<SideBarProps> = ({ isCollapsed, subscriptions = [] }) => {
  return (
    <nav
      className={`bg-gray-900 text-white h-screen overflow-y-auto transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className={`px-2 ${isCollapsed ? "py-2" : "py-4"}`}>
        <div className="space-y-4">
          <NavItem icon={<Home size={20} />} label="Home" isCollapsed={isCollapsed} />
          <NavItem icon={<ShortsSVG />} label="Shorts" isCollapsed={isCollapsed} />
          <NavItem icon={<SubscriptionsSVG />} label="Subscriptions" isCollapsed={isCollapsed} />
        </div>

        {!isCollapsed && (
          <>
            <div className="border-t border-gray-700 my-4"></div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400">You</h3>
              <NavItem icon={<ChannelSVG />} label="Your channel" isCollapsed={isCollapsed} />
              <NavItem icon={<History size={20} />} label="History" isCollapsed={isCollapsed} />
              <NavItem icon={<ThumbsUp size={20} />} label="Liked videos" isCollapsed={isCollapsed} />
            </div>

            <div className="border-t border-gray-700 my-4"></div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400">Subscriptions</h3>
              {subscriptions.map((sub) => (
                <NavItem
                  key={sub.id}
                  icon={<img src={sub.url} alt={sub.name} className="w-6 h-6 rounded-full" />}
                  label={sub.name}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isCollapsed: boolean }> = ({
  icon,
  label,
  isCollapsed,
}) => (
  <div
    className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-800 cursor-pointer ${
      isCollapsed ? "justify-center" : "space-x-4"
    }`}
  >
    {icon}
    {!isCollapsed && <span className="text-sm">{label}</span>}
  </div>
);
const ShortsSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    fill="currentColor"
  >
    <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z" />
  </svg>
);

const SubscriptionsSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    fill="currentColor"
  >
    <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z" />
  </svg>
);

const ChannelSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    fill="currentColor"
  >
    <path d="M3 3v18h18V3H3zm1.5 1.5h15v15h-15v-15zM14 8.01h-3V7h-2v1.01H7.5v1.49h1V15h1.25v-5.5h1.5V15H12.5v-5.5h1V8.01zM14 7h1.5v3H14V7zm0 4.5h1.5V15H14v-3.5z" />
  </svg>
);

export default SideBar;