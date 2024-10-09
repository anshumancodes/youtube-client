import React, { useState } from 'react';
import SideBar from '../../components/Nav/SideBar';
import BottomNav from '../../components/Nav/BottomNav';
import Navbar from '../../components/Nav/Navbar';
import { useWindowSize } from '../../context/ResponsiveContext';
import TagsBar from '../../components/Video/TagsBar';

import Feed from '../../components/Video/Feed';
import { useAuth } from '../../context/AuthContextProvider';

type Props = {};

const Home = (props: Props) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isMobile } = useWindowSize();
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      {/* Tags bar */}
      {!isMobile && <TagsBar />} {/* Maybe hide on mobile for cleaner UI */}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isMobile && (
          <SideBar
            isCollapsed={isSidebarCollapsed}
            className={`transition-width duration-300 ${
              isSidebarCollapsed ? 'w-16' : 'w-64'
            }`}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Feed />
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Home;
