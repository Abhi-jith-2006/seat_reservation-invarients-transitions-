const db = require('../db');

async function cancelReservation(reservationId) {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `
      SELECT id, status
      FROM reservations
      WHERE id = $1
      FOR UPDATE
      `,
      [reservationId]
    );

    if (result.rowCount === 0) {
      throw new Error('Reservation not found');
    }

    const reservation = result.rows[0];

    if (reservation.status !== 'RESERVED') {
      throw new Error('Reservation cannot be cancelled');
    }

    await client.query(
      `
      UPDATE reservations
      SET status = 'CANCELLED'
      WHERE id = $1
      `,
      [reservationId]
    );

    await client.query('COMMIT');
    return reservationId;

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = cancelReservation;
