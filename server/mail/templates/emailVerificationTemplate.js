const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #eef2f7;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.5;
				color: #333333;
				margin: 0;
				padding: 28px 12px;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 32px 26px;
				text-align: center;
				background-color: #ffffff;
				border-radius: 14px;
				border: 1px solid #dbe2ea;
				border-top: 5px solid #FFD60A;
				box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 22px;
				font-weight: bold;
				color: #0f172a;
				background-color: #f8fafc;
				border-radius: 8px;
				margin-bottom: 20px;
				padding: 14px 16px;
				border-bottom: 2px solid #e2e8f0;
			}
	
			.body {
				font-size: 16px;
				color: #334155;
				margin-bottom: 22px;
			}
	
			.body p {
				margin: 12px 0;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #64748b;
				background-color: #f8fafc;
				border-radius: 8px;
				margin-top: 24px;
				padding: 16px 18px;
				border-top: 1px solid #e2e8f0;
			}
	
			.support a {
				color: #1d4ed8;
				font-weight: bold;
				text-decoration: underline;
			}
	
			.highlight {
				font-weight: bold;
				font-size: 30px;
				letter-spacing: 8px;
				color: #0f172a;
				background: linear-gradient(180deg, #fef9c3 0%, #fef08a 100%);
				border: 2px solid #eab308;
				border-radius: 10px;
				padding: 14px 24px;
				margin: 20px auto;
				display: inline-block;
				box-shadow: 0 4px 10px rgba(234, 179, 8, 0.2);
			}
		</style>
	
	</head>
	
	<body style="background-color: #eef2f7; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333333; margin: 0; padding: 28px 12px;">
		<div class="container" style="max-width: 600px; margin: 0 auto; padding: 32px 26px; text-align: center; background-color: #ffffff; border-radius: 14px; border: 1px solid #dbe2ea; border-top: 5px solid #FFD60A; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);">
			<div class="message" style="font-size: 22px; font-weight: bold; color: #0f172a; background-color: #f8fafc; border-radius: 8px; margin-bottom: 20px; padding: 14px 16px; border-bottom: 2px solid #e2e8f0;">OTP Verification Email</div>
			<div class="body" style="font-size: 16px; color: #334155; margin-bottom: 22px;">
				<p style="margin: 12px 0;">Dear User,</p>
				<p style="margin: 12px 0;">Thank you for registering with StudyTech. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight" style="font-weight: bold; font-size: 30px; letter-spacing: 8px; color: #0f172a; background-color: #fef08a; border: 2px solid #eab308; border-radius: 10px; padding: 14px 24px; margin: 20px auto; display: inline-block;">${otp}</h2>
				<p style="margin: 12px 0;">This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support" style="font-size: 14px; color: #64748b; background-color: #f8fafc; border-radius: 8px; margin-top: 24px; padding: 16px 18px; border-top: 1px solid #e2e8f0;">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:info@studytech.com" style="color: #1d4ed8; font-weight: bold; text-decoration: underline;">info@studynotion.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`
};
module.exports = otpTemplate;