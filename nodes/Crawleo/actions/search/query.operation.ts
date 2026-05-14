import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { bingSearchOptions } from '../../descriptions';
import { removeEmptyFields, wrapResponse } from '../utils';

export const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		description: 'Search query to send to Crawleo\'s Bing-powered Search API',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. latest advances in solar energy',
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		options: bingSearchOptions,
	},
];

const displayOptions = {
	show: {
		resource: ['search'],
		operation: ['query'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const query = this.getNodeParameter('query', index) as string;
	const options = this.getNodeParameter('options', index) as IDataObject;

	const queryParams = removeEmptyFields({
		query,
		...options,
	});

	const responseData = await crawleoApiRequest.call(this, 'GET', '/search', {}, queryParams);

	return wrapResponse.call(this, responseData as IDataObject | IDataObject[], index);
}
