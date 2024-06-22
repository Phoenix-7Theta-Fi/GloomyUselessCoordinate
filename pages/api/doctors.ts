import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await supabase.from('doctors').select('*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};
