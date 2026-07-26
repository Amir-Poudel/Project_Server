import { ENV_CONFIG } from "../config/env.config";

//? format date
const formatDate = (date: NativeDate) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  return formattedDate;
};

//* generate account created successful email html
export const generateAccountCreatedHtml = ({
  full_name,
  email,
  createdAt,
}: {
  full_name: string;
  email: string;
  createdAt: NativeDate;
}) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Account Created</title>
</head>
<body style="margin:0;padding:0;background:#fff5f5;font-family:Arial,Helvetica,sans-serif;color:#333;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 16px;background:#fff5f5;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #f4c7c3;box-shadow:0 8px 24px rgba(255,99,71,.12);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#ff6347,#e74c3c);padding:40px 24px;">
              <div style="width:72px;height:72px;border-radius:50%;background:#ffffff;line-height:72px;font-size:36px;font-weight:bold;color:#ff6347;">
                ✓
              </div>

              <h1 style="margin:20px 0 8px;color:#ffffff;font-size:30px;font-weight:700;">
                Account Created!
              </h1>

              <p style="margin:0;color:#ffeceb;font-size:16px;">
                Welcome! Your account has been successfully created.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 32px;">
              <h2 style="margin:0 0 16px;font-size:24px;color:#e74c3c;">
                Hello ${full_name},
              </h2>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#555;">
                Thank you for joining us! Your account is now active and ready
                to use.
              </p>

              <table width="100%" cellspacing="0" cellpadding="0" style="background:#fff0ee;border-radius:10px;padding:20px;">
                <tr>
                  <td style="padding:8px 0;font-size:15px;">
                    <strong>Name:</strong> ${full_name}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:15px;">
                    <strong>Email:</strong> ${email}
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:15px;">
                    <strong>Created:</strong> ${formatDate(createdAt)}
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin:36px 0;">
                <a href="${ENV_CONFIG.FRONT_END_URL}/auth/login"
                  style="display:inline-block;background:#ff6347;color:#ffffff;text-decoration:none;padding:14px 34px;border-radius:8px;font-size:16px;font-weight:600;">
                  LogIn
                </a>
              </div>

              <p style="margin:0;font-size:15px;line-height:1.7;color:#666;">
                If you did not create this account, please contact our support
                team immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px;background:#fff5f5;border-top:1px solid #f4c7c3;">
              <p style="margin:0;font-size:13px;color:#999;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </p>

              <p style="margin:8px 0 0;font-size:12px;color:#bbb;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return html;
};

//* generate login successful email html
export const generateLoginSuccessHtml = ({
  full_name,
  email,
  loginAt,
  userAgent,
}: {
  full_name: string;
  email: string;
  loginAt: NativeDate;
  userAgent: string;
}) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Login Successful</title>
</head>

<body style="margin:0;padding:0;background:#fff5f5;font-family:Arial,Helvetica,sans-serif;color:#333;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:40px 16px;background:#fff5f5;">
<tr>
<td align="center">

<table role="presentation" width="600" cellspacing="0" cellpadding="0"
style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #f4c7c3;box-shadow:0 8px 24px rgba(255,99,71,.12);">

  <!-- Header -->
  <tr>
    <td align="center" style="background:linear-gradient(135deg,#ff6347,#e74c3c);padding:40px 24px;">
      <div style="width:72px;height:72px;border-radius:50%;background:#ffffff;line-height:72px;font-size:34px;font-weight:bold;color:#ff6347;">
        🔐
      </div>

      <h1 style="margin:20px 0 8px;font-size:30px;color:#ffffff;">
        Login Successful
      </h1>

      <p style="margin:0;color:#ffeceb;font-size:16px;">
        Your account was accessed successfully.
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px 32px;">

      <h2 style="margin:0 0 16px;font-size:24px;color:#e74c3c;">
        Hello ${full_name},
      </h2>

      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#555;">
        We detected a successful login to your account. Here are the details:
      </p>

      <table width="100%" cellspacing="0" cellpadding="0"
      style="background:#fff0ee;border-radius:10px;padding:20px;">

        <tr>
          <td style="padding:8px 0;font-size:15px;">
            <strong>Name:</strong> ${full_name}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;font-size:15px;">
            <strong>Email:</strong> ${email}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;font-size:15px;">
            <strong>Login Time:</strong> ${formatDate(loginAt)}
          </td>
        </tr>

        <tr>
          <td style="padding:8px 0;font-size:15px;word-break:break-word;">
            <strong>Device / Browser:</strong><br />
            ${userAgent}
          </td>
        </tr>

      </table>

      <div style="margin-top:32px;padding:18px;background:#fff8f7;border-left:4px solid #ff6347;border-radius:8px;">
        <p style="margin:0;font-size:15px;line-height:1.7;color:#666;">
          <strong>Didn't log in?</strong><br />
          If this wasn't you, immediately change your password and contact our
          support team to help secure your account.
        </p>
      </div>

      <div style="text-align:center;margin:36px 0;">
                <a href="${ENV_CONFIG.FRONT_END_URL}/auth/login"
                  style="display:inline-block;background:#ff6347;color:#ffffff;text-decoration:none;padding:14px 34px;border-radius:8px;font-size:16px;font-weight:600;">
                  Change Password
                </a>
              </div>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="padding:24px;background:#fff5f5;border-top:1px solid #f4c7c3;">
      <p style="margin:0;font-size:13px;color:#999;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>

      <p style="margin:8px 0 0;font-size:12px;color:#bbb;">
        This is an automated security notification. Please do not reply.
      </p>
    </td>
  </tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`;

  return html;
};
