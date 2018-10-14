module.exports = function (app, nlp, sessionPath, sessionClient) {
    app.post('/question', async(req, res) => {
        try {
            const encodedAudio = req.body.encodedAudio;
            const encoding = req.body.encoding;
            const sampleRateHertz = req.body.sampleRateHertz;
            const languageCode = req.body.languageCode;

            nlp.detectAudioIntent(sessionPath, sessionClient, encodedAudio, encoding, sampleRateHertz, languageCode);
        } catch (error) {
            res.send(error);
        }
    });
};
