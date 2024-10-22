import noticeModel from "../models/noticeModel.js";
import cron from 'node-cron'

// cron
export function setupCronJob() {
     cron.schedule('0 0 * * *', async () => {
       try {
         const now = new Date();
         await noticeModel.deleteMany({
           date: {
             $lte: now,
             $ne: '1' // Exclude documents where date is '1'
           },
         });
         console.log('Expired notices deleted');
       } catch (err) {
         console.error('Error deleting expired notices:', err);
       }
     });
   }