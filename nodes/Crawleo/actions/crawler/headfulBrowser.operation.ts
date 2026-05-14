import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { crawleoApiRequest } from '../../transport';
import { updateDisplayOptions } from '../../display';
import { headfulBrowserOptions } from '../../descriptions/common.descriptions';
import { removeEmptyFields, wrapResponse } from '../utils';

export const properties: INodeProperties[] = [
	{
		displayName: 'URLs',
		name: 'urls',
		description: 'One or more URLs to crawl with Crawleo\'s premium headful browser. Use this only when standard crawling is blocked or you need advanced anti-bot evasion.',
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
		options: headfulBrowserOptions,
	},
];

const displayOptions = {
	show: {
		resource: ['crawler'],
		operation: ['headfulBrowser'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(this: IExecuteFunctions, index: number) {
	const urlsInput = this.getNodeParameter('urls', index) as string[] | string;
	const urls = Array.isArray(urlsInput) ? urlsInput : [urlsInput];
	const options = this.getNodeParameter('options', index) as IDataObject;

	const queryParams = removeEmptyFields({
		urls: urls.filter((url) => url).join(','),
		...options,
	});

	const responseData = await crawleoApiRequest.call(this, 'GET', '/headful-browser', {}, queryParams);

	return wrapResponse.call(this, responseData as IDataObject | IDataObject[], index);
}
