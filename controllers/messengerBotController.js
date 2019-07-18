const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.LOCAL ? false : true
})

let response;
let birthday;
exports.testDb = async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM test_table')
        const results = { 'results': (result) ? result.rows : null }
        res.render('pages/db', results)
        client.release()
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
}

exports.messengerLoad = async (req, res) => {
    try {
        res.render('pages/messenger_bot')
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
}

exports.handleMessage = async (req, res) => {
    try {
        const message_type = req.body.message_type
        const message = req.body.message;
        let db_message = '';

        switch (message_type) {
            case 'start':
                response = "Hi\nWhat's your name?"
                break;
            case 'ANSWER_NAME':
                const name = message
                db_message = response + "\n" + name
                response = "Ok, great! " + name + ", when is your birthday?"
                break;
            case 'ANSWER_BIRTHDAY':
                birthday = message
                db_message = response + "\n" + birthday
                response = "Ok. Do you want to know how many days till your next birtday?"
                break;
            case 'ANSWER_TILLDAYS':
                const yesno = message
                db_message = response + "\n" + yesno
                switch (yesno) {
                    case 'yes':
                    case 'yeah':
                    case 'yup':
                        if (birthday) {
                            let date = new Date(birthday);
                            date = new Date(new Date().getFullYear(), date.getMonth(), date.getDate())
                            const left_days = parseInt((date - +new Date) / 1000 / 3600 / 24)
                            response = "There are " + left_days + " days left until your next birthday"
                        }
                        break;
                    case 'no':
                    case 'nah':
                        response = "Goodbye!"
                        break;
                    default:
                        response = ""
                }
            case 'SEND_MESSAGE':
                db_message = message
        }

        if (db_message) {
            try {
                const client = await pool.connect()
                await client.query("insert into messages(message) values('" + escape(db_message) + "')");
                client.release()
            } catch (err) {
                console.error(err)
            }

        }
        res.send({ response: response })
    } catch (err) {
        console.error(err);
        res.send("Error " + err)
    }
}

exports.allMessages = async (req, res) => {
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT id, message FROM messages')
        const results = { 'results': (result) ? result.rows : null }
        res.render('messages/index', results)
        client.release()
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
};

exports.showMessage = async (req, res) => {
    const id = req.params.id
    try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM messages where id=' + id)
        const results = { 'result': (result) ? result.rows[0] : null }
        res.render('messages/show', results)
        client.release()
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
};

exports.deleteMessage = async (req, res) => {
    const id = req.params.id
    try {
        const client = await pool.connect()
        const result = await client.query('DELETE FROM messages where id=' + id)
    } catch (err) {
        console.error(err)
    }
    res.redirect('/messages')
};

