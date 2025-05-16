import emailjs from '@emailjs/browser';

export const sendBookingEmail = async ({
  toEmail,
  name,
  service,
  details,
  price,
}: {
  toEmail: string;
  name: string;
  service: string;
  details?: string;
  price?: number;
}) => {
  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    const templateParams = {
      to_email: toEmail,
      subject: `${service} Booking Confirmation`,
      message:
        `Dear ${name}, your booking for ${service} is confirmed.` +
        (details ? ` Details: ${details}.` : '') +
        (price ? ` Total price: ₹${price}.` : '') +
        ' Thank you for booking with us!'
    };

    await emailjs.send(serviceID, templateID, templateParams, userID);
    return true;
  } catch (error) {
    console.error('EmailJS error:', error);
    return false;
  }
};
