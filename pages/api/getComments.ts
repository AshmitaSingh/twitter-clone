// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { Comment } from '../../typings';
import { sanityClient } from '../../sanity';

const commentQuery = groq`
    *[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id)] {
        _id,
        ...
    } | order(_createdAt desc)
`

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // We get the 'tweetId' back
  const { tweetId } = req.query;

  //Fetch comments of type 'Comment'
  const comments: Comment[] = await sanityClient.fetch(commentQuery, {
      tweetId
  });
  res.status(200).json(comments);
}
