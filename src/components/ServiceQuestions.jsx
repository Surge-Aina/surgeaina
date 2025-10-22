import React, { useState } from 'react';
// import emailjs from '@emailjs/browser';
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
//  const handleContinue = async (answers) => {
//   setIsSubmitting(true);
//   try {
//     const userEmail =
//       (answers?.email || answers?.contact_email || answers?.user_email || '').trim();

//     const emailData = {
//       service_name: selectedService,
//       submission_date: new Date().toLocaleString(),
//       form_responses: formatFormResponses(answers),
//       additional_details: answers?.additionalDetails || 'None provided',
//       share_providers: answers?.shareWithProviders ? 'Yes' : 'No',

//       // fields used by templates
//       user_email: userEmail,
//       user_name: answers?.fullName || answers?.name || 'Customer',
//       company_name: 'Surge Aina',

//       // for company template Reply-To if it expects {{email}} or {{reply_to}}
//       email: userEmail,
//       reply_to: userEmail,
//     };

//     // 1) company email (your existing template)
//     await emailjs.send(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_SERVICE_ID,
//       emailData,
//       import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//     );

//     // 2) user confirmation (only if we have a recipient)
//     if (userEmail) {
//       await emailjs.send(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_USER_SERVICE_ID,
//         {
//           ...emailData, // includes user_email for your template's To Email: {{user_email}}
//         },
//         import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//       );
//     } else {
//       console.warn('No user email found in answers; skipping user confirmation email.');
//     }

//     alert("Request submitted successfully! We've emailed you a confirmation.");
//     onComplete?.({ service: selectedService, answers });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     alert('Error submitting request. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };


const handleContinue = async (answers) => {
  setIsSubmitting(true);
  
  try {
    const userName = answers?.fullName || answers?.name || answers?.contact_name || 'Customer';
    const userEmail = (answers?.email || answers?.contact_email || answers?.user_email || '').trim();
    
    if (!userEmail) {
      alert('Email is required to submit the request.');
      setIsSubmitting(false);
      return;
    }
    
    // Prepare data for backend
    const requestData = {
      serviceName: selectedService,
      name: userName,
      email: userEmail,
      answers: answers,
      additionalDetails: answers?.additionalDetails || '',
      shareWithProviders: answers?.shareWithProviders || false
    };
    
    // Send to backend
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/service-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      alert("Request submitted successfully! We've emailed you a confirmation.");
      onComplete?.({ service: selectedService, answers });
    } else {
      alert(data.message || 'Error submitting request. Please try again.');
    }
    
  } catch (error) {
    console.error('Error submitting service request:', error);
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