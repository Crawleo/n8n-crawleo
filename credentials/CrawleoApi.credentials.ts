//eslint-disable-next-line n8n-nodes-base/cred-filename-against-convention
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class CrawleoApi implements ICredentialType {
	name = 'crawleoApi';
	displayName = 'Crawleo API';
	documentationUrl = 'https://www.crawleo.dev/docs';
	icon: Icon = 'file:icons/img.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			description: 'Crawleo API key. Create one from the Crawleo dashboard.',
			default: '',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			description: "Base URL of Crawleo's API",
			default: 'https://api.crawleo.dev/api/v1',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
				'X-Client-Source': 'n8n',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/search',
			method: 'GET',
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
				'X-Client-Source': 'n8n',
			},
			qs: {
				query: 'Hello from n8n!',
			},
		},
	};
}
