const express = require("express");
const router = express.Router();
const con=require('../controller/poll')


router.get('/',con.formget);

router.post('/',con.formpost)

// change in title or id
router.route('/poll/:title')
  .get(con.pollget)
  .post(con.pollpost)


module.exports = router;
