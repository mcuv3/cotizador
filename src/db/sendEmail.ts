import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  // host: "smtp-relay.sendinblue.com",
  // port: 587,
  // auth: {
  //   user: "MauricioAntonioMartinez@outlook.com",
  //   pass: "fALK63rgIY0XbQk5",
  // },
  host: "smtp-relay.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "inavarrete@wabiit.com",
    clientId:
      "125149663180-ggdoh641nbtgcjkdl43npaobgsp3kp0u.apps.googleusercontent.com",
    clientSecret: "HUK2MmgRg9dwrnB4pS5QrmzY",
    refreshToken:
      "1//04UvZx9abjqBBCgYIARAAGAQSNwF-L9Iryp7gHDV-rZpFRY82kkEoz87lxLr1uoQOfJngqLACckljgWvcIgVA-60Bil13VqQIfp8",
    accessToken:
      "ya29.a0AfH6SMDJYSAdi5Pq8lboc42vr3Xpp20rrxV_P7S-tmeG3USLJKGtzy9uEwNAt7SRms4yFZ97vlJ4VKKY_e_-JLpSDzBwu79H83mob4NYY4FUYK2sCwQOx97QBitUIhsGB0FyWTC_JtasKoe5U99vIY9PgIfh8GfmXaQ",
  },
});
