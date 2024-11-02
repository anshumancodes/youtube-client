import React from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';


type Props = {
  title: string;
  channelName: string;
  thumbnail: string;
  views: number;
  duration: number;
  createdAt: string;
  channelpfp:string;
  videoid:string
};

function VideoCard({ title, channelName, thumbnail, views, duration, createdAt ,channelpfp,videoid }: Props) {
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
  
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else if (minutes > 0) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `0.${seconds}s`;
    }
  };
  
  return (
    <div className="md:w-[360px]">
      <Link to={`/watch/${videoid}`}>
      <div className="flex flex-col gap-2 md:rounded-lg overflow-hidden hover:cursor-pointer">
        {/* Video Thumbnail */}
        <div className="relative">
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-full h-[260px] object-cover"
          />
          {/* Video duration overlay */}
          <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
            {formatDuration(duration)} {/* Display video duration */}
          </span>
        </div>
        
        {/* Video Info */}
        <div className="flex gap-3 p-2">
          {/* Channel Avatar */}
          <div>
            <img
              src={channelpfp}
              alt="Channel Avatar"
              className="rounded-[50%] w-11 h-10"
            />
          </div>
          
          {/* Title, Channel, Views */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-medium leading-tight line-clamp-2">
                {title}
              </h3>
              <EllipsisVertical className="cursor-pointer" />
            </div>
            <p className="text-gray-500 text-sm font-medium">{channelName}</p>
            <p className="text-gray-500 text-sm">
              {views} views &bull; {new Date(createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div></Link>
    </div>
  );
}

export default VideoCard;


