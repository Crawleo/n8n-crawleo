import type { INodeProperties } from 'n8n-workflow';

import * as urls from './urls.operation';
import * as headfulBrowser from './headfulBrowser.operation';

export { urls, headfulBrowser };

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
				name: 'Crawler',
				value: 'urls',
				description: 'Directly crawl URLs with optional JavaScript rendering, screenshots, and multiple output formats',
				action: 'Crawl urls',
			},
			{
				name: 'Headful Browser',
				value: 'headfulBrowser',
				description: 'Use premium headed-browser crawling with residential proxies and advanced anti-bot evasion',
				action: 'Crawl urls with headful browser',
			},
		],
		default: 'urls',
	},
	...urls.description,
	...headfulBrowser.description,
];
