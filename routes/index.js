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

router.get('/round-data', (req, res, next) => {

    res.json({rounds: model.getRoundData()})

})

router.get('/players', (req, res, next) => {

    res.json({rounds: model.getRoundData()})

})

router.get('/teams', (req, res, next) => {

    res.json({rounds: model.getRoundData()})

})


module.exports = router;
