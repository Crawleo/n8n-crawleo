import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
} from 'n8n-workflow';

export async function crawleoApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	query: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
	option: IDataObject = {json: true},
) {
	const credentials = await this.getCredentials('crawleoApi');
	const baseUrl =
		(typeof credentials.baseUrl === 'string' && credentials.baseUrl.length > 0)
			? credentials.baseUrl.replace(/\/$/, '')
			: 'https://api.crawleo.dev/api/v1';

	const apiURL = `${baseUrl}${resource}`;

	const options: IRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
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

		return await this.helpers.requestWithAuthentication.call(
			this,
			'crawleoApi',
			options,
		);
	} catch (error) {

		throw error;
	}
}
