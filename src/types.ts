export interface Post{
    identifier:string
    title:string
    body?:string
    slug:string
    subname:string
    username:string
    sub?:Sub
    createdAt:string
    updatedAt:string
    voteScore?:number
    commentCount?:number
    userVote?:number
    // Virtual Fields
    url: string
}

export interface User{
    username: string
    email: string
    createdAt: string
    updatedAt: string
}

export interface Sub{
    createdAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn: string
    bannerUrn: string
    username: string
    posts: Post[]
    imageUrl: string
    bannerUrl: string
    postCount?:number
}