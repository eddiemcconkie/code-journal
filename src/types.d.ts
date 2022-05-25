import type { Timestamp } from 'firebase/firestore';

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

export interface Entry {
	id: string;
	title: string;
	blocks: Block[];
	group: string;
	favorite: boolean;
	// createdAt: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	tags: string[];
	links: string[];
}
