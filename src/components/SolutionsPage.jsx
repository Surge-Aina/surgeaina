import React, { useState, useEffect } from 'react';
import { Code, Smartphone, Zap, Cloud, Shield, TestTube } from 'lucide-react';
import { Link } from "react-router-dom";

import Navbar from './Navbar';
export default function SolutionsPage(){
  // Enhanced services with icons and gradients
  const services = [
    { 
      name: 'Web Development', 
      icon: Code, 
      gradient: 'from-blue-500 to-cyan-500', 
      description: 'Modern websites & web applications built with cutting-edge technologies'
    },
    { 
      name: 'Mobile Application Development', 
      icon: Smartphone, 
      gradient: 'from-purple-500 to-pink-500', 
      description: 'Native iOS & Android apps that deliver exceptional user experiences'
    },
    { 
      name: 'Custom Software Development', 
      icon: Zap, 
      gradient: 'from-orange-500 to-red-500', 
      description: 'Tailored software solutions designed specifically for your business needs'
    },
    { 
      name: 'Cloud Management', 
      icon: Cloud, 
      gradient: 'from-green-500 to-blue-500', 
      description: 'Scalable cloud infrastructure and DevOps solutions for modern businesses'
    },
    { 
      name: 'Technical Support', 
      icon: Shield, 
      gradient: 'from-indigo-500 to-purple-500', 
      description: '24/7 technical assistance and maintenance for your digital systems'
    },
    { 
      name: 'Software Testing', 
      icon: TestTube, 
      gradient: 'from-teal-500 to-green-500', 
      description: 'Comprehensive quality assurance and testing services'
    }
  ];

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
              Get expert help for your next project
            </p>
          
            <Link
                to="/contact"
                className="bg-slate-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold font-inter transition-colors shadow-lg"
              >
            Request Proposals
              </Link>
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
                    {/* Simple Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      {/* Service Title */}
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-gray-800 transition-colors">
                        {service.name}
                      </h3>
                      
                      {/* Service Description */}
                      <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Overlay Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gray-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}