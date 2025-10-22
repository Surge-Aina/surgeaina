const nodemailer = require('nodemailer');

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => Math.floor(Math.random() * 2000) + 2000; // 2-4 seconds

// Company Contact Form Emails (Visitor, Admin)
async function sendCompanyContactEmails(formData) {
  try {
    console.log('📧 Starting company contact email sequence...');
    
    // 1. Send confirmation email to VISITOR
    const visitorHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #334155; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #334155; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Message Received!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${formData.fullName}</strong>,</p>
            <p>Thank you for contacting <strong>Surge Aina</strong>! We have received your enquiry and will get back to you soon.</p>
            
            <div class="info-box">
              <h3>Your Submission:</h3>
              <p><strong>Name:</strong> ${formData.fullName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              ${formData.mobileNumber ? `<p><strong>Phone:</strong> ${formData.mobileNumber}</p>` : ''}
              <p><strong>Message:</strong><br>${formData.message}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p><strong>Expected Response Time:</strong> Within 24-48 hours</p>
            <p>Our team is available 9AM - 7PM, Sunday to Friday.</p>
            <p>If urgent, call us at <strong>+1 5306365748</strong></p>
            
            <div class="footer">
              <p>Best regards,<br>The Surge Aina Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: `"Surge Aina" <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject: 'Enquiry Received - Surge Aina',
      html: visitorHtmlContent
    });
    
    console.log('✅ Visitor confirmation email sent');
    
    // Wait 2-4 seconds
    await delay(randomDelay());
    
    // 2. Send notification to ADMIN
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background: #FEF3C7; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #F59E0B; }
          .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #DC2626; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          td { padding: 8px; border-bottom: 1px solid #ddd; }
          td:first-child { font-weight: bold; width: 150px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Company Enquiry</h1>
          </div>
          <div class="content">
            <p><strong>A new enquiry has been submitted from the Surge Aina contact form.</strong></p>
            
            <div class="highlight">
              <h3>📞 Contact Details</h3>
              <table>
                <tr><td>Name:</td><td>${formData.fullName}</td></tr>
                <tr><td>Email:</td><td><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
                ${formData.mobileNumber ? `<tr><td>Phone:</td><td>${formData.mobileNumber}</td></tr>` : ''}
              </table>
            </div>
            
            <div class="info-box">
              <h3>💬 Message:</h3>
              <p>${formData.message}</p>
            </div>
            
            <div class="info-box">
              <h4>Submission Details:</h4>
              <table>
                <tr><td>Timestamp:</td><td>${new Date().toLocaleString()}</td></tr>
                <tr><td>Source:</td><td>Surge Aina Contact Form</td></tr>
              </table>
            </div>
            
            <p style="color: #DC2626; font-weight: bold;">⏰ Respond within 24-48 hours for best results!</p>
            <p><strong>Quick Action:</strong> Reply to this email to respond directly to ${formData.fullName}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: `"Surge Aina System" <${process.env.SMTP_USER}>`,
      replyTo: formData.email,
      to: process.env.ADMIN_EMAIL,
      subject: `🔔 New Enquiry from ${formData.fullName}`,
      html: adminHtmlContent
    });
    
    console.log('✅ Admin notification email sent');
    console.log('🎉 All company contact emails sent successfully!');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Company contact email failed:', error);
    throw error;
  }
}
// Service Request Emails (Visitor, Admin)
async function sendServiceRequestEmails(formData) {
  try {
    console.log('📧 Starting service request email sequence...');
    
    // Format the answers for email display
    const formatAnswers = (answers) => {
      let formatted = '';
      for (const [key, value] of Object.entries(answers)) {
        if (key !== 'additionalDetails' && key !== 'shareWithProviders' && key !== 'contact_name' && key !== 'contact_email') {
          const displayKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          const displayValue = Array.isArray(value) ? value.join(', ') : value;
          formatted += `<tr><td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">${displayKey}:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${displayValue}</td></tr>`;
        }
      }
      return formatted;
    };
    
    // 1. Send confirmation email to VISITOR
    const visitorHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #334155; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #334155; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Service Request Received!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${formData.name}</strong>,</p>
            <p>Thank you for your interest in our <strong>${formData.serviceName}</strong> service! We have received your request and will review it shortly.</p>
            
            <div class="info-box">
              <h3>Your Request Summary:</h3>
              <table>
                ${formatAnswers(formData.answers)}
              </table>
              ${formData.additionalDetails ? `<p><strong>Additional Details:</strong><br>${formData.additionalDetails}</p>` : ''}
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p><strong>What's Next?</strong></p>
            <ul>
              <li>Our team will review your requirements</li>
              <li>We'll reach out within 24-48 hours</li>
              <li>We'll discuss pricing and timeline</li>
            </ul>
            
            <p>If you have any immediate questions, call us at <strong>+1 5306365748</strong></p>
            
            <div class="footer">
              <p>Best regards,<br>The Surge Aina Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: `"Surge Aina" <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject: `Service Request Received - ${formData.serviceName}`,
      html: visitorHtmlContent
    });
    
    console.log('✅ Visitor confirmation email sent');
    
    // Wait 2-4 seconds
    await delay(randomDelay());
    
    // 2. Send notification to ADMIN
    const adminHtmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #DC2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .highlight { background: #FEF3C7; padding: 15px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #F59E0B; }
          .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #DC2626; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          td { padding: 8px; border-bottom: 1px solid #ddd; }
          td:first-child { font-weight: bold; width: 150px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Service Request</h1>
          </div>
          <div class="content">
            <p><strong>A new service request has been submitted!</strong></p>
            
            <div class="highlight">
              <h3>📋 Service: ${formData.serviceName}</h3>
              <table>
                <tr><td>Name:</td><td>${formData.name}</td></tr>
                <tr><td>Email:</td><td><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
              </table>
            </div>
            
            <div class="info-box">
              <h3>💬 Request Details:</h3>
              <table>
                ${formatAnswers(formData.answers)}
              </table>
            </div>
            
            ${formData.additionalDetails ? `
            <div class="info-box">
              <h3>📝 Additional Details:</h3>
              <p>${formData.additionalDetails}</p>
            </div>
            ` : ''}
            
            <div class="info-box">
              <h4>Submission Info:</h4>
              <table>
                <tr><td>Timestamp:</td><td>${new Date().toLocaleString()}</td></tr>
                <tr><td>Share with Providers:</td><td>${formData.shareWithProviders ? 'Yes' : 'No'}</td></tr>
              </table>
            </div>
            
            <p style="color: #DC2626; font-weight: bold;">⏰ Follow up within 24-48 hours!</p>
            <p><strong>Quick Action:</strong> Reply to this email to respond directly to ${formData.name}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await transporter.sendMail({
      from: `"Surge Aina System" <${process.env.SMTP_USER}>`,
      replyTo: formData.email,
      to: process.env.ADMIN_EMAIL,
      subject: `🎯 New ${formData.serviceName} Request from ${formData.name}`,
      html: adminHtmlContent
    });
    
    console.log('✅ Admin notification email sent');
    console.log('🎉 All service request emails sent successfully!');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Service request email failed:', error);
    throw error;
  }
}
module.exports = { 
  sendCompanyContactEmails,sendServiceRequestEmails
};