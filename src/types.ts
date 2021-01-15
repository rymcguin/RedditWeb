export interface Post{
    identifier:string
    title:string
    body?:string
    slug:string
    subname:string
    username:string
    createdAt:string
    updatedAt:string
    voteScore?:number
    commentCount?:number
    userVote?:number
    // Virtual Fields
    url: string
}