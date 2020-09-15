import React from "react";
import renderer from "react-test-renderer";

import Button from "./";

test("default render", () => {
	const component = renderer.create(<Button size="normal" />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test("normal size", () => {
	const component = renderer.create(<Button size="normal" />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test("small size", () => {
	const component = renderer.create(<Button size="small" />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
