import React ,{useState}from 'react'
import SideBar from '../../components/Nav/SideBar'
import BottomNav from '../../components/Nav/BottomNav'
import Navbar from '../../components/Nav/Navbar'
import { useWindowSize } from '../../context/ResponsiveContext'
type Props = {}

const Home = (props: Props) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isMobile } = useWindowSize();

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  return (
   
    <div className="flex flex-col h-screen">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <SideBar isCollapsed={isSidebarCollapsed} />
        )}
        <main className="flex-1 overflow-y-auto">
          {/* Your main content goes here */}
        </main>
      </div>
      {isMobile && <BottomNav />}
    </div>
  )
}

export default Home