import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const DoctorPortal: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await supabase.from('patients').select('*');
      setPatients(data || []);
    };
    const fetchAppointments = async () => {
      const userId = supabase.auth.user()?.id;
      if (userId) {
        const { data } = await supabase
          .from('appointments')
          .select('*')
          .eq('doctor_id', userId);
        setAppointments(data || []);
      }
    };
    fetchPatients();
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Doctor Portal</h1>
      <div>
        <h2>Patients</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} - {patient.age} - {patient.gender}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Appointments</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.appointment_date} - {appointment.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorPortal;
