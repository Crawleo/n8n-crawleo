import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { crawlerOptions } from '../../descriptions/common.descriptions';

export const properties: INodeProperties[] = [
	{
		displayName: 'URLs',
		name: 'urls',
		description: 'One or more URLs to crawl with Crawleo',
		type: 'string',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add URL',
		},
		required: true,
		default: [],
		placeholder: 'https://www.example.com/page',
		displayOptions: {
			show: {
				resource: ['crawler'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		default: {},
		options: crawlerOptions,
	},
];

const displayOptions = {
	show: {
		resource: ['crawler'],
		operation: ['urls'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const urlsInput = this.getNodeParameter('urls', index) as string[] | string;
	const urls = Array.isArray(urlsInput) ? urlsInput : [urlsInput];
	const options = this.getNodeParameter('options', index) as IDataObject;

	const queryParams: IDataObject = {
		urls: urls.join(','),
		...options,
	};

	for (const [key, value] of Object.entries(queryParams)) {
		if (value === '' || value === undefined || value === null) {
			delete queryParams[key];
		}
	}

	const responseData = await crawleoApiRequest.call(this, 'GET', '/crawler', {}, queryParams);
	const results = Array.isArray(responseData) ? responseData : [responseData];

	return this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(results as IDataObject[]),
		{ itemData: { item: index } },
	);
}
