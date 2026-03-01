import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, interest, reason } = await req.json();

        if (!name || !email || !phone || !interest || !reason) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: email,
            to: process.env.EMAIL_RECEIVER,
            subject: `Volunteer Application: ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Area of Interest:</strong> ${interest}</p>
        <p><strong>Reason to Volunteer:</strong> ${reason}</p>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error sending volunteer email:", err);
        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}