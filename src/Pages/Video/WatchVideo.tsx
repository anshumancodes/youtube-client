import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar';
import SideBar from '../../components/Nav/SideBar';
import BottomNav from '../../components/Nav/BottomNav';
import { useWindowSize } from '../../context/ResponsiveContext';
import Comments from '../../components/Video/Comments';
import 'cloudinary-video-player/cld-video-player.min.css';
import { useAuth } from '../../context/AuthContextProvider';
import VideoactionBar from '../../components/User/channel/VideoactionBar';
import axios from 'axios';

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  views: number;
  owner: string;
  videoFile: string;
}

function WatchVideo() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [videodetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const { isMobile } = useWindowSize();
  
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const { videoid } = useParams();
  const { user } = useAuth();
  
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  
  function extractVideoId(videoFile: string) {
    return videoFile.split('/').pop()?.split('.')[0];
  }

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v0/video/play/${videoid}`);
        setVideoDetails(response.data.data.video);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    if (videoid) {
      fetchVideoData();
    }
  }, [videodetails]);

  useEffect(() => {
    let player: any;

    const initializePlayer = async () => {
      const videoPlayer = (await import('cloudinary-video-player')).default;
      if (videodetails?.videoFile && videoPlayerRef.current && videoid) {
        const videocldId = extractVideoId(videodetails.videoFile);
        player = videoPlayer.videoPlayer(videoPlayerRef.current, {
          cloud_name: 'denzlvzte',
          publicId: videocldId,
          fluid: true,
          controls: true,
          playlistWidget: true,
          chaptersWidget: true,
        });
      }
    };

    initializePlayer();

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoid]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar onToggleSidebar={toggleSidebar} />
      
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
        <main className="flex-1 overflow-auto">
          <div className={`mx-auto max-w-[1200px] px-4 ${isMobile ? 'pt-4' : 'pt-6'}`}>
            {/* Video Player Container */}
            <div className="aspect-video  rounded-lg overflow-hidden mb-4">
              <video 
                ref={videoPlayerRef} 
                className="cld-video-player w-full h-full"
              />
            </div>

            {/* Video Info Section */}
            <div className="space-y-6">
              {/* Video Action Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                {videodetails && (
                  <VideoactionBar 
                    title={videodetails.title}
                    description={videodetails.description}
                    channelName={videodetails?.owner?.username || 'Unknown'}
                    subscribers={0}
                    avatar="/api/placeholder/40/40"
                  />
                )}
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                {user ? (
                  <Comments />
                ) : (
                  <div className="text-center py-6 text-gray-600">
                    Please login to view and make comments
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
}

export default WatchVideo;
