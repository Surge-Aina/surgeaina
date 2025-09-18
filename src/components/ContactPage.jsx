import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  
  const [formFields, setFormFields] = useState({
    fullName: '',
    email: '',
    message: '',
    mobileNumber: ''
  });

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const USER_TEMPLATE_ID= import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
  e.preventDefault();
  setSending(true);
  setStatus(null);

  const form = e.currentTarget;
  const fd = new FormData(form);

  // Common data
  const commonData = {
    name: fd.get("fullName"),              
    user_email: fd.get("email"),                
    message: fd.get("message"),            
    mobile: fd.get("mobileNumber") || "",  
    title: "Surge Aina Enquiry",          
    time: new Date().toLocaleString(),    
  };

  try {
    // EMAIL 1: To the company 
    const companyParams = {
      ...commonData,
      to_email: "your-company@example.com",  // Your company email
      email: fd.get("email"),  // User's email (for reply-to)
    };
    
    await emailjs.send(
      SERVICE_ID, 
      TEMPLATE_ID,           
      companyParams, 
      { publicKey: PUBLIC_KEY }
    );
    
    // EMAIL 2: To user (confirmation )
    const userParams = {
      ...commonData,
      to_email: fd.get("email"),     // User's email
      email: fd.get("email"),        // User's email
    };
    
    await emailjs.send(
      SERVICE_ID, 
      USER_TEMPLATE_ID,      // User template: "Your message received"
      userParams, 
      { publicKey: PUBLIC_KEY }
    );
    
    setStatus({ 
      ok: true, 
      msg: "Message sent! Please check your email for confirmation." 
    });
    form.reset();
    
  } catch (err) {
    console.error(err);
    setStatus({ 
      ok: false, 
      msg: "Failed to send. Please try again." 
    });
  } finally {
    setSending(false);
  }
}
  return (
    <>
      <Navbar />
      
        <section className="relative max-w-7xl mx-auto px-4 py-16 rounded-xl ml-auto mr-auto shadow-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl  text-slate-800 mb-6 text-center font-inter ml-auto mr-auto">
              Enquire About Our Services
            </h1>
            <div className="w-20 h-1 mx-auto mb-2" />
            <p className="text-lg text-slate-600 text-center mb-6 font-inter">
              We're here to help you begin your journey. Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          {/* APPROACH 1: Grid-based with better balance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Info Section - Takes 1/3 */}
            <div className="bg-slate-700 text-white rounded-xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 font-inter">Why Enquire With Us?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-200 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Expert guidance from industry professionals</span>
                </li>
                
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-200 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <a 
                      href="https://www.findvirtual.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-50 hover:text-white text-lg underline transition-colors"
                    >
                      Try our feature - FindVirtual.me
                    </a>
                  </span>
                </li>
                
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-red-200 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <a 
                      href="https://www.linkedin.com/company/surgeaina/services/request-proposal/?viewAsMember=true" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-50 hover:text-white text-lg underline transition-colors"
                    >
                      Connect with us on LinkedIn for updates
                    </a>
                  </span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-slate-600">
                <h3 className="text-lg font-semibold mb-2">Need assistance?</h3>
                <p className="text-red-50 mb-2">Call us at +1 5306365748</p>
                <p className="text-sm text-red-50">Our team is available 10AM - 6PM, Monday to Saturday</p>
              </div>
            </div>

            {/* Form Section - Takes 2/3 */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-xl p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formFields.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formFields.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formFields.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="+1 9876543210"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formFields.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your interests and goals..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-slate-900 hover:bg-slate-700 text-white px-12 py-4 rounded-lg font-semibold font-inter transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>
                </div>

                {status && status.ok && (
                  <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
                    <p className="text-sm font-semibold text-green-800 text-center">
                      ✅ {status.msg}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
     
      <Footer/>
    </>
  );
}