import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const RECIPIENT = "podcast@aztoastmasters.org";

const SUBJECT_LABELS: Record<string, string> = {
  general: "General Inquiry",
  guest: "Guest Request",
  sponsorship: "Sponsorship Inquiry",
  feedback: "Feedback",
};

export async function POST(request: Request) {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json(
        { error: "Contact form is not configured yet." },
        { status: 503 }
      );
    }

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const subjectLabel = SUBJECT_LABELS[subject] || "General Inquiry";

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    await transporter.sendMail({
      from: `Speak Arizona <${gmailUser}>`,
      to: RECIPIENT,
      replyTo: `${name} <${email}>`,
      subject: `[Speak Arizona] ${subjectLabel} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subjectLabel}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
