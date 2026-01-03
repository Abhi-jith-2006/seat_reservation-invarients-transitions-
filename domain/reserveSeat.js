const db = require('../db');
const {ConflictError} = require('../errors/domainErrors');

async function reserveSeat(userId, seatId) {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `
      INSERT INTO reservations (seat_id, user_id, status, expires_at)
      VALUES ($1, $2, 'RESERVED', now() + interval '5 minutes')
      RETURNING id
      `,
      [seatId, userId]
    );

    await client.query('COMMIT');
    return result.rows[0].id;

  } catch (err) {
    await client.query('ROLLBACK');

    if (err.code === '23505') {
      throw new ConflictError('seat already reserved')
    }

    throw err;
  } finally {
    client.release();
  }
}

module.exports = reserveSeat;
