import type { INodeProperties } from 'n8n-workflow';

import * as urls from './urls.operation';

export { urls };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['crawler'],
			},
		},
		options: [
			{
				name: 'URLs',
				value: 'urls',
				description: 'Crawl and extract from URLs',
				action: 'Crawl urls',
			},
		],
		default: 'urls',
	},
	...urls.description,
];
