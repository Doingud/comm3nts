import type { NextApiRequest, NextApiResponse } from 'next'
import { getContractNft } from '../../src/utils/web3api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { chain, address } = req.body;
  try {
    const response = await getContractNft(chain, address)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(400).json({error})
  }
}
