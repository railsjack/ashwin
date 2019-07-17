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
        console.log('message: ' + message_type)

        let response;
        switch ('message_type') {
            case 'start':
                const name = req.body.message
                response = "Hi\nWhat's your name?"
                break;
            case 'ANSWERING_NAME':
                response = "Ok, great! "
                break;
        }
        res.send({ response: response })
    } catch (err) {
        console.error(err);
        res.send("Error " + err)
    }
}

