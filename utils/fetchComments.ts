import { Comment } from "../typings";

export const fetchComments = async (tweetId: string) => {
    // a call to the backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`);

    const comments: Comment[] = await res.json();

    return comments;
}