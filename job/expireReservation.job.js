const cron = require('node-cron');
const expireReservations = require('../domain/expireReservations');

function startExpiryJob() {
  cron.schedule('* * * * *', async () => {
    try {
      const expiredCount = await expireReservations();

      if (expiredCount > 0) {
        console.log(`[cron] expired ${expiredCount} reservations`);
      }
    } catch (err) {
      console.error('[cron] expiry job failed', err);
    }
  });
}

module.exports = startExpiryJob;
