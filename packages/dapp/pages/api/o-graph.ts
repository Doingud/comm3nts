import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body;

  try {
    const { error, result, response } = await ogs({
      url,
    })
    if (error) throw new Error('Cannot find metadatas');
    
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
    return res.status(400).json({error})
  }
}
