import React from 'react';
import AiDiagnosticChatbox from './AiDiagnosticChatbox';
import ProductMarketplace from './ProductMarketplace';
import DoctorConsultation from './DoctorConsultation';
import HealthAnalytics from './HealthAnalytics';

const PatientPortal: React.FC = () => {
  return (
    <div>
      <h1>Patient Portal</h1>
      <AiDiagnosticChatbox />
      <ProductMarketplace />
      <DoctorConsultation />
      <HealthAnalytics />
    </div>
  );
};

export default PatientPortal;
