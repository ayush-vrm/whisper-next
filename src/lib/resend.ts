import { Resend } from 'resend';

console.log("RESEND API KEY", process.env.RESEND_API_KEY);

export const resend = new Resend(process.env.RESEND_API_KEY);