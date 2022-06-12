import React, { useRef, useState } from 'react';
import { 
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {

    const [input, setInput] = useState<string>('');  
    const [image, setImage] = useState<string>('');  
    
    const imageInputRef = useRef<HTMLInputElement>(null);
 
    const  { data: session } = useSession();
    // when I click on the below variable, I want a box to pop-up
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // If there's no picture that is assigned there, then it shouldn't be attaching any image
        if(!imageInputRef.current?.value) return;
        setImage(imageInputRef.current.value);
        imageInputRef.current.value='';
        setImageUrlBoxIsOpen(false);
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image
        }

        // Mutate the tweets
        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })
        const json = await result.json();

        // Fetch the tweets
        const newTweets = await fetchTweets();
        setTweets(newTweets); 

        toast('Tweet Posted!', {
            icon: '✔'
        })

        return json;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        postTweet();

        setInput('');
        setImage('');
        setImageUrlBoxIsOpen(false);
    }

  return (
    <div className='flex space-x-2 p-5'>
        <img 
            className='mt-4 h-14 w-14 rounded-full object-cover' 
            src={session?.user?.image || 'https://links.papareact.com/gll'} 
            alt='dp'
        />
        
        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                type='text' 
                placeholder="What's Happening?" 
                className='h-24 w-full text-xl outline-none placeholder:text-xl' />
                <div className='flex items-center'>
                    <div className='flex flex-1 space-x-2 text-twitter'>
                        <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                        <SearchCircleIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                        <EmojiHappyIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                        <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                        <LocationMarkerIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!input || !session} 
                        className='bg-twitter text-white rounded-full py-2 px-5 font-bold disabled:opacity-40'>
                            Tweet
                    </button>
                </div>
                {imageUrlBoxIsOpen && (
                    <form className='flex mt-5 rounded-lg py-2 px-4 bg-twitter/70'>
                        <input ref={imageInputRef} className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white' type='text' placeholder='Enter Image URL...'/>
                        <button type='submit' onClick={addImageToTweet} className='font-bold text-white'>Add Image</button>
                    </form>
                )}

                {image && (
                    <img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt='post'/>
                )}

            </form>
        </div>
    </div>
  )
}

export default TweetBox;