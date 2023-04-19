const sender = require("../config/emailConfig");

const sendMail = (students) => {
  students.forEach((student) => {
    sender.sendMail(
      {
        to: student.email,
        subject: `Successfully Submitted Marks`,
        text: `Your Mentor Successfully submitted marks You can now check it on the online portal`,
      },
      async (err, data) => {
        if (err) {
          throw new Error(err);
        }
        console.log(`Successfully sent mail to ${student.email}`);
      }
    );
  });
};

module.exports = sendMail;
