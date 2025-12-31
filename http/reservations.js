const router = require('express').Router();

const reserveSeat = require('../domain/reserveSeat');
const confirmReservation = require('../domain/confirmReservation');


router.post('/:seatId/reserve', async (req, res, next) => {
  try {
    const reservationId = await reserveSeat(
      req.body.userId,
      req.params.seatId
    );

    res.status(201).json({ reservationId });
  } catch (err) {
    next(err);
  }
});


router.post('/:reservationId/confirm', async (req, res, next) => {
  try {
    await confirmReservation(req.params.reservationId);
    res.status(200).json({ status: 'CONFIRMED' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
