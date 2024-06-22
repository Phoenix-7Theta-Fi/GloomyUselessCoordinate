import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { patientId, doctorId, appointmentDate } = req.body;
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ patient_id: patientId, doctor_id: doctorId, appointment_date: appointmentDate }]);
    if (error) {
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};
