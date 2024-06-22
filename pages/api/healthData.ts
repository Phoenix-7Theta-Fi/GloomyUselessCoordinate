import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { patientId } = req.query;
  try {
    const { data } = await supabase
      .from('health_analytics')
      .select('*')
      .eq('patient_id', patientId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health data' });
  }
};
