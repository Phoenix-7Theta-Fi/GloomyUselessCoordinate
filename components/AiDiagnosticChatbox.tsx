import React, { useState } from 'react';
import { getDiagnosis } from '../lib/geminiApi';
import { supabase } from '../lib/supabaseClient';

const AiDiagnosticChatbox: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [productRecommendations, setProductRecommendations] = useState<string[]>([]);

  const handleDiagnose = async () => {
    const diagnosisResult = await getDiagnosis(symptoms);
    setDiagnosis(diagnosisResult.diagnosis);
    setTreatmentPlan(diagnosisResult.treatment_plan);
    setProductRecommendations(diagnosisResult.product_recommendations);

    // Save diagnosis data to health analytics
    const userId = supabase.auth.user()?.id;
    if (userId) {
      await supabase
        .from('diagnoses')
        .insert([
          {
            patient_id: userId,
            diagnosis: diagnosisResult.diagnosis,
            treatment_plan: diagnosisResult.treatment_plan,
            product_recommendations: diagnosisResult.product_recommendations,
          },
        ]);
    }
  };

  return (
    <div>
      <h2>AI Diagnostic Chatbox</h2>
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Describe your symptoms"
      />
      <button onClick={handleDiagnose}>Diagnose</button>
      {diagnosis && (
        <div>
          <h3>Diagnosis: {diagnosis}</h3>
          <p>Treatment Plan: {treatmentPlan}</p>
          <ul>
            {productRecommendations.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AiDiagnosticChatbox;
