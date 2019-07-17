exports.testDb = async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }

exports.messengerLoad = async (req, res) => {
    try {
      res.render('pages/messenger_bot' );
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }

exports.handleMessage = async (req, res) => {
    try {
      console.log('message: '+JSON.stringify(req.body));
      res.render('pages/messenger_bot' );
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  }

