import React from "react";
import renderer from "react-test-renderer";

import Viewport from "./";

test("default render", () => {
	const component = renderer.create(<Viewport />);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
