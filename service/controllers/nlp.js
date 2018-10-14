'use strict';

exports.detectTextIntent = async function (sessionPath, sessionClient, query, languageCode) {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    console.log(`Sending query "${query}"`);
    return sessionClient.detectIntent(request);
};

exports.detectAudioIntent = function (sessionPath, sessionClient, encodedAudio, encoding, sampleRateHertz, languageCode) {
    const request = {
        session: sessionPath,
        queryInput: {
            audioConfig: {
                audioEncoding: encoding,
                sampleRateHertz: sampleRateHertz,
                languageCode: languageCode,
            },
        },
        inputAudio: encodedAudio,
    };

    console.log(request);

    console.log(`Sending audio query`);
    return sessionClient.detectIntent(request)
};