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
  return (
    <div className="w-[360px]">
      <Link to={`/watch/${videoid}`}>
      <div className="flex flex-col gap-2 rounded-lg overflow-hidden hover:cursor-pointer hover:bg-gray-100 transition duration-200">
        {/* Video Thumbnail */}
        <div className="relative">
          <img
            src={thumbnail}
            alt="Video Thumbnail"
            className="w-full h-[260px] object-cover"
          />
          {/* Video duration overlay */}
          <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
            {duration.toFixed(2)} {/* Display video duration */}
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
              <h3 className="text-sm font-bold leading-tight line-clamp-2">
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


