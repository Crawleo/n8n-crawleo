import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import * as search from './search';
import * as crawler from './crawler';
import type { Crawleo } from './node.type';

export async function router(this: IExecuteFunctions) {
	const items = this.getInputData();

	const returnData: INodeExecutionData[] = [];

	const resource = this.getNodeParameter<Crawleo>('resource', 0) as string;
	const operation = this.getNodeParameter('operation', 0);

	let responseData;

	const crawleo: { resource: string; operation: string } = { resource, operation };

	for (let i = 0; i < items.length; i++) {
		try {
			switch (crawleo.resource) {
				case 'search':
					responseData = await (search as any)[crawleo.operation].execute.call(this, i);
					break;
				case 'crawler':
					responseData = await (crawler as any)[crawleo.operation].execute.call(this, i);
					break;
				default:
					throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known`);
			}

			returnData.push(...responseData);
		} catch (error) {
			if (this.continueOnFail()) {
				const executionErrorData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: (error as Error).message }),
					{ itemData: { item: i } },
				);
				returnData.push(...executionErrorData);
				continue;
			}
			if (error instanceof NodeApiError && error?.context?.itemIndex === undefined) {
				if (error.context === undefined) {
					error.context = {};
				}
				error.context.itemIndex = i;
			}
			throw error;
		}
	}
	return [returnData];
}
