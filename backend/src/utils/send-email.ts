import nodemailer from "nodemailer";

const emailHtml = (token: string) => `
  <div>
    <h1>Reset Password</h1>
    // colocar o link correto
    <p>Click <a href="http://localhost:5173/reset-password?token=${token}">here</a> to reset your password</p>
  </div>
`;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // user: process.env.EMAIL,
    // pass: process.env.PASSWORD,
    user: "seixeiro.dev@gmail.com",
    pass: "didis1212.",
  },
});

const emailOptions = (email: string, token: string) => ({
  from: "seixeiro.dev@gmail.com",
  to: `${email}`,
  subject: "Email Subject",
  html: emailHtml(token),
});

export const sendEmail = async (email: string, token: string): Promise<boolean> => {
  try {
    await transporter.sendMail(emailOptions(email, token));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
