export const EMAIL = 'sehaznagpal@gmail.com';
export const MAILTO_URL = `mailto:${EMAIL}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';

const CONTACT_SUBJECT = 'Re-directed from your portfolio';
const CONTACT_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
/* Gmail's web compose URL rather than mailto:, so the pre-filled draft
   always opens in Gmail instead of whatever native mail app is registered. */
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(CONTACT_SUBJECT)}&body=${encodeURIComponent(CONTACT_BODY)}`;
export const WHATSAPP_URL = `https://wa.me/919971159640?text=${encodeURIComponent(CONTACT_BODY)}`;

const CV_FILE_ID = '1Z8gec-K0UeJ7NIbiG6K-sQZn48nakXn0';
export const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;
