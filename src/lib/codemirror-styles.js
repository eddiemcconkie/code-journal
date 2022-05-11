import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors
// const chalky = '#e5c07b',
const chalky = '#FF9E64', // numbers and stuff
	// coral = '#e06c75',
	coral = '#C0F0F5', // variables/names
	// cyan = '#56b6c2',
	cyan = '#89DDFF', // operators / regex
	invalid = '#ffffff',
	ivory = '#abb2bf',
	// ivory = '#ff0000',
	stone = '#7d8799', // Brightened compared to original to increase contrast
	// Brightened compared to original to increase contrast
	// stone = '#526270', // comments - stick with original
	// malibu = '#61afef',
	malibu = '#7AA2F7', // functions (used)
	// sage = '#98c379',
	sage = '#9ECE6A',
	// whiskey = '#d19a66',
	whiskey = '#FF9E64',
	// whiskey = '#CDE2EC', // constants -- currently does nothing??
	// violet = '#c678dd',
	violet = '#BB9AF7',
	darkViolet = '#9D7CD8',
	red = '#F7768E',
	separator = '#20A57E',
	darkBackground = '#21252b',
	// highlightBackground = '#2c313a',
	highlightBackground = '#28313A',
	// background = '#282c34',
	background = '#1C252C',
	// background = '#1D252C',
	tooltipBackground = '#353a42',
	// selection = '#3E4451',
	selection = '#28313A',
	// cursor = '#528bff';
	cursor = '#89DDFF',
	yellow = '#E0AF68',
	seafoam = '#73DACA',
	blue = '#21B9D7';
/**
The editor theme styles for One Dark.
*/
const oneDarkTheme = EditorView.theme(
	{
		'&': {
			color: ivory,
			backgroundColor: background,
			fontSize: '16px'
		},
		'.cm-content': {
			caretColor: cursor
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: cursor,
			borderWidth: '2px'
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: selection
		},
		'.cm-panels': { backgroundColor: darkBackground, color: ivory },
		'.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
		'.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
		'.cm-searchMatch': {
			backgroundColor: '#72a1ff59',
			outline: '1px solid #457dff'
		},
		'.cm-searchMatch.cm-searchMatch-selected': {
			backgroundColor: '#6199ff2f'
		},
		'.cm-activeLine': { backgroundColor: highlightBackground },
		'.cm-selectionMatch': { backgroundColor: '#aafe661a' },
		'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
			backgroundColor: '#bad0f847',
			outline: '1px solid #515a6b'
		},
		'.cm-gutters': {
			backgroundColor: background,
			color: stone,
			border: 'none'
		},
		'.cm-activeLineGutter': {
			backgroundColor: highlightBackground
		},
		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#ddd'
		},
		'.cm-tooltip': {
			border: 'none',
			backgroundColor: tooltipBackground
		},
		'.cm-tooltip .cm-tooltip-arrow:before': {
			borderTopColor: 'transparent',
			borderBottomColor: 'transparent'
		},
		'.cm-tooltip .cm-tooltip-arrow:after': {
			borderTopColor: tooltipBackground,
			borderBottomColor: tooltipBackground
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: highlightBackground,
				color: ivory
			}
		}
	},
	{ dark: true }
);
/**
The highlighting style for code in the One Dark theme.
*/
const oneDarkHighlightStyle = HighlightStyle.define([
	{ tag: tags.keyword, color: violet },
	{ tag: [tags.definitionKeyword, tags.modifier], color: darkViolet },
	{
		tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName],
		color: coral
	},
	{ tag: [tags.function(tags.variableName), tags.labelName], color: malibu },
	{
		tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)],
		color: whiskey
	},
	// { tag: [tags.definition(tags.name), tags.separator], color: ivory },
	// { tag: tags.definition(tags.name), color: chalky },
	// { tag: tags.definition(tags.name), color: chalky },
	// { tag: tags.special(tags.name), color: chalky },
	{ tag: tags.literal, color: chalky },
	{ tag: tags.color, color: yellow },
	// { tag: tags.punctuation, color: coral },
	{ tag: tags.separator, color: cyan },
	{ tag: tags.atom, color: yellow },
	// { tag: tags., color: malibu },
	{
		tag: [tags.self, tags.typeName, tags.className, tags.changed, tags.annotation, tags.namespace],
		color: violet
	},
	{
		tag: [tags.number],
		color: chalky
	},
	{ tag: tags.self, color: red },
	{
		tag: [
			tags.operator,
			// tags.operatorKeyword,
			tags.url,
			tags.escape,
			tags.regexp,
			tags.link,
			// tags.special(tags.string),
			tags.quote, // added
			tags.moduleKeyword
		],
		color: cyan
	},
	{ tag: [tags.meta, tags.comment], color: stone },
	{ tag: tags.strong, fontWeight: 'bold' },
	{ tag: tags.emphasis, fontStyle: 'italic' },
	{ tag: tags.strikethrough, textDecoration: 'line-through' },
	{ tag: tags.link, color: stone, textDecoration: 'underline' },
	{ tag: tags.heading, fontWeight: 'bold', color: coral },
	// { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey },
	{ tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: yellow },
	{ tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage },
	{ tag: tags.invalid, color: invalid },
	{ tag: tags.quote, color: cyan },
	{ tag: tags.namespace, color: seafoam },
	{ tag: tags.unit, color: red },
	{ tag: tags.tagName, color: blue },
	{ tag: tags.content, color: coral }
]);
/**
Extension to enable the One Dark theme (both the editor theme and
the highlight style).
*/
const oneDark = [oneDarkTheme, syntaxHighlighting(oneDarkHighlightStyle)];

export { oneDark, oneDarkHighlightStyle, oneDarkTheme };
