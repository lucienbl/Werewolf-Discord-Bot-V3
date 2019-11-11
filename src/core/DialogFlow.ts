import { SessionsClient } from 'dialogflow/src/v2/index';

class DialogFlow {

    _sessionClient: SessionsClient;

    constructor() {

        let config = {
            credentials: {
                private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
                client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
            }
        };

        this._sessionClient = new SessionsClient(config);
    }

    _getSession = (sessionId: string): string => {
        return this._sessionClient.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);
    };

    public getResponse = async (sessionId: string, text: string): Promise<any> => {
        const session = this._getSession(sessionId);
        const request = {
            session,
            queryInput: {
                text: {
                    text,
                    languageCode: 'en-US',
                },
            },
        };

        const responses = await this._sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        if (result.intent) {
            return result.fulfillmentText;
        } else {
            return undefined;
        }
    }
}

export default DialogFlow;
