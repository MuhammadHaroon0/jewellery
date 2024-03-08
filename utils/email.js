const nodemailer = require("nodemailer");

class Email {
  constructor(user) {
    this.to = user.email;
    this.from = process.env.MAIL_SENDER;
    this.name = user.name;
  }
  newTransport() {
    // if (process.env.NODE_ENV === "production") return 1;
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }
  async send(subject, template) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: template,
    };
    await this.newTransport().send(mailOptions);
  }

  async sendWelcome(jewellryName) {
    await this.send("Order Confirmation", "Your order has been confirmed! You have bought " + jewellryName + "."); //signing up the user
  }


}

module.exports = Email;
