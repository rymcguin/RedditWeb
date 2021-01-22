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
    // Virtuals
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
    // Virtuals
    imageUrl: string
    bannerUrl: string
    postCount?:number
}

export interface Comment{
    identifier: string
    body: string
    username: string
    createdAt: string
    updatedAt: string
    // Virtuals
    userVote: number
    voteScore: nummber
}