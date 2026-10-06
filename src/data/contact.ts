export const EMAIL = 'sehaznagpal@gmail.com';
export const MAILTO_URL = `mailto:${EMAIL}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/sehaznagpal';

const CV_FILE_ID = '1Z8gec-K0UeJ7NIbiG6K-sQZn48nakXn0';
export const CV_URL = `https://drive.google.com/uc?export=download&id=${CV_FILE_ID}`;

const MAIL_SUBJECT = 'Re-directed from your portfolio';
const MAIL_BODY =
  "Hi Sehaz,\n\nI came across your portfolio and wanted to reach out, we'd love to connect.\n\nBest,\n";
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(MAIL_SUBJECT)}&body=${encodeURIComponent(MAIL_BODY)}`;
