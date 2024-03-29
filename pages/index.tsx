import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import styles from '../styles/Home.module.css'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { getSession } from 'next-auth/react'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className='mx-auto lg:max-w-6xl max-h-screen overflow-hidden'>
      <Head>
        <title>Twitter 2.0</title>
      </Head>

      <Toaster />

      <main className='grid grid-cols-9'>

        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed tweets={tweets}/>
        {/* Widgets */}
        <Widgets/>
      </main>

    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();
  const session = await getSession(context)
  return {
    props: {
      tweets,
      session
    }
  }
}
