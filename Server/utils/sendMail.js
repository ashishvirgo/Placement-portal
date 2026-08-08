import transporter from "../config/mail.js";

const sendMail = async ({
  to,
  subject,
  html,
  text = "",
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

export default sendMail;