import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "gajvakratech13@gmail.com";

    // If SMTP configurations are missing, return a descriptive error so the client can fall back to mailto
    if (!host || !port || !user || !pass) {
      console.warn("SMTP settings are not configured. Returning fallback trigger.");
      return NextResponse.json(
        { success: false, error: "SMTP credentials are not configured in environment variables." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: port === "465", // true for 465, false for other ports (like 587)
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `Project Inquiry: ${service} from ${name}`,
      text: `Hi GajvakraTech Team,\n\nYou have received a new project inquiry from your website.\n\nProject Details:\n- Name: ${name}\n- Email: ${email}\n- Target Service: ${service}\n- Description:\n${message}\n\nRegards,\n${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Project Telemetry Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0; color: #4a5568;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; color: #4a5568;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Service:</td>
              <td style="padding: 8px 0; color: #2563eb; font-weight: 600;">${service}</td>
            </tr>
          </table>
          <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
            <h4 style="margin: 0 0 10px 0; color: #2d3748;">Description:</h4>
            <p style="margin: 0; color: #4a5568; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #a0aec0; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            Sent securely via GajvakraTech Website API.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("SMTP error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
