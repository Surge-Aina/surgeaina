import React, { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { serviceQuestions } from '../data/serviceQuestions';
import AdditionalDetails from './AdditionalDetails';

export default function TechnicalSupportQuestions({ onContinue }) {
  const [currentQuestionStep, setCurrentQuestionStep] = useState(1);
  const [answers, setAnswers] = useState({
    project_description: '',
    timeline: ''
  });

  const questions = serviceQuestions['Technical Support'];

  const handleTextareaChange = (questionId, value) => {
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

  const handleStep1Continue = () => {
    if (canProceedFromStep1()) {
      setCurrentQuestionStep(2); // Go to Additional Details
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

  // Step 2: Additional Details Component
  if (currentQuestionStep === 2) {
    return (
      <AdditionalDetails
        serviceName="Technical Support"
        onBack={() => setCurrentQuestionStep(1)}
        onContinue={handleAdditionalDetailsContinue}
      />
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