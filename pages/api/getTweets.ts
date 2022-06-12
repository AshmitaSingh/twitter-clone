// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity';
import { Tweet } from '../../typings';
import { groq } from 'next-sanity';

const feedQuery = groq`
    *[_type == 'tweet' && !blockTweet ] {
        _id,
        ...
    } | order(_createdAt desc)
`

// This is the response that will be sent back
type Data = {
  tweets: Tweet[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // We get the 'tweets' back
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ tweets })
}
