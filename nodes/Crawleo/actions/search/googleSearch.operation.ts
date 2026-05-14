import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { googleSearchOptions } from '../../descriptions';
import { removeEmptyFields, wrapResponse } from '../utils';

export const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		description: 'Google search query. Use this operation for SEO monitoring, lead generation, competitor research, news, images, places, and shopping SERP data.',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. best CRM software',
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
		options: googleSearchOptions,
	},
];

const displayOptions = {
	show: {
		resource: ['search'],
		operation: ['googleSearch'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const q = this.getNodeParameter('q', index) as string;
	const options = this.getNodeParameter('options', index) as IDataObject;

	const queryParams = removeEmptyFields({
		q,
		...options,
	});

	const responseData = await crawleoApiRequest.call(this, 'GET', '/google-search', {}, queryParams);

	return wrapResponse.call(this, responseData as IDataObject | IDataObject[], index);
}
