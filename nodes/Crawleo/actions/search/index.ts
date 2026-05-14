import type { INodeProperties } from 'n8n-workflow';

import * as query from './query.operation';
import * as googleSearch from './googleSearch.operation';
import * as googleMaps from './googleMaps.operation';

export { query, googleSearch, googleMaps };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['search'],
			},
		},
		options: [
			{
				name: 'Bing Search',
				value: 'query',
				description: 'Search the web with Bing and optionally auto-crawl result pages for LLM/RAG workflows',
				action: 'Run bing search',
			},
			{
				name: 'Google Search',
				value: 'googleSearch',
				description: 'Retrieve structured Google SERP data for SEO, news, images, places, and shopping workflows',
				action: 'Run google search',
			},
			{
				name: 'Google Maps',
				value: 'googleMaps',
				description: 'Search Google Maps for businesses, places, landmarks, and locations',
				action: 'Search google maps',
			},
		],
		default: 'query',
	},
	...query.description,
	...googleSearch.description,
	...googleMaps.description,
];
