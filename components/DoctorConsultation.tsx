import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const DoctorConsultation: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [appointmentDate, setAppointmentDate] = useState<string>('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await supabase.from('doctors').select('*');
      setDoctors(data || []);
    };
    fetchDoctors();
  }, []);

  const scheduleAppointment = async () => {
    const userId = supabase.auth.user()?.id;
    if (userId && selectedDoctor && appointmentDate) {
      await supabase
        .from('appointments')
        .insert([
          {
            patient_id: userId,
            doctor_id: selectedDoctor,
            appointment_date: new Date(appointmentDate).toISOString(),
          },
        ]);
      alert('Appointment scheduled!');
    }
  };

  return (
    <div>
      <h2>Doctor Consultation</h2>
      <div>
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Specialization: {doctor.specialization}</p>
            <p>Experience: {doctor.experience} years</p>
            <button onClick={() => setSelectedDoctor(doctor.id)}>Select</button>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <div>
          <h3>Schedule Appointment</h3>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
          <button onClick={scheduleAppointment}>Schedule</button>
        </div>
      )}
    </div>
  );
};

export default DoctorConsultation;
