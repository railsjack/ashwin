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
        console.log('message: ' + message_type)

        let response;
        switch (message_type) {
            case 'start':
                response = "Hi\nWhat's your name?"
                break;
            case 'ANSWER_NAME':
                const name = req.body.message
                response = "Ok, great! " + name + ", when is your birthday?"
                break;
            case 'ANSWER_BIRTHDAY':
                birthday = req.body.message
                response = "Ok. Do you want to know how many days till your next birtday?"
                break;
            case 'ANSWER_TILLDAYS':
                const yesno = req.body.message
                console.log('birthday: '+ birthday);
                console.log('yesno: '+ yesno);
                switch (yesno) {
                    case 'yes':
                    case 'yeah':
                    case 'yup':
                        if (birthday) {
                            let date = new Date(birthday);
                            date = new Date(new Date().getFullYear(),date.getMonth(),date.getDate())
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
        }
        res.send({ response: response })
    } catch (err) {
        console.error(err);
        res.send("Error " + err)
    }
}

