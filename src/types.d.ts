export interface CodeBlock {
	id: string;
	type: 'code';
	code: string;
	language: string;
}

export interface TextBlock {
	id: string;
	type: 'text';
	title: string;
	content: string;
}

// export type Block = CodeBlock | TextBlock;
export interface Block {
	id: string;
	type: 'code' | 'text';
	code?: string;
	language?: string;
	title?: string;
	content?: string;
}
