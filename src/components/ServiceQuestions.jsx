import React, { useState } from 'react';
import WebDevQuestions from './WebDevQuestions';
import MobileAppQuestions from './MobileAppQuestions';
import CustomSoftwareQuestions from './CustomSoftwareQuestions';
import ApplicationDevQuestions from './ApplicationDevQuestions';
import CloudManagementQuestions from './CloudManagementQuestions';

export default function ServiceQuestions({ selectedService, onBack, onComplete }) {
const [isSubmitting, setIsSubmitting] = useState(false);  

  const handleContinue = (answers) => {
    setIsSubmitting(true);
    const submissionData = {
    service: selectedService,
    answers: answers,
    submittedAt: new Date().toISOString()
  };

  // Just log it to console for now
  console.log('Form submitted:', submissionData);
  alert('Request submitted! (Check console for data)');
  
  if (onComplete) {
    onComplete(submissionData);
  }
  };


  // Render the appropriate questions component based on selected service
  const renderQuestionsComponent = () => {
    switch (selectedService) {
    case 'Web Development':
        return (
          <WebDevQuestions 
            onContinue={handleContinue}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );
        
  
      case 'Mobile Application Development':
        return (
         <MobileAppQuestions
            onContinue={handleContinue}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );
      
      case 'Custom Software Development':
        return (
       <CustomSoftwareQuestions
        onContinue={handleContinue}
            onBack={onBack}
            isSubmitting={isSubmitting}
          />
        );

        case 'Application Development':
          return (
      <ApplicationDevQuestions
      onContinue={handleContinue}
      onBack={onBack}
      isSubmitting={isSubmitting}
      />
      );

       case 'Cloud Management':
          return (
      <CloudManagementQuestions
      onContinue={handleContinue}
      onBack={onBack}
      isSubmitting={isSubmitting}
      />
      );
      
      // Add other services here as needed
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Questions for {selectedService}
            </h3>
            <p className="text-slate-600 mb-6">
              Specific questions for this service are being prepared.
            </p>
            <button
              onClick={() => handleContinue({})}
              className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Skip to Contact
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      {renderQuestionsComponent()}
    </div>
  );
}