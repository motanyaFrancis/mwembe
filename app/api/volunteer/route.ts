import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function createTransporter() {
    const emailUser = process.env.EMAIL_USER as string;
    const emailPass = process.env.EMAIL_PASS as string;

    if (!emailUser || !emailPass) {
        throw new Error("Email credentials not configured.");
    }

    const domain = emailUser.split("@")[1];

    // Gmail
    if (domain.includes("gmail.com")) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass, // Gmail App Password required
            },
        });
    }

    // Zoho
    if (domain.includes("zoho")) {
        return nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass, // Zoho App Password recommended
            },
        });
    }

    // Outlook / Microsoft 365
    if (
        domain.includes("outlook.com") ||
        domain.includes("hotmail.com") ||
        domain.includes("office365.com")
    ) {
        return nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });
    }

    // Default fallback (custom domain like themwembe.ke using Zoho MX etc.)
    return nodemailer.createTransport({
        host: "smtp.zoho.com", // change if using another provider
        port: 465,
        secure: true,
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, interest, reason } = await req.json();

        if (!name || !email || !phone || !interest || !reason) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        const transporter = createTransporter();

        await transporter.sendMail({
            from: `"Volunteer Form" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.EMAIL_RECEIVER,
            subject: `Volunteer Application: ${name}`,
            html: `
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Area of Interest:</strong> ${interest}</p>
                    <p><strong>Reason:</strong> ${reason}</p>
                `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return NextResponse.json(
            { error: "Failed to send email." },
            { status: 500 }
        );
    }
}