import React from "react";
import renderer from "react-test-renderer";

import Flex from "./";

test("default render", () => {
	const component = renderer.create(
		<Flex grow={1} shrink={0} alignItems="center" />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
