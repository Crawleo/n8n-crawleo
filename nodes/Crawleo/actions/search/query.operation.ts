import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { searchOptions } from '../../descriptions';

export const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		description: 'Type your query',
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
		options: searchOptions,
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

	const queryParams: IDataObject = {
		query,
		...options,
	};

	for (const [key, value] of Object.entries(queryParams)) {
		if (value === '' || value === undefined || value === null) {
			delete queryParams[key];
		}
	}

	const responseData = await crawleoApiRequest.call(this, 'GET', '/search', {}, queryParams);

	const results = Array.isArray(responseData) ? responseData : [responseData];

	return this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(results as IDataObject[]),
		{ itemData: { item: index } },
	);
}
