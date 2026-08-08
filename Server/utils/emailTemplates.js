export const accountCreatedTemplate = ({
  name,
  username,
  password,
  role,
  loginUrl,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Account Created</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
    
    <h2 style="color: #1e40af;">
      Examination System Account Created
    </h2>

    <p>Dear <strong>${name}</strong>,</p>

    <p>
      Your account has been successfully created in the Examination Management System.
    </p>

    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Role</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${role}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Username</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${username}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Password</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
      </tr>
    </table>

    <p>
      Please log in using the credentials above and change your password after your first login.
    </p>

    <div style="margin: 30px 0;">
      <a
        href="${loginUrl}"
        style="
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          display: inline-block;
        "
      >
        Login to Portal
      </a>
    </div>

    <p>
      If you did not expect this account, please contact the Examination Cell immediately.
    </p>

    <hr />

    <p style="font-size: 12px; color: #666;">
      Examination Management System<br/>
      ABES Engineering College
    </p>

  </div>
</body>
</html>
`;

export const accountPasswordResetTemplate = ({
  name,
  resetLink,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Account Created</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
    
    <h2>Password Reset</h2>
        <p>Hello ${name},</p>
        <p>You requested to reset your password.</p>
        <p>Click the link below to continue:</p>
        <a href="${resetLink}">
          Reset Password
        </a>
        <br/><br/>
        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>

  </div>
</body>
</html>
`;