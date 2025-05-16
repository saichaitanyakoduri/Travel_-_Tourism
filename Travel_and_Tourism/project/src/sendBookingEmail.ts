import emailjs from '@emailjs/browser';

export const sendBookingEmail = async ({
  toEmail,
  subject,
  message,
}: {
  toEmail: string;
  subject: string;
  message: string;
}) => {
  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    const templateParams = {
      to_email: toEmail,
      subject,
      message,
    };

    await emailjs.send(serviceID, templateID, templateParams, userID);
    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
