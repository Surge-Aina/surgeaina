import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import WebDevQuestions from './WebDevQuestions';
import MobileAppQuestions from './MobileAppQuestions';
import CustomSoftwareQuestions from './CustomSoftwareQuestions';
import ApplicationDevQuestions from './ApplicationDevQuestions';
import CloudManagementQuestions from './CloudManagementQuestions';
import TechnicalSupportQuestions from './TechnicalSupportQuestions';
import CloudApplicationManagementQuestions from './CloudApplicationManagementQuestions';
import SoftwareTestingQuestions from './SoftwareTestingQuestions';

export default function ServiceQuestions({ selectedService, onBack, onComplete }) {
const [isSubmitting, setIsSubmitting] = useState(false);  


 const formatFormResponses = (answers) => {
    let formatted = '';
    for (const [key, value] of Object.entries(answers)) {
      if (key !== 'additionalDetails' && key !== 'shareWithProviders') {
        const displayKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        formatted += `${displayKey}: ${displayValue}\n`;
      }
    }
    return formatted;
  };
  const handleContinue = async (answers) => {
    setIsSubmitting(true);
    
    try {
      const emailData = {
        service_name: selectedService,
        submission_date: new Date().toLocaleString(),
        form_responses: formatFormResponses(answers),
        additional_details: answers.additionalDetails || 'None provided',
        share_providers: answers.shareWithProviders ? 'Yes' : 'No'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_SERVICE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert('Request submitted successfully! We\'ll get back to you soon.');
      
      if (onComplete) {
        onComplete({
          service: selectedService,
          answers: answers
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        case 'Cloud Application Management':
  return (
    <CloudApplicationManagementQuestions
      onContinue={handleContinue}
      onBack={onBack}
      isSubmitting={isSubmitting}
    />
  );
      case 'Technical Support':
  return (
    <TechnicalSupportQuestions
      onContinue={handleContinue}
      onBack={onBack}
      isSubmitting={isSubmitting}
    />
  );
  case 'Software Testing':
  return (
    <SoftwareTestingQuestions
      onContinue={handleContinue}
      onBack={onBack}
      isSubmitting={isSubmitting}
    />
  )
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