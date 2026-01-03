const express = require('express');
const app = express();

const startExpiryJob = require('./job/expireReservation.job');
const reservationRoutes = require('./http/reservations');
const {
  NotFoundError,
  InvalidTransitionError,
  ConflictError,
} = require('./errors/domainErrors');

app.use(express.json());

app.use('/reservations', reservationRoutes);

// central error handler (must be after routes)
app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  if (err instanceof InvalidTransitionError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof ConflictError) {
    return res.status(409).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Internal Server Error' });
});

// start background jobs
startExpiryJob();

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

