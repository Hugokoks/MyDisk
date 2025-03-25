import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "configEmailProvider.env" });


async function sendEmail(email, token) {

  console.log(email);
  // Vytvoříme transportér s Gmailem
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // port 465 (SSL)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APPKEY,
    },
  });
  const html = `
  <h1>Validation emial</h1>
  <p>please click on link below</p>
  <a href="http://localhost:5173/user_validation?token=${token}">Link</a>
`
  // Odeslání emailu
  let info = await transporter.sendMail({
    from: `"Odesílatel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Testovací email",
    text: "Toto je textová verze emailu",
    html: html,
  });

  console.log("Zpráva byla odeslána: %s", info.messageId);
}



export default sendEmail;




