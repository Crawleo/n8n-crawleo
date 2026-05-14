import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { googleMapsOptions } from '../../descriptions';
import { removeEmptyFields, wrapResponse } from '../utils';

export const properties: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'q',
		description: 'Google Maps search query. Accepts business names, landmarks, addresses, keywords, and category plus location queries.',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. restaurants in Paris',
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
		options: googleMapsOptions,
	},
];

const displayOptions = {
	show: {
		resource: ['search'],
		operation: ['googleMaps'],
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

	const responseData = await crawleoApiRequest.call(this, 'GET', '/google-maps', {}, queryParams);

	return wrapResponse.call(this, responseData as IDataObject | IDataObject[], index);
}
