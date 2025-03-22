import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./../configEmailProvider.env" });

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);
async function sendEmail(email) {
  // Vytvoříme transportér s Gmailem
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // port 465 (SSL)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Odeslání emailu
  let info = await transporter.sendMail({
    from: `"Odesílatel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Testovací email",
    text: "Toto je textová verze emailu",
    html: "<b>Toto je HTML verze emailu</b>",
  });

  console.log("Zpráva byla odeslána: %s", info.messageId);
}

//export default sendEmail;

//sendEmail().catch(console.error);
