const express = require('express');
const app = express();

app.use(express.json());

const reservationRoutes = require('./http/reservations.js');
app.use('/reservations', reservationRoutes);


app.use((err, req, res, next) => {
  if (err.message === 'Seat already reserved') {
    return res.status(409).json({ error: err.message });
  }

  if (
    err.message === 'Reservation cannot be confirmed' ||
    err.message === 'Reservation not found'
  ) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === 'Reservation expired') {
    return res.status(410).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
