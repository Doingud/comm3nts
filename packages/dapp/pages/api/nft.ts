import type { NextApiRequest, NextApiResponse } from 'next'
import { getNft } from '../../src/utils/web3api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chain, address, tokenId } = req.body;
  try {
    const response = await getNft(chain, address, tokenId)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json({error})
  }
}
