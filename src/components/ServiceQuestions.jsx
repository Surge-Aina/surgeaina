import React, { useState } from 'react';
import WebDevQuestions from './WebDevQuestions';

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
        // Future: MobileAppQuestions component
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Mobile App Questions Coming Soon
            </h3>
            <p className="text-slate-600 mb-6">
              Mobile application development questions will be available soon.
            </p>
            <button
              onClick={() => handleContinue({})}
              className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue for now
            </button>
          </div>
        );
      
      case 'Custom Software Development':
        // Future: CustomSoftwareQuestions component
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Custom Software Questions Coming Soon
            </h3>
            <p className="text-slate-600 mb-6">
              Custom software development questions will be available soon.
            </p>
            <button
              onClick={() => handleContinue({})}
              className="bg-slate-900 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue for now
            </button>
          </div>
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