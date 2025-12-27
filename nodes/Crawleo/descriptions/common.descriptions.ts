import type { INodeProperties } from 'n8n-workflow';

export const searchOptions: INodeProperties[] = [
	{
		displayName: 'Max Pages',
		name: 'max_pages',
		type: 'number',
		default: 1,
		description: 'Maximum number of search result pages to retrieve. Min 1.',
		typeOptions: { minValue: 1 },
	},
	{
		displayName: 'Result Count',
		name: 'count',
		type: 'number',
		default: undefined,
		description: 'Number of search results to return',
		typeOptions: { minValue: 1, maxValue: 50 },
	},
	{
		displayName: 'Language',
		name: 'setLang',
		type: 'string',
		default: '',
		description: 'Preferred language for results (ISO code, e.g. en, es)',
	},
	{
		displayName: 'Country Code',
		name: 'cc',
		type: 'string',
		default: '',
		description: 'Country code for localized search (ISO-2, e.g. US, GB)',
	},
	{
		displayName: 'Geolocation',
		name: 'geolocation',
		type: 'string',
		default: 'random',
		description: 'Bias results to a location. Allowed: random, pl, gb, jp, de, fr, es, us.',
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		options: [
			{ name: 'Desktop', value: 'desktop' },
			{ name: 'Mobile', value: 'mobile' },
			{ name: 'Tablet', value: 'tablet' },
		],
		description: 'Device profile to simulate during search',
	},
	{
		displayName: 'AI-Enhanced HTML',
		name: 'enhanced_html',
		type: 'boolean',
		default: true,
		description: 'Whether to return cleaned, ad-free HTML optimized for LLMs',
	},
	{
		displayName: 'Raw HTML',
		name: 'raw_html',
		type: 'boolean',
		default: false,
		description: 'Whether to return the original HTML source for each result',
	},
	{
		displayName: 'Page Text',
		name: 'page_text',
		type: 'boolean',
		default: false,
		description: 'Whether to return extracted plain text for each result',
	},
	{
		displayName: 'Page Text Markdown',
		name: 'markdown',
		type: 'boolean',
		default: true,
		description: 'Whether to return extracted text in Markdown format (RAG-ready)',
	},
];

export const crawlerOptions: INodeProperties[] = [
	{
		displayName: 'AI-Enhanced HTML',
		name: 'enhanced_html',
		type: 'boolean',
		default: true,
		description: 'Whether to return cleaned, ad-free HTML for each URL',
	},
	{
		displayName: 'Raw HTML',
		name: 'raw_html',
		type: 'boolean',
		default: false,
		description: 'Whether to return the original HTML for each URL',
	},
	{
		displayName: 'Page Text',
		name: 'page_text',
		type: 'boolean',
		default: false,
		description: 'Whether to return extracted text for each URL',
	},
	{
		displayName: 'Page Text Markdown',
		name: 'markdown',
		type: 'boolean',
		default: true,
		description: 'Whether to return extracted text in Markdown format',
	},
];
