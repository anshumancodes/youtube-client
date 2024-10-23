import React from 'react';
import { ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

type Props = {
  title: string,
  description: string,
  channelName: string,
  subscribers: number,
  avatar: string
};

const VideoActionBar = ({ 
  title, 
  description, 
  channelName, 
  subscribers, 
  avatar 
}: Props) => {
  return (
    <div className="max-w-4xl w-full px-4 py-3 space-y-4">
      {/* Video Title */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold line-clamp-2">{title}</h1>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-3 border-b border-gray-200">
        {/* Channel Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={avatar} 
                alt={channelName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-medium">{channelName}</h2>
              <p className="text-sm text-gray-600">
                {subscribers?.toLocaleString()} subscribers
              </p>
            </div>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
            Subscribe
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-full">
            <button className="flex items-center gap-2 px-4 py-2 rounded-l-full hover:bg-gray-200">
              <ThumbsUp size={20} />
              <span className="text-sm font-medium">Like</span>
            </button>
            <div className="w-px h-6 bg-gray-300" />
            <button className="flex items-center gap-2 px-4 py-2 rounded-r-full hover:bg-gray-200">
              <ThumbsDown size={20} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <Share2 size={20} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-800">
        <p className="line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default VideoActionBar;