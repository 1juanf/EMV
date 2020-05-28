const {Router} = require('express');
const router = Router();

require('../database');
router.get('/', async (req,res) => {
    const Temergencia = await getDBamb( ambest );
    res.json(res);
});

router.post('/', async (req, res) => {
    const { idamb, ambtipe, amblon, amblat} = req.body;
    await insertamb(idamb, ambtipe, amblon, amblat);
    console.log('ingresados');
});

router.delete('/:idamb', async (req, res) => {
    await deleteamb(req.params.id);
    res.json({message: 'Book Deleted'});
});


module.exports = router;
