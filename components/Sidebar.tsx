import React from 'react';
import Image from 'next/image';
import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon, 
    HomeIcon
} from '@heroicons/react/outline';
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  // NextAuth 
  // There's a property called 'data' in useSession hook, and we're simply renaming the 'data' to 'session' (session = logged in)
  const  { data: session } = useSession();

  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
        <img className='m-3 h-10 w-10' src='https://links.papareact.com/drq' alt='logo'/> 
        {/* <Image 
        className='h-10 w-10'
            src='https://links.papareact.com/drq'
            height={40}
            width={40} 
            alt='logo'
        /> */}
        <SidebarRow Icon={HomeIcon} title='Home'/>
        <SidebarRow Icon={HashtagIcon} title='Explore'/>
        <SidebarRow Icon={BellIcon} title='Notifications'/>
        <SidebarRow Icon={MailIcon} title='Messages'/>
        <SidebarRow Icon={BookmarkIcon} title='Bookmarks'/>
        <SidebarRow Icon={CollectionIcon} title='Lists'/>
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'}/>
        <SidebarRow Icon={DotsCircleHorizontalIcon} title='More'/>
    </div>
  )
}

export default Sidebar;
