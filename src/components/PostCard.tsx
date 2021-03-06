import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Axios from 'axios'
import React, { Fragment } from 'react'
import classNames from 'classnames'
import {useRouter} from 'next/router'

import {useAuthState} from '../context/auth'
import { Post } from '../types'
import ActionButton from './ActionButton'

dayjs.extend(relativeTime)



interface PostCardProps{
    post: Post
    revalidate : Function
}

export default function PostCard({post:{identifier, slug, title, body, subname, username, userVote, commentCount, voteScore, createdAt, url, sub}, revalidate}: PostCardProps){
    
    const router = useRouter()
    const {authenticated} = useAuthState()

    const isInSubPage = router.pathname === '/r/[sub]'
    const vote = async(value: number)=>{
        if(!authenticated) router.push('/login')
        if(value === userVote) value = 0
        try {
            const res = await Axios.post('/misc/vote',{
                identifier,
                slug,
                value
            })
            if(revalidate) revalidate()
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div key={identifier} className="flex mb-4 bg-white rounded" id={identifier}>
            <div className="flex-shrink-0 w-10 py-3 text-center bg-gray-200 rounded-l">
            {/* Upvote */}
            <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600" onClick ={()=> vote(1)}>
                <i className={classNames("icon-arrow-up",{'text-blue-600': userVote === 1})}></i>
            </div>
            <p className="text-xs font-bold">{voteScore}</p>
            {/* Downvote */}
            <div className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500" onClick ={()=> vote(-1)}>
                <i className={classNames("icon-arrow-down",{'text-red-500': userVote === -1})}></i>
            </div>
            </div>
            <div className="w-full p-2 text-black">
            <div className="flex items-center">
                {!isInSubPage && (
                <>
                    <Link href={`/r/${subname}`}>
                        <img src={sub.imageUrl}
                        className="w-6 h-6 mr-1 rounded-full cursor-pointer"/>
                    </Link>
                    <Link href={`/r/${subname}`}>
                        <a className="text-xs font-bold cursor-pointer hover:underline">
                            /r/{subname}
                        </a>
                    </Link>
                    <span className="mx-1 text-xs text-gray-500">•</span> 
                </>
                )}
                <p className="text-xs text-gray-500">
                Posted by 
                <Link href={`/u/${username}`}>
                    <a className="mx-1 hover:underline">/u/{username}</a>
                </Link>
                <Link href={url}>
                    <a className="mx-1 hover:underline">{dayjs(createdAt).fromNow()}</a>
                </Link> 
                </p>
            </div>
            <Link href={url}>
                <a className="my-1 text-lg font-medium">{title}</a>
            </Link>
            {body && <p className="text-sm">{body}</p>}
            <div className="flex">
                <Link href={url}>
                <a>
                    <ActionButton>
                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                        <span className="font-bold">{commentCount}</span>
                    </ActionButton>
                </a>
                </Link>
                <ActionButton>
                    <i className="mr-1 fas fa-bookmark fa-xs"></i>
                    <span className="font-bold">Share</span>
                </ActionButton>
                <ActionButton>
                    <i className="mr-1 fas fa-bookmark fa-xs"></i>
                    <span className="font-bold">Save</span>
                </ActionButton>
            </div>
            </div>
        </div>
    )
}