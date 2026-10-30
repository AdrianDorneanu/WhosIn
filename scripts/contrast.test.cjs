const assert = require("node:assert/strict");
const { test } = require("node:test");
const { colors } = require("../src/theme/colors.ts");

function luminance(hex) {
	const channels = hex.match(/[a-f\d]{2}/gi).map((value) => {
		const channel = parseInt(value, 16) / 255;
		return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
	});

	return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function checkContrast(foreground, background, minimum, label) {
	const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
	const ratio = (values[0] + 0.05) / (values[1] + 0.05);
	assert.ok(ratio >= minimum, `${label}: ${ratio.toFixed(2)}:1, requires ${minimum}:1`);
	return ratio;
}

test("body text, placeholders and feedback meet WCAG AA on their surfaces", (context) => {
	const ratios = [];
	const surfaces = [
		colors.background.app,
		colors.background.card,
		colors.background.muted,
		colors.background.illustration,
		colors.secondary.pressed,
		colors.primary.light,
		colors.danger.light,
		colors.info.light,
	];

	for (const background of surfaces) {
		for (const foreground of [colors.text.primary, colors.text.secondary, colors.text.muted]) {
			ratios.push(checkContrast(foreground, background, 4.5, `Text ${foreground} on ${background}`));
		}
	}

	for (const [foreground, background] of [
		[colors.primary.dark, colors.primary.light],
		[colors.danger.main, colors.danger.light],
		[colors.info.main, colors.info.light],
	]) {
		ratios.push(checkContrast(foreground, background, 4.5, "Feedback"));
	}
	context.diagnostic(`Minimum text contrast: ${Math.min(...ratios).toFixed(2)}:1`);
});

test("button labels and links meet WCAG AA in normal and pressed states", (context) => {
	const ratios = [];
	for (const background of [colors.primary.main, colors.primary.pressed, colors.danger.main, colors.danger.outline]) {
		ratios.push(checkContrast(colors.primary.contrast, background, 4.5, "Solid button label"));
	}

	for (const background of [colors.secondary.main, colors.secondary.pressed]) {
		ratios.push(checkContrast(colors.secondary.contrast, background, 4.5, "Secondary button label"));
	}

	for (const background of [
		colors.background.app,
		colors.background.card,
		colors.primary.light,
		colors.secondary.pressed,
	]) {
		for (const foreground of [
			colors.text.link,
			colors.primary.pressed,
			colors.secondary.contrast,
			colors.danger.main,
		]) {
			ratios.push(checkContrast(foreground, background, 4.5, "Link or outline button label"));
		}
	}
	context.diagnostic(`Minimum button/link contrast: ${Math.min(...ratios).toFixed(2)}:1`);
});

test("input boundaries, focus, selection and error indicators meet non-text contrast", (context) => {
	const ratios = [];
	for (const background of [colors.background.app, colors.background.card, colors.secondary.pressed]) {
		ratios.push(checkContrast(colors.border.strong, background, 3, "Input boundary"));
		ratios.push(checkContrast(colors.secondary.border, background, 3, "Secondary control boundary"));
		ratios.push(checkContrast(colors.primary.main, background, 3, "Focus indicator"));
		ratios.push(checkContrast(colors.danger.outline, background, 3, "Error boundary"));
	}

	ratios.push(
		checkContrast(colors.primary.main, colors.primary.light, 3, "Selected icons and creation progress fill"),
	);
	ratios.push(checkContrast(colors.text.muted, colors.background.card, 3, "Inactive tab icon"));
	context.diagnostic(`Minimum non-text contrast: ${Math.min(...ratios).toFixed(2)}:1`);
});
