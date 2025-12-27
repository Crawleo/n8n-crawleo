import type { AllEntities } from 'n8n-workflow';

type NodeMap = {
	search: 'query';
	crawler: 'urls';
};

export type Crawleo = AllEntities<NodeMap>;
