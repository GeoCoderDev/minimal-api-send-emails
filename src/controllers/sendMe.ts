import { Resend } from "resend";

export interface EmailData {
  message: string;
  fromEmail: string;
  nameOrigin: string;
}

const RESEND_API_KEY =
  process.env.RESENT_API_KEY || "re_Jmt7LiYM_3wumjHArZFA5QMQcPUhU7va1";

const resend = new Resend(RESEND_API_KEY!);

export async function sendEmail({ fromEmail, message, nameOrigin }: EmailData) {
  try {
    if (fromEmail === undefined)
      throw new Error("Missing 'fromEmail' parameter");
    if (message === undefined) throw new Error("Missing 'message' parameter");
    if (nameOrigin === undefined)
      throw new Error("Missing 'nameOrigin' parameter");

    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["juanchavezsaldana1@gmail.com"],
      subject: `Message from ${nameOrigin}`,
      text: message,
      html: `
      
        <p>${message}</p>
        <br />
        <br />
        <b>from email: ${fromEmail}</b>
      
      `,
    });
  } catch (e) {
    throw e;
  }
}

// cc: [],
// to: [emailData.toEmail],
// bcc: [],
// from: "onboarding@resend.dev",
// html: '<p>Congrats on sending your <strong>first email</strong>!</p><hr /><p style="color:#898989;font-size:12px;">2261 Market Street #5039 - San Francisco, CA 94114</p>',
// tags: [],
// text: emailData.message,
// subject: `Message from ${emailData.fromEmail}`,
