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

      <main className="min-h-screen bg-gray-50">
        <section className="relative max-w-7xl mx-auto px-4 py-16 bg-gray-100 rounded-xl shadow-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-center font-inter">
              Enquire About Our Services
            </h1>
            <div className="w-20 h-1 bg-slate-900 mx-auto mb-6" />
            <p className="text-lg text-slate-600 text-center mb-12 font-inter">
              We're here to help you begin your journey. Fill out the form below and our team will get back to you shortly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* left column (unchanged) */}
              <div className="bg-slate-700 text-white rounded-lg p-8 shadow-lg">
                <div>
                  <h2 className="text-2xl font-bold mb-6 font-inter">Why Enquire With Us?</h2>
                  <ul className="space-y-4 text-lg ">
                    {[
                      "Expert guidance from industry professionals",
              
                    ].map((t) => (
                      <li key={t} className="flex items-start">
                        <svg className="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                
              <br></br>
              <li className="flex items-start">
                      <svg className="h-6 w-6 text-red-200 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
                    <br></br>
                <li className="flex items-start">
    <svg className="h-6 w-6 text-red-200  mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-2">Need assistance?</h3>
                  <p className="text-red-50 mb-2">Call us at +1 5306365748</p>
                  <p className="text-sm text-red-50">Our team is available 10AM - 6PM, Monday to Saturday</p>
                </div>
              </div>

              {/* right column — form */}
              <div className="md:w-2/3 p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formFields.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-950 focus:border-amber-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formFields.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-950 focus:border-amber-950"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formFields.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-950 focus:border-amber-950"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formFields.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your interests and goals..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-amber-950 focus:border-amber-950"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-slate-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold font-inter transition-colors shadow-lg"
                  >
                    {sending ? "Sending..." : "Submit Enquiry"}
                  </button>

                  {status && status.ok && (
                    <div className="mt-3 p-3 rounded-xl bg-orange-50 ">
                      <p className="text-sm font-bold text-black text-center drop-shadow-lg">
                        🌟 {status.msg} 🌟
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}