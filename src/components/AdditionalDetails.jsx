import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function AdditionalDetails({ onBack, onContinue, serviceName }) {
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [shareWithProviders, setShareWithProviders] = useState(true);

  const handleContinue = () => {
    if (onContinue) {
      onContinue({
        additionalDetails,
        shareWithProviders
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div className="text-center flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-1">
            Additional Information
          </h3>
          <p className="text-slate-600 text-sm">
            Step 6 of 7
          </p>
        </div>
      </div>

      {/* Additional Details Question */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-slate-800">
          Any other details about your {serviceName.toLowerCase()} project?
        </h4>
        
        <textarea
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          placeholder={`I need a website for my online shopping startup built from scratch. We will be using Stripe as our payment processor and...`}
          className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-slate-500 focus:outline-none transition-colors"
          rows={5}
        />
      </div>

      {/* Share with Providers Question */}
      
      {/* Submit Button */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-end">
         
          <button
            onClick={handleContinue}
            className="inline-flex items-center  bg-slate-900 hover:bg-slate-700 disabled:bg-gray-400 disabled:cursor-not-allowed  text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit Request
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}