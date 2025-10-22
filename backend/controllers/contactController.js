const CompanyContact = require('../models/CompanyContact');
const { sendCompanyContactEmails } = require('../services/emailService');

exports.submitContact = async (req, res) => {
  try {
    console.log('🔵 Company contact form submitted');
    console.log('📥 Request body:', req.body);
    
    const { fullName, email, mobileNumber, message } = req.body;
    
    // Validation
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // Save contact to database
    const contact = await CompanyContact.create({
      fullName,
      email,
      mobileNumber: mobileNumber || '',
      message,
      status: 'new'
    });
    
    console.log('✅ Contact saved to database:', contact._id);
    
    // Prepare form data for emails
    const formData = {
      fullName,
      email,
      mobileNumber: mobileNumber || '',
      message
    };
    
    // Send emails (non-blocking)
    sendCompanyContactEmails(formData)
      .then(() => {
        console.log('✅ Contact emails sent successfully');
      })
      .catch((error) => {
        console.error('❌ Error sending contact emails:', error.message);
      });
    
    // Respond immediately
    console.log('✅ Sending success response to frontend');
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully'
    });
    
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};