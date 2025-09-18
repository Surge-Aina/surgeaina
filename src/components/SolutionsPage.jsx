import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Zap, Cloud, Shield, TestTube, X, Check } from 'lucide-react';
import { Link } from "react-router-dom";
import { services } from '../data/services'; 
import ServiceQuestions from '../components/ServiceQuestions';

import Navbar from './Navbar';

export default function SolutionsPage(){
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  
  const handleServiceSelect = (serviceName) => {
    setSelectedService(serviceName);
    console.log('Selected:', serviceName);
  };

  const closeModal = () => {
    setShowServiceModal(false);
    setSelectedService('');
    setCurrentStep(1); // Reset to first step
  };

  const handleServiceQuestionsComplete = (data) => {
    console.log('Service questions completed:', data);
   
    closeModal();
    
  };
  
  return(
    <>
     <Navbar/>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl text-gray-900 mb-4">
              Professional Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
             View our Services and click on request proposals to get expert help for your next project
            </p>
          
            <button
              onClick={() => setShowServiceModal(true)}
              className="bg-slate-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold font-inter transition-colors shadow-lg"
            >
              Request Proposals
            </button>
          </div>

          {/* Enhanced Services List */}
          <div className="space-y-4 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-gray-800 transition-colors">
                        {service.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-xl bg-gray-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Multi-step Service Selection Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {currentStep === 1 ? 'Select a Service' : `${selectedService} Details`}
                </h2>
                <p className="text-slate-600 text-sm">
                  {currentStep === 1 
                    ? 'Choose the service you\'d like to request a proposal for'
                    : `Step ${currentStep} of 2`
                  }
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedService === service.name;
                      
                      return (
                        <label key={service.name} className="cursor-pointer block">
                          <input
                            type="radio"
                            name="service"
                            value={service.name}
                            checked={isSelected}
                            onChange={(e) => handleServiceSelect(e.target.value)}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                            isSelected 
                              ? 'border-slate-500 bg-slate-100 shadow-lg ring-2 ring-slate-200' 
                              : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-slate-200' : 'bg-gray-100'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  isSelected ? 'text-slate-700' : 'text-gray-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-medium mb-1 ${
                                  isSelected ? 'text-slate-800' : 'text-gray-800'
                                }`}>
                                  {service.name}
                                </h4>
                                <p className={`text-sm ${
                                  isSelected ? 'text-slate-600' : 'text-gray-600'
                                }`}>
                                  {service.description}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Continue Button - Shows when service is selected */}
                 {selectedService && (
  <div className="mt-6 flex justify-end">
    <button
      onClick={() => setCurrentStep(2)}
      className="inline-flex items-center bg-slate-900 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-sm"
    >
      Continue
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
)}
                </div>
              )}

              {/* Step 2: Service-specific Questions */}
              {currentStep === 2 && (
                <ServiceQuestions 
                  selectedService={selectedService}
                  onBack={() => setCurrentStep(1)}
                  onComplete={handleServiceQuestionsComplete}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}