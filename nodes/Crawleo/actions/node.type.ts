import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	search: 'query' | 'googleSearch' | 'googleMaps';
	crawler: 'urls' | 'headfulBrowser';
};

export type Crawleo = AllEntities<NodeMap>;
