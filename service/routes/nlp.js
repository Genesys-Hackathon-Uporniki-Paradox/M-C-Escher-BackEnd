module.exports = function (app, nlp, sessionPath, sessionClient) {
    app.post('/question', async(req, res) => {
        try {
            const encodedAudio = req.body.encodedAudio;
            const encoding = req.body.encoding;
            const sampleRateHertz = req.body.sampleRateHertz;
            const languageCode = req.body.languageCode;

            const result = nlp.detectAudioIntent(sessionPath, sessionClient, encodedAudio, encoding, sampleRateHertz, languageCode);

            res.send(result);
        } catch (error) {
            throw error;
        }
    });

    app.post('/question/text', async(req, res) => {
        try {
            const queryText = req.body.queryText;
            const languageCode = req.body.languageCode;

            const result = nlp.detectTextIntent(sessionPath, sessionClient, queryText, languageCode);

            res.send(result);
        } catch (error) {
            throw error;
        }
    });
};
