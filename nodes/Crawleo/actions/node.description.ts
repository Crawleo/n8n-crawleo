/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import { NodeConnectionType, type INodeTypeDescription } from 'n8n-workflow';

import * as search from './search';
import * as crawler from './crawler';

export const description: INodeTypeDescription = {
	displayName: 'Crawleo',
	name: 'crawleo',
	group: ['transform'],
	icon: 'file:img.svg',
	version: 1,
	subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
	description: 'Crawleo Search and Crawler API',
	defaults: {
		name: 'Crawleo',
	},
	usableAsTool: true,
	inputs: [NodeConnectionType.Main],
	outputs: `={{['main']}}` as const,
	credentials: [
		{
			name: 'crawleoApi',
			required: true,
		},
	],
	properties: [
		{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			default: 'search',
			options: [
				{
					name: 'Search',
					value: 'search',
				},
				{
					name: 'Crawler',
					value: 'crawler',
				},
			],
		},
		...search.description,
		...crawler.description,
	],
};
