const nodemailer = require("nodemailer");

class Email {
  constructor(user) {
    this.to = user.email;
    this.from = process.env.MAIL_SENDER;
    this.name = user.name;
  }
  newTransport() {
    if (process.env.NODE_ENV === "production") return 1;
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

  async sendWelcome() {
    await this.send("welcome", "Welcome to Study Notion"); //signing up the user
  }
  async addCourse(courseName) {
    await this.send(
      "Happy Learning",
      `You have successfully enrolled in ${courseName}`
    ); //signing up the user
    // console.log(this.name,courseName);
  }

  async sendResetPassword(resetUrl) {
    await this.send(
      "Passsword Reset",
      `Forgot your password? Submit a patch request with your new password and passwordConfirm to ${resetUrl}. If you don't forget your password just ignore this message)`
    );
    //forgot password
  }
}

module.exports = Email;
