const express = require('express');
const router = express.Router();
const questUtils = require('./questUtils');

router.post('/reset', (request, response) => {
    try {
        const { auth } = request.body;
        if (auth !== 'alexmizrachi') throw {status: 401, data: {msg: 'unauthenticated user'}};
        questUtils.reset();
        console.log('reset questionnaire success');
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'reset error', err });
    }
});

router.post('/answer/:id', async (request, response) => {
    try {
        const { userId } = request.body;
        if (!userId) throw { status: 400, data: { msg: 'user id was not found' } };
        if (!request.params || !request.params.id) throw { status: 400, data: { msg: 'answer id was not found' } };
        const ansId = request.params.id;
        questUtils.vote(ansId, userId);
        console.log(`user ${userId} voted ${ansId} successfully`);
        response.json();
    } catch (err) {
        response.status(err.status).json(err.data || { msg: 'answer voting error', err });
    }
});

module.exports = router;