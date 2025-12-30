const db = require('../db')

async function expireReservations (){
    const client = await db.getClient();

    try{
        await client.query('BEGIN');
        const result = await client.query(
            `update reservations set status = 'EXPIRED' where status = 'RESERVED' and expires_at < now() returning id`
        )
        await client.query('COMMIT');
        return result.rowCount;
    }
    catch(err){
        await client.query('ROLLBACK');
        throw err
    }
    finally{
        client.release();
    }
}

module.exports = expireReservations;
