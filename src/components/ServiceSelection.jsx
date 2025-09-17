import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { services } from '../data/services'; // Import shared services

export default function ServiceSelection({ onServiceSelect }) {
  const [selectedService, setSelectedService] = useState('');

  const handleServiceSelect = (serviceName, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Service clicked:', serviceName); // Debug line
    setSelectedService(serviceName);
    if (onServiceSelect) {
      onServiceSelect(serviceName);
    }
  };

  console.log('Current selected service:', selectedService); // Debug line
  console.log('Available services:', services); // Debug line

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Choose Your Service
        </h3>
        <p className="text-slate-600">
          Select the service that matches your project needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isSelected = selectedService === service.name;
          
          console.log(`Service: ${service.name}, Selected: ${isSelected}`); // Debug line
          
          return (
            <label key={service.name} className="cursor-pointer block" onClick={(e) => e.stopPropagation()}>
              <input
                type="radio"
                name="service"
                value={service.name}
                checked={isSelected}
                onChange={(e) => handleServiceSelect(e.target.value, e)}
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

      {/* Show selected service */}
      {selectedService && (
        <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-200">
          <p className="text-slate-700">
            <span className="font-medium">Selected:</span> {selectedService}
          </p>
        </div>
      )}
    </div>
  );
}