import React, { useState } from 'react';
import {RefreshIcon} from '@heroicons/react/outline';
import TweetBox from './TweetBox';
import { Tweet } from '../typings';
import TweetComponent from './TweetComponent';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';

interface Props {
  tweets: Tweet[]
}

function Feed({ tweets: tweetsProp }: Props) {
  // console.log(tweets);

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async () => {

    const refreshToast = toast.loading('Refreshing...');

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }

  return (
    // To implement the Scrolling functionality of Tweets/Posts --> max-h-screen overflow-scroll;
    <div className='border-x max-h-screen overflow-scroll scrollbar-hide col-span-7 lg:col-span-5'>
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon onClick={handleRefresh} className='mr-5 mt-5 h-8 w-8 text-twitter cursor-pointer 
            transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>

        {/* Tweetbox */}
        <div>
            <TweetBox setTweets={setTweets}/>
        </div>

        {/* Feed */}
        <div>
          {tweets.map(tweet => (
            <TweetComponent key={tweet._id} tweet={tweet}/>
          ))}
        </div>
    </div>
  )
}

export default Feed;