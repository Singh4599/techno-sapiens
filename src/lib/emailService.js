// Email Service - Simple implementation
// For production, use Resend, SendGrid, or Supabase Edge Functions

export const emailService = {
  // Send registration confirmation
  sendRegistrationConfirmation: async ({ to, userName, eventName, eventDate, teamName }) => {
    try {
      console.log('📧 Sending registration confirmation email...');
      console.log({
        to,
        subject: `Registration Confirmed - ${eventName}`,
        userName,
        eventName,
        eventDate,
        teamName,
      });

      // In production, replace with actual email service
      // Example with Resend:
      // const response = await fetch('https://api.resend.com/emails', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     from: 'Techno Sapiens <noreply@technosapiens.com>',
      //     to: [to],
      //     subject: `Registration Confirmed - ${eventName}`,
      //     html: getRegistrationEmailTemplate({ userName, eventName, eventDate, teamName }),
      //   }),
      // });

      // For now, just log
      return {
        success: true,
        message: 'Email would be sent in production',
      };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  },

  // Send event reminder
  sendEventReminder: async ({ to, userName, eventName, eventDate, venue }) => {
    try {
      console.log('📧 Sending event reminder email...');
      console.log({
        to,
        subject: `Reminder: ${eventName} Tomorrow!`,
        userName,
        eventName,
        eventDate,
        venue,
      });

      return {
        success: true,
        message: 'Reminder email would be sent in production',
      };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  },

  // Send certificate notification
  sendCertificateReady: async ({ to, userName, eventName, certificateUrl }) => {
    try {
      console.log('📧 Sending certificate ready email...');
      console.log({
        to,
        subject: `Your Certificate is Ready - ${eventName}`,
        userName,
        eventName,
        certificateUrl,
      });

      return {
        success: true,
        message: 'Certificate email would be sent in production',
      };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  },

  // Send admin announcement
  sendAnnouncement: async ({ to, subject, message }) => {
    try {
      console.log('📧 Sending announcement email...');
      console.log({
        to,
        subject,
        message,
      });

      return {
        success: true,
        message: 'Announcement email would be sent in production',
      };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error: error.message };
    }
  },
};

// Email Templates
const getRegistrationEmailTemplate = ({ userName, eventName, eventDate, teamName }) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00E5FF 0%, #FF00E5 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #00E5FF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Registration Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Your registration for <strong>${eventName}</strong> has been confirmed!</p>
          ${teamName ? `<p><strong>Team Name:</strong> ${teamName}</p>` : ''}
          <p><strong>Event Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
          <p>We're excited to see you there! Check your dashboard for more details.</p>
          <a href="http://localhost:5173/dashboard" class="button">View Dashboard</a>
          <p>If you have any questions, feel free to contact us.</p>
          <p>Best regards,<br>Techno Sapiens Team</p>
        </div>
        <div class="footer">
          <p>© 2025 Techno Sapiens. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default emailService;
