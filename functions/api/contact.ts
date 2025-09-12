/**
 * Environment variables required for the contact form handler.
 */
interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
}

/**
 * Structure of the expected request body for the contact form.
 */
interface RequestBody {
  email: string;
  subject: string;
  message: string;
  token: string;
}

/**
 * Predefined response messages for different scenarios.
 */
const responseMessages = {
  success: 'Thank you for your message. We will get back to you soon.',
  emailFailed: 'Failed to send email. Please try again later.',
  invalidRequest: 'Invalid request. Please check your input.',
  invalidToken: 'Invalid CAPTCHA. Please try again.',
} as const;

/**
 * Configuration for response statuses and messages.
 */
const responseConfigs = {
  success: { message: responseMessages.success, status: 200 },
  emailFailed: { message: responseMessages.emailFailed, status: 500 },
  invalidRequest: { message: responseMessages.invalidRequest, status: 400 },
  invalidToken: { message: responseMessages.invalidToken, status: 400 },
} as const;

/**
 * Standard headers for JSON responses.
 */
const headers = {
  'Content-Type': 'application/json',
};

/**
 * Creates a standardized JSON response based on the provided key.
 * @param key - The key corresponding to the response configuration.
 * @returns A Response object with the appropriate message and status.
 */
function createJsonResponse(key: keyof typeof responseConfigs): Response {
  const config = responseConfigs[key];
  return new Response(JSON.stringify({ message: config.message }), {
    status: config.status,
    headers,
  });
}

/**
 * Validates and sanitizes the input data from the request body.
 * @param data - The raw request body data.
 * @returns An object containing sanitized data or null if validation fails.
 */
function validateAndSanitizeInput(data: unknown): RequestBody | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const obj = data as Record<string, unknown>;
  const { email, subject, message, token } = obj;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return null;
  }

  // Validate subject and message
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return null;
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return null;
  }
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return null;
  }

  // Sanitize inputs
  return {
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;'), // Basic HTML escaping
    token: token.trim(),
  };
}

/**
 * Generates a clean and simple HTML template for the contact email.
 * @param email - The sender's email address.
 * @param subject - The subject of the message.
 * @param message - The sanitized message content.
 * @returns A string containing the HTML email body.
 */
function generateEmailHtml(email: string, subject: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #222;
          margin: 0;
          padding: 30px;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 600px;
          margin: auto;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          padding: 24px;
          background-color: #ffffff;
        }
        h2 {
          margin: 0 0 20px;
          font-size: 20px;
          font-weight: 600;
          color: #111;
        }
        p {
          margin: 10px 0;
          line-height: 1.5;
        }
        .label {
          font-weight: 600;
          color: #444;
        }
        .footer {
          margin-top: 25px;
          font-size: 12px;
          color: #888;
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Contact Form Submission</h2>
        <p><span class="label">From:</span> ${email}</p>
        <p><span class="label">Subject:</span> ${subject}</p>
        <p><span class="label">Message:</span></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <div class="footer">
          This message was sent from your portfolio contact form.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Handles POST requests for the contact form.
 * Validates input, verifies CAPTCHA, and sends an email via Resend.
 * @param context - The request context containing the request and environment variables.
 * @returns A Response object indicating the result of the operation.
 */
export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  try {
    // Parse and validate request body
    const rawData = await request.json();
    const sanitizedData = validateAndSanitizeInput(rawData);

    if (!sanitizedData) {
      return createJsonResponse('invalidRequest');
    }

    const { email, subject, message, token } = sanitizedData;

    // Verify Turnstile token
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: token,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return createJsonResponse('invalidToken');
    }

    // Generate improved HTML for the email
    const emailHtml = generateEmailHtml(email, subject, message);

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <contact@msaeedsaeedi.com>',
        to: 'contact@msaeedsaeedi.com',
        reply_to: email,
        subject: `Contact Form: ${subject}`,
        html: emailHtml,
      }),
    });

    if (res.ok) {
      return createJsonResponse('success');
    } else {
      return createJsonResponse('emailFailed');
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return createJsonResponse('invalidRequest');
  }
}
