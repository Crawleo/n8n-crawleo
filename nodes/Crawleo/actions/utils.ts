import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';

export function removeEmptyFields(data: IDataObject) {
	for (const [key, value] of Object.entries(data)) {
		if (value === '' || value === undefined || value === null) {
			delete data[key];
		}
	}

	return data;
}

export function wrapResponse(this: IExecuteFunctions, responseData: IDataObject | IDataObject[], index: number) {
	const results = Array.isArray(responseData) ? responseData : [responseData];

	return this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(results),
		{ itemData: { item: index } },
	);
}
