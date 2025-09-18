import React, { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { serviceQuestions } from '../data/serviceQuestions';
import AdditionalDetails from './AdditionalDetails';

export default function TechnicalSupportQuestions({ onContinue }) {
  const [currentQuestionStep, setCurrentQuestionStep] = useState(1);
  const [answers, setAnswers] = useState({
    project_description: '',
    timeline: '',
    // Add contact fields
    contact_name: '',
    contact_email: ''
  });

  const questions = serviceQuestions['Technical Support'];

  const handleTextareaChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleInputChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleRadioChange = (questionId, optionValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionValue
    }));
  };

  const canProceedFromStep1 = () => {
    const hasDescription = answers.project_description && answers.project_description.trim().length > 0;
    const hasTimeline = answers.timeline && answers.timeline !== '';
    return hasDescription && hasTimeline;
  };

  const canProceedFromStep2 = () => {
    const hasName = answers.contact_name && answers.contact_name.trim().length > 0;
    const hasEmail = answers.contact_email && answers.contact_email.trim().length > 0;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(answers.contact_email);
    return hasName && hasEmail && isValidEmail;
  };

  const handleStep1Continue = () => {
    if (canProceedFromStep1()) {
      setCurrentQuestionStep(2); // Go to Contact Details
    }
  };

  const handleStep2Continue = () => {
    if (canProceedFromStep2()) {
      setCurrentQuestionStep(3); // Go to Additional Details
    }
  };

  const handleAdditionalDetailsContinue = (additionalData) => {
    // Combine all answers with additional details
    const finalAnswers = {
      ...answers,
      ...additionalData
    };
    
    if (onContinue) {
      onContinue(finalAnswers);
    }
  };

  // Safety check
  if (!questions || !Array.isArray(questions)) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading questions for Technical Support</p>
      </div>
    );
  }

  // Step 3: Additional Details Component
  if (currentQuestionStep === 3) {
    return (
      <AdditionalDetails
        serviceName="Technical Support"
        onBack={() => setCurrentQuestionStep(2)}
        onContinue={handleAdditionalDetailsContinue}
      />
    );
  }

  // Step 2: Contact Information
  if (currentQuestionStep === 2) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Contact Information
          </h3>
          <p className="text-slate-600">
            Please provide your contact details
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Step 2 of 3
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">
            Full Name <span className="text-red-500">*</span>
          </h4>
          
          <input
            type="text"
            value={answers.contact_name}
            onChange={(e) => handleInputChange('contact_name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">
            Email Address <span className="text-red-500">*</span>
          </h4>
          
          <input
            type="email"
            value={answers.contact_email}
            onChange={(e) => handleInputChange('contact_email', e.target.value)}
            placeholder="Enter your email address"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:outline-none transition-colors"
          />
          {answers.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.contact_email) && (
            <p className="text-sm text-red-500">Please enter a valid email address</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentQuestionStep(1)}
              className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="text-center">
              <button
                onClick={handleStep2Continue}
                disabled={!canProceedFromStep2()}
                className="inline-flex items-center bg-slate-900 hover:bg-slate-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <p className="text-sm text-gray-500 mt-2">
                {canProceedFromStep2() ? 'Ready to continue' : 'Please fill out name and valid email'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Show both questions on one page
  if (currentQuestionStep === 1) {
    const descriptionQuestion = questions[0];
    const timelineQuestion = questions[1];
    
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Technical Support Services
          </h3>
          <p className="text-slate-600">
            Tell us about your technical support needs
          </p>
          <div className="text-sm text-gray-500 mt-2">
            Step 1 of 3
          </div>
        </div>

        {/* Project Description Question */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">
            {descriptionQuestion.label} <span className="text-red-500">*</span>
          </h4>
          
          <textarea
            value={answers.project_description}
            onChange={(e) => handleTextareaChange('project_description', e.target.value)}
            placeholder={descriptionQuestion.placeholder}
            className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-slate-500 focus:outline-none transition-colors"
            rows={5}
          />
        </div>

        {/* Timeline Question */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">
            {timelineQuestion.label} <span className="text-red-500">*</span>
          </h4>

          <div className="space-y-3">
            {timelineQuestion.options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value || option;
              const optionLabel = typeof option === 'string' ? option : option.label || option;
              const isSelected = answers.timeline === optionValue;

              return (
                <label key={index} className="cursor-pointer block">
                  <input
                    type="radio"
                    name="timeline"
                    value={optionValue}
                    checked={isSelected}
                    onChange={(e) => {
                      handleRadioChange('timeline', optionValue);
                    }}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-slate-500 bg-slate-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected 
                            ? 'border-slate-500 bg-slate-500' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {isSelected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className={`font-medium ${
                          isSelected ? 'text-slate-800' : 'text-gray-700'
                        }`}>
                          {optionLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center">
            <button
              onClick={handleStep1Continue}
              disabled={!canProceedFromStep1()}
              className="inline-flex items-center bg-slate-900 hover:bg-slate-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {canProceedFromStep1() ? 'Ready to continue' : 'Please fill out both fields above'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}