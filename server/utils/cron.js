import axios from "axios";
import cron from "node-cron";


// sehedule cron job

export const startCronJob = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? 'https://your-instaclone-app.onrender.com/api/health'
          : 'http://localhost:3000/api/health'
      );
      console.log('Cron job pinged /api/health:', response.data);
    } catch (error) {
      console.error('Cron job error:', error.message);
    }
  });

  console.log('Cron job initialized: Pinging /api/health every 5 minutes');
};

