import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '27a2871292eba5',
    pass: '3204275357a198',
  },
});

app.post('/feedback', async (req, res) => {
  const { comment, type, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      comment,
      type,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Murilo Sambuite <murilosambuite@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
    ].join('\n'),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log('Server running on http://localhost:3333');
});
