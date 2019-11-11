/*
 * Copyright (c) 2019 Lucien Blunk-Lallet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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

        return responses[0].queryResult;
    }
}

export default DialogFlow;
