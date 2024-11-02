import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import axios from 'axios';
import asyncHandler from '../../utils/AsyncHandler';

type Video = {
  _id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  duration: number;
  createdAt: string;
  owner: {};
  videoFile:string;

  
};

type Props = {};

const Feed = (props: Props) => {
  const [videos, setVideos] = useState<Video[]>([]); // Initialize as an array of videos
  const [error, setError] = useState<string | null>(null);

  const getVideos = asyncHandler(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v0/video/getvideos');
      setVideos(response.data.data.videos); // Set the videos from response.data.videos
    } catch (error) {
      setError('Failed to fetch videos');
    }
  });
  
  
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div>
     

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col justify-center w-full md:flex-row gap-3">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video._id}
              title={video.title}
              channelName={video.owner.username} // Replace with actual channel name if available
              thumbnail={video.thumbnail} // Pass the thumbnail
              views={video.views}
              duration={video.duration}
              createdAt={video.createdAt}
              channelpfp={video.owner.avatar}
              videoid={video._id}
            />
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
