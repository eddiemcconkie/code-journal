interface BaseBlock {
	id: string;
	type: string;
}

export interface CodeBlock extends BaseBlock {
	type: 'code';
	code: string;
	language: string;
}

export interface TextBlock extends BaseBlock {
	type: 'text';
	title: string;
	content: string;
}

export type Block = CodeBlock | TextBlock;

export interface Stack {
	id: string;
	name: string;
	blocks: Block[];
	group: string;
	favorite: boolean;
	createdAt: string;
	updatedAt: string;
	tags: string[];
	links: string[];
}
