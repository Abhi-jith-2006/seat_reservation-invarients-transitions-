const db = require('../db');

async function confirmReservation(reservationId) {
    const client = await db.getClient();
    try{
        await client.query('BEGIN');

        const result = await client.query(
            `select id , status , expires_at from reservations where id = $1 for update`,[reservationId]
        )

        if (result.rowCount === 0){
            throw new Error ('reservation not found');
        } 
        const reservation = result.rows[0];

        if(reservation.status !== 'RESERVED'){
            throw new Error ('reservation cant be confirmed');
        }
        if(reservation.expires_at <= new Date()){
            throw new Error ('reservation is expired')
        }

        await client.query(
            `update reservations set status = 'CONFIRMED' where id = $1`,[reservationId]
        )
        await client.query('COMMIT');
        return reservationId;
    }
    catch(err){
        await client.query('ROLLBACK');
        throw err;
    }
    finally{
         client.release();
    }
}

module.exports = confirmReservation;