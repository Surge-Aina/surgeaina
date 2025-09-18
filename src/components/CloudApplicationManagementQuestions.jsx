import React, { useState } from 'react';
import { Check, ChevronLeft } from 'lucide-react';
import { serviceQuestions } from '../data/serviceQuestions';
import AdditionalDetails from './AdditionalDetails';

export default function CloudApplicationManagementQuestions({ onContinue }) {
  const [currentQuestionStep, setCurrentQuestionStep] = useState(1);
  const [answers, setAnswers] = useState({
    development_services: [],              
    cloud_platform: [],      
    project_scope: '',
    timeline: ''
  });

  const questions = serviceQuestions['Cloud Application Management'];

  const handleCheckboxChange = (questionId, optionValue, isChecked) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      if (isChecked) {
        newAnswers[questionId] = [...(newAnswers[questionId] || []), optionValue];
      } else {
        newAnswers[questionId] = (newAnswers[questionId] || []).filter(val => val !== optionValue);
      }
      
      return newAnswers;
    });
  };

  const handleRadioChange = (questionId, optionValue) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionValue };
      
      return newAnswers;
    });
  };

  const canProceedFromStep1 = () => {
    return answers.development_services && answers.development_services.length > 0;  
  };

  const canProceedFromStep2 = () => {
    const hasCloudPlatformAnswer = answers.cloud_platform && answers.cloud_platform.length > 0;  
    const hasProjectScopeAnswer = answers.project_scope && answers.project_scope !== '';
    const hasTimelineAnswer = answers.timeline && answers.timeline !== '';
    return hasCloudPlatformAnswer && hasProjectScopeAnswer && hasTimelineAnswer;
  };

  const handleStep1Continue = () => {
    if (canProceedFromStep1()) {
      setCurrentQuestionStep(2);
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
        <p className="text-red-600">Error loading questions for Cloud Application Management</p>
      </div>
    );
  }

  // Step 3: Additional Details Component
  if (currentQuestionStep === 3) {
    return (
      <AdditionalDetails
        serviceName="Cloud Application Management"
        onBack={() => setCurrentQuestionStep(2)}
        onContinue={handleAdditionalDetailsContinue}
      />
    );
  }

  // Step 1: Show only first question (development_services)
  if (currentQuestionStep === 1) {
    const firstQuestion = questions[0];
    
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Cloud Application Management Services
          </h3>
          <p className="text-slate-600">
            What type of cloud application development services do you need?
          </p>
        </div>

        {/* First Question */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-slate-800">
            {firstQuestion.label} <span className="text-red-500">*</span>
          </h4>

          <div className="space-y-3">
            {firstQuestion.options.map((option, index) => {
              const optionValue = typeof option === 'string' ? option : option.value || option;
              const optionLabel = typeof option === 'string' ? option : option.label || option;
              const isSelected = (answers.development_services || []).includes(optionValue);

              return (
                <label key={index} className="cursor-pointer block">
                  <input
                    type="checkbox"
                    name="development_services"
                    value={optionValue}
                    checked={isSelected}
                    onChange={(e) => {
                      handleCheckboxChange('development_services', optionValue, e.target.checked);
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
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
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
              {canProceedFromStep1() ? 'Ready to continue' : 'Please select at least one service type above'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Show remaining questions (cloud_platform, project_scope, timeline)
  if (currentQuestionStep === 2) {
    const questionsToShow = questions.slice(1); // Get questions 2, 3, 4
    
    return (
      <div className="space-y-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <button
            onClick={() => setCurrentQuestionStep(1)}
            className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <div className="text-center flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              Platform & Project Details
            </h3>
            <p className="text-slate-600 text-sm">
              Tell us about your platform and project requirements
            </p>
          </div>
        </div>

        {/* Questions 2, 3, 4 */}
        <div className="space-y-8">
          {questionsToShow.map((question) => {
            const questionType = question.type || 'checkbox';
            
            return (
              <div key={question.id} className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-800">
                  {question.label} <span className="text-red-500">*</span>
                </h4>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const optionValue = typeof option === 'string' ? option : option.value || option;
                    const optionLabel = typeof option === 'string' ? option : option.label || option;
                    
                    let isSelected = false;
                    if (questionType === 'checkbox') {
                      isSelected = (answers[question.id] || []).includes(optionValue);
                    } else if (questionType === 'radio') {
                      isSelected = answers[question.id] === optionValue;
                    }

                    return (
                      <label key={index} className="cursor-pointer block">
                        <input
                          type={questionType}
                          name={question.id}
                          value={optionValue}
                          checked={isSelected}
                          onChange={(e) => {
                            if (questionType === 'checkbox') {
                              handleCheckboxChange(question.id, optionValue, e.target.checked);
                            } else {
                              handleRadioChange(question.id, optionValue);
                            }
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
                              <div className={`w-6 h-6 ${questionType === 'radio' ? 'rounded-full' : 'rounded-md'} border-2 flex items-center justify-center transition-all ${
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
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="border-t border-gray-200 pt-6">
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
              {canProceedFromStep2() ? 'Ready to continue' : 'Please answer all questions above'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}