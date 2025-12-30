const {Pool} = require('pg');

const pool = new Pool({
    database: "seat_reservation"
})

module.exports = {
    getClient: () => pool.connect()
}