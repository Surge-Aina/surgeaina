import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Home = () => {
  <Navbar/>
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-slate 800  flex items-center justify-center">
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
           
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background that appears after waves */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200 opacity-0"
          style={{
            animation: 'backgroundReveal 1s ease-out 2s forwards'
          }}
        />
        
        {/* Wave Container */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-300  to-gray-300 via-white"
        >
          {/* Wave 1 */}
          <div 
            className="absolute top-1/2 left-0 w-full h-32 rounded-full transform -translate-y-1/2 -translate-x-full opacity-0"
            style={{
              background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8) 0%, rgba(96, 165, 250, 0.9) 25%, rgba(147, 197, 253, 1) 50%, rgba(96, 165, 250, 0.9) 75%, rgba(59, 130, 246, 0.8) 100%)',
              animation: 'waveMove 3s ease-in-out forwards'
            }}
          />
          
          {/* Wave 2 */}
          <div 
            className="absolute top-1/2 left-0 w-full h-32 rounded-full transform -translate-y-1/2 -translate-x-full opacity-0"
            style={{
              background: 'linear-gradient(90deg, rgba(29, 78, 216, 0.7) 0%, rgba(59, 130, 246, 0.8) 25%, rgba(96, 165, 250, 0.9) 50%, rgba(59, 130, 246, 0.8) 75%, rgba(29, 78, 216, 0.7) 100%)',
              animation: 'waveMove 3s ease-in-out 0.3s forwards'
            }}
          />
          
          {/* Wave 3 */}
          <div 
            className="absolute top-1/2 left-0 w-full h-32 rounded-full transform -translate-y-1/2 -translate-x-full opacity-0"
            style={{
              background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.6) 0%, rgba(59, 130, 246, 0.7) 25%, rgba(96, 165, 250, 0.8) 50%, rgba(59, 130, 246, 0.7) 75%, rgba(37, 99, 235, 0.6) 100%)',
              animation: 'waveMove 3s ease-in-out 0.6s forwards'
            }}
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          {/* Top Border */}
          <div 
            className="border-t-4 border-slate-600 w-24 mx-auto mb-8 opacity-0"
            style={{
              animation: 'textReveal 1s ease-out 2.5s forwards'
            }}
          />
          
          {/* Welcome Text */}
          <h2 
            className="text-2xl md:text-3xl text-slate-600 mb-6 font-medium font-inter opacity-0"
            style={{
              animation: 'textReveal 1s ease-out 3s forwards'
            }}
          >
            Welcome to
          </h2>
          
          {/* Main Title */}
         <h1 
  className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 font-inter bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent opacity-0 leading-tight py-2"
  style={{
    animation: 'textReveal 1s ease-out 3.5s forwards'
  }}
>
  Surge Aina
</h1>
          {/* Bottom Border */}
          <div 
            className="border-b-4 border-slate-600 w-full max-w-2xl mx-auto mb-20 opacity-0"
            style={{
              animation: 'textReveal 1s ease-out 3.5s forwards'
            }}
          />
          
          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-slate-700 mb-12 font-inter opacity-0"
            style={{
              animation: 'textReveal 1s ease-out 4s forwards'
            }}
          >
            Because tech should understand you
          </p>
          
          {/* CTA Button */}
          <Link
          to="/about" 
            className="bg-slate-900 hover:bg-gray-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-inter opacity-0"
            style={{
              animation: 'textReveal 1s ease-out 4s forwards'
            }}
          >
            Get Connected
          </Link>
        </div>
      
        {/* Gentle bottom wave */}
        <div 
          className="absolute bottom-0 left-0 w-full h-24 opacity-0"
          style={{
            background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M1200 120L0 16.48 0 0 1200 0 1200 120z' fill='%2360a5fa' fill-opacity='0.3'%3E%3C/path%3E%3C/svg%3E\") repeat-x",
            animation: 'gentleWave 6s ease-in-out 4.5s infinite, fadeIn 1s ease-out 4.5s forwards'
          }}
        />
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes waveMove {
          0% {
            transform: translateX(-100%) translateY(-50%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(-50%);
            opacity: 0;
          }
        }
        
        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes backgroundReveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes gentleWave {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(-25px);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;