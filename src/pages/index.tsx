import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Axios from 'axios'
import useSWR from 'swr'

import {Post} from '../types'
import PostCard from '../components/PostCard'

dayjs.extend(relativeTime)

export default function Home() {
  const {data:posts} = useSWR('/posts')

  return (
    <Fragment>
      <Head>  
        <title>Readit: The front page of the internet</title> 
      </Head>
      <div className="container flex pt-4">
        {/* Post Feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier}/>
          ))}
        </div> 
        {/* Side Bar */}
      </div>
    </Fragment>
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