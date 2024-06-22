import { NextApiRequest, NextApiResponse } from 'next';
import { getDiagnosis } from '../../lib/geminiApi';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { symptoms } = req.body;
  try {
    const diagnosis = await getDiagnosis(symptoms);
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get diagnosis' });
  }
};
