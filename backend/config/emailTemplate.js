const generateWelcomeEmail = (name, email) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to StyleMart</title>
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 20px;">
    <div style="max-width: 580px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
        <div style="background: white; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <span style="font-size: 32px; color: #667eea;">🛍️</span>
        </div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">Welcome to StyleMart!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your fashion destination awaits</p>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 30px;">
          Hello <strong style="color: #334155;">${name}</strong>,<br><br>
          We're absolutely thrilled to welcome you to StyleMart! Get ready to discover amazing products and connect with sellers worldwide. 🌟
        </p>

        <div style="background: #f8fafc; border-radius: 16px; padding: 25px; margin: 30px 0;">
          <h3 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Here's what you can do:</h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #10b981; color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">✓</span>
              <span style="color: #475569;">Browse thousands of unique products</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">♥</span>
              <span style="color: #475569;">Like and save your favorite items</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">📸</span>
              <span style="color: #475569;">Upload and sell your own products</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="background: #8b5cf6; color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px;">🔒</span>
              <span style="color: #475569;">Secure account with: <strong>${email}</strong></span>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin: 35px 0;">
          <a href="https://stylemart.com/dashboard" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
            Start Shopping Now
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 14px; margin: 0 0 10px;">
          © ${new Date().getFullYear()} StyleMart. All rights reserved.<br />
          Fashion District, Style City, 100001
        </p>
        <p style="margin: 0;">
          <a href="https://stylemart.com/unsubscribe" style="color: #cbd5e1; text-decoration: none; font-size: 12px;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const generateLoginEmail = (name, email, ipAddress = 'Unknown') => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Alert - StyleMart</title>
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f1f5f9; margin: 0; padding: 20px;">
    <div style="max-width: 520px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%); padding: 35px 30px; text-align: center;">
        <div style="background: white; width: 70px; height: 70px; border-radius: 18px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
          <span style="font-size: 28px;">🔐</span>
        </div>
        <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Login Detected</h2>
      </div>

      <!-- Content -->
      <div style="padding: 35px 30px;">
        <p style="font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 25px;">
          Hello <strong style="color: #334155;">${name}</strong>,<br><br>
          We noticed a successful login to your StyleMart account:
        </p>

        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; margin: 25px 0;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="color: #dc2626;">📧</span>
            <strong style="color: #334155;">Email:</strong>
            <span style="color: #64748b;">${email}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="color: #dc2626;">🌐</span>
            <strong style="color: #334155;">IP Address:</strong>
            <span style="color: #64748b;">${ipAddress}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="color: #dc2626;">🕒</span>
            <strong style="color: #334155;">Time:</strong>
            <span style="color: #64748b;">${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; margin: 25px 0;">
          <h4 style="color: #92400e; margin: 0 0 10px 0; font-size: 14px;">⚠️ Security Notice</h4>
          <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
            If this wasn't you, please secure your account immediately by changing your password.
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://stylemart.com/security" style="background: #ef4444; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
            Review Account Security
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} StyleMart. Keeping your account secure.
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const generateOtpVerificationEmail = (name, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account - StyleMart</title>
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%); margin: 0; padding: 20px;">
    <div style="max-width: 480px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
        <div style="background: white; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <span style="font-size: 32px; color: #10b981;">✓</span>
        </div>
        <h2 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Verify Your Email</h2>
      </div>

      <!-- Content -->
      <div style="padding: 40px 30px;">
        <p style="font-size: 16px; line-height: 1.6; color: #64748b; text-align: center; margin-bottom: 30px;">
          Hello <strong style="color: #334155;">${name}</strong>,<br>
          Enter the following code to verify your email and start your StyleMart journey!
        </p>

        <!-- OTP Display -->
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 25px; border-radius: 16px; text-align: center; margin: 30px 0;">
          <div style="font-size: 42px; font-weight: 700; letter-spacing: 8px; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
            ${otp}
          </div>
          <div style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
            Verification Code • Valid for 24 hours
          </div>
        </div>

        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin: 25px 0;">
          <h4 style="color: #065f46; margin: 0 0 8px 0; font-size: 14px;">🔒 Security Tip</h4>
          <p style="color: #065f46; font-size: 14px; margin: 0; line-height: 1.5;">
            Never share this code with anyone. Our team will never ask for your verification code.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} StyleMart. Your privacy and security are our priority.
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const generateResetPasswordOtpEmail = (name, email, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password - StyleMart</title>
  </head>
  <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); margin: 0; padding: 20px;">
    <div style="max-width: 500px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 35px 30px; text-align: center;">
        <div style="background: white; width: 70px; height: 70px; border-radius: 18px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
          <span style="font-size: 28px; color: #f59e0b;">🔄</span>
        </div>
        <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Reset Password</h2>
      </div>

      <!-- Content -->
      <div style="padding: 35px 30px;">
        <p style="font-size: 16px; line-height: 1.6; color: #64748b; margin-bottom: 25px;">
          Hello <strong style="color: #334155;">${name}</strong>,<br><br>
          We received a password reset request for your StyleMart account:
        </p>

        <div style="background: #fffbeb; border: 1px solid #fed7aa; border-radius: 12px; padding: 18px; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #d97706;">📧</span>
            <span style="color: #334155; font-weight: 500;">${email}</span>
          </div>
        </div>

        <!-- OTP Display -->
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 22px; border-radius: 14px; text-align: center; margin: 25px 0;">
          <div style="font-size: 36px; font-weight: 700; letter-spacing: 6px; text-shadow: 0 2px 8px rgba(0,0,0,0.2);">
            ${otp}
          </div>
          <div style="font-size: 13px; opacity: 0.9; margin-top: 8px;">
            Expires in 15 minutes
          </div>
        </div>

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 18px; margin: 25px 0;">
          <h4 style="color: #92400e; margin: 0 0 8px 0; font-size: 14px;">⚠️ Important</h4>
          <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
            If you didn't request this reset, please ignore this email. Your account remains secure.
          </p>
        </div>

        <div style="text-align: center; margin-top: 25px;">
          <a href="https://stylemart.com/reset-password" style="background: #f59e0b; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
            Reset Password
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          © ${new Date().getFullYear()} StyleMart. Helping you keep your account secure.
        </p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export { generateWelcomeEmail, generateLoginEmail, generateOtpVerificationEmail, generateResetPasswordOtpEmail };