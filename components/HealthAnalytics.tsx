import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const HealthAnalytics: React.FC = () => {
  const [healthData, setHealthData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHealthData = async () => {
      const userId = supabase.auth.user()?.id;
      if (userId) {
        const { data } = await supabase
          .from('health_analytics')
          .select('*')
          .eq('patient_id', userId);
        setHealthData(data || []);
      }
    };
    fetchHealthData();
  }, []);

  return (
    <div>
      <h2>Health Analytics</h2>
      <ul>
        {healthData.map((entry) => (
          <li key={entry.id}>
            <p>Diagnosis ID: {entry.diagnosis_id}</p>
            <p>Product ID: {entry.product_id}</p>
            <p>Appointment ID: {entry.appointment_id}</p>
            <p>Health Data: {JSON.stringify(entry.health_data)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthAnalytics;
