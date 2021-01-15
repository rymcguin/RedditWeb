import Head from 'next/head'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Axios from 'axios'

import {Post} from '../types'
import PostCard from '../components/PostCard'

dayjs.extend(relativeTime)

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(()=> {
    Axios.get('/posts')
      .then(res=> setPosts(res.data))
      .catch(err=> console.log(err))
  }, [])

  return (
    <div className="pt-12">
      <Head> 
        <title>Readit: The front page of the internet</title> 
      </Head>
      <div className="container flex pt-4">
        {/* Post Feed */}
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post}/>
          ))}
        </div> 
        {/* Side Bar */}
      </div>
    </div>
  )
} 
// SERVER SIDE RENDERING
// export const getServerSideProps:GetServerSideProps = async (context) => {
//   try{
//     const res = await Axios.get('/posts')
//     return {props:{ posts: res.data}}
//   }catch(err){
//     return {props: {error: 'something went wrong :('}}
//   }

// }