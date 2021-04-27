var express = require('express');
var router = express.Router();

var model = require('./data/model')

/* GET home page. */
router.get('/', (req, res, next) => {
    // res.render('index', { title: 'Express' });
    // console.lo
});


router.get('/ping', (req, res, next) => {
    res.json({
        "message": model.pingTest()
    })
})


router.get('/hole-data', (req, res, next) => {

    res.json({holes: model.getHoleData()})

})
module.exports = router;
