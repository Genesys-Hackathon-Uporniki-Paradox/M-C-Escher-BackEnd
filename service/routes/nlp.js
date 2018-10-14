module.exports = function (app, nlp, sessionPath, sessionClient) {
    app.post('/question/audio', async (req, res) => {
        try {
            const encodedAudio = req.body.encodedAudio;
            const encoding = req.body.encoding;
            const sampleRateHertz = req.body.sampleRateHertz;
            const languageCode = req.body.languageCode;

            nlp.detectAudioIntent(sessionPath, sessionClient, encodedAudio, encoding, sampleRateHertz, languageCode)
                .then(result => res.send(result));
        } catch (error) {
            throw error;
        }
    });

    app.post('/question/text', async (req, res, next) => {
        try {
            const queryText = req.body.queryText;
            const languageCode = req.body.languageCode;

            nlp.detectTextIntent(sessionPath, sessionClient, queryText, languageCode)
                .then(responses => res.send(responses));
        } catch (error) {
            throw error;
        }
    });

    app.options('/question/text', async (req, res) => {
        res.send(200);
    });
};
