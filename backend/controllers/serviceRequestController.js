const ServiceRequest = require('../models/ServiceRequest');
const { sendServiceRequestEmails } = require('../services/emailService');
console.log('🔍 ServiceRequest type:', typeof ServiceRequest);
console.log('🔍 ServiceRequest.create:', typeof ServiceRequest.create);

exports.submitServiceRequest = async (req, res) => {
  try {
    console.log('🔵 Service request submitted');
    console.log('📥 Request body:', req.body);
    
    const { serviceName, name, email, answers, additionalDetails, shareWithProviders } = req.body;
    
    // Validation
    if (!serviceName || !name || !email || !answers) {
      return res.status(400).json({ 
        success: false,
        message: 'Service name, name, email, and answers are required' 
      });
    }
    
    // Save service request to database
  const serviceRequest = new ServiceRequest({
  serviceName,
  name,
  email,
  answers,
  additionalDetails: additionalDetails || '',
  shareWithProviders: shareWithProviders || false,
  status: 'new'
});

await serviceRequest.save();
    console.log('✅ Service request saved to database:', serviceRequest._id);
    
    // Prepare form data for emails
    const formData = {
      serviceName,
      name,
      email,
      answers,
      additionalDetails: additionalDetails || '',
      shareWithProviders: shareWithProviders || false
    };
    
    // Send emails (non-blocking)
    sendServiceRequestEmails(formData)
      .then(() => {
        console.log('✅ Service request emails sent successfully');
      })
      .catch((error) => {
        console.error('❌ Error sending service request emails:', error.message);
      });
    
    // Respond immediately
    console.log('✅ Sending success response to frontend');
    res.status(201).json({
      success: true,
      message: 'Service request submitted successfully'
    });
    
  } catch (error) {
    console.error('❌ Error submitting service request:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};