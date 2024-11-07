import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, LucideBell, ChevronDown, Divide } from 'lucide-react';
import { useWindowSize } from '../../../context/ResponsiveContext';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContextProvider';

type Props = {
  title: string,
  description: string,
  channelName: string,
  subscribers: number,
  avatar: string,
  views: number,
  published: Date,
  channelId: string
};

const VideoActionBar = ({ 
  title, 
  description, 
  channelName, 
  subscribers, 
  avatar,
  views,
  published,
  channelId
}: Props) => {
  const { token, user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  
  const handleSubscription = async () => {
    if (!user) {
      navigate('/login');
      return; // Prevent further execution if user is not logged in
    }
  
    if (isLoading) return;
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v0/subscription/subscribe/${channelId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      if (response.data.successCode) {
        if (response.data.message === 'Subscribed') {
          setIsSubscribed(true);
          addSubscriptionToLocalStorage(response.data.data.subscription);
        } else if (response.data.message === 'Unsubscribed') {
          setIsSubscribed(false);
          removeSubscriptionFromLocalStorage(response.data.data.removedSubscription);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addSubscriptionToLocalStorage = (subscription) => {
    const storedData = localStorage.getItem('subscriptionData');
    let subscriptionData = storedData ? JSON.parse(storedData) : [];
    subscriptionData.push(subscription);
    localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
  };
  
  const removeSubscriptionFromLocalStorage = (subscription) => {
    const storedData = localStorage.getItem('subscriptionData');
    let subscriptionData = storedData ? JSON.parse(storedData) : [];
    subscriptionData = subscriptionData.filter(
      (item) => item._id !== subscription._id
    );
    localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
  };
  
  useEffect(() => {
    const checkSubscriptionStatus = () => {
      if (!user) {
        return;
      }
  
      try {
        const storedData = localStorage.getItem('subscriptionData');
        if (storedData) {
          const subscriptionData = JSON.parse(storedData);
          if (Array.isArray(subscriptionData)) {
            const isUserSubscribed = subscriptionData.some(
              (item) =>
                item.subscriber._id === user._id && item.channelId === channelId
            );
            setIsSubscribed(isUserSubscribed);
          }
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };
  
    checkSubscriptionStatus();
  }, [user]);

  

   

  return (
    <div className=" w-full px-1 space-y-4">
      {/* Video Title */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold line-clamp-2">{title}</h1>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-3 ">
        {/* Channel Info */}
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={avatar} 
                alt={channelName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-medium">{channelName}</h2>
              <p className="text-base text-gray-500">
                {subscribers?.toLocaleString()} subscribers
              </p>
            </div>
          </div>

          <button 
            className=" bg-white text-black px-4 py-2 rounded-full" 
            onClick={handleSubscription}
            disabled={isLoading}
          >
            {isSubscribed ? 
              <p className='flex gap-1 items-center justify-center'>
                <LucideBell/> subscribed
              </p> 
              : "Subscribe"
            }
          </button >
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-transparent greyish-filter-bg text-[#f1f1f1] rounded-full">
            <button className="flex items-center gap-2 px-4 py-2 rounded-l-full">
              <ThumbsUp size={20} />
              <span className="text-sm font-medium">Like</span>
            </button>
            <span>|</span>
            <button className="flex items-center gap-2 px-4 py-2 rounded-r-full">
              <ThumbsDown size={20} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-full greyish-filter-bg text-[#f1f1f1]">
            <Share2 size={20} />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="text-base text-[#f1f1f1] px-1 py-4 rounded-lg mb-4  greyish-filter-bg ">
        <div className="flex flex-row gap-4 font-medium px-2">
          <p className="flex gap-1">
            {views} <a href="" className="font-normal">views</a>
          </p>
          <p>{new Date(published).toDateString()}</p>
        </div>
        
        <div className="px-2 mt-2">
          {isExpanded ? (
            <p>{description}</p>
          ) : (
            <p className="relative">
              <span className="line-clamp-2">{description}</span>
              {description.length > 5 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-400 hover:text-blue-300 ml-1 cursor-pointer"
                >
                  ...more
                </button>
              )}
            </p>
          )}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-400 hover:text-blue-300 mt-1 cursor-pointer"
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoActionBar;