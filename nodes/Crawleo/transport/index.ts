import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IRequestOptions,
} from 'n8n-workflow';

function getBaseUrl(baseUrl?: unknown) {
	if (typeof baseUrl !== 'string' || baseUrl.length === 0) {
		return 'https://api.crawleo.dev';
	}

	return baseUrl
		.replace(/\/$/, '')
		.replace(/\/api\/v1$/, '');
}

export async function crawleoApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
	option: IDataObject = { json: true },
) {
	const credentials = await this.getCredentials('crawleoApi');
	const baseUrl = getBaseUrl(credentials.baseUrl);

	const apiURL = `${baseUrl}${resource}`;

	const options: IRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'x-api-key': credentials.apiKey as string,
			'X-Client-Source': 'n8n',
		},
		method,
		body,
		qs: query,
		uri: uri || apiURL,
	};
	try {
		Object.assign(options, option);

		if (Object.keys(headers).length !== 0) {
			options.headers = Object.assign({}, options.headers, headers);
		}

		if (options.method === 'GET' || Object.keys(body).length === 0) {
			delete options.body;
		}

		const httpOptions: IHttpRequestOptions = {
			url: options.uri as string,
			method: options.method,
			headers: options.headers,
			qs: options.qs,
			body: options.body,
		};
		return await this.helpers.httpRequestWithAuthentication.call(this, 'crawleoApi', httpOptions);
	} catch (error) {
		throw error;
	}
}
