import React from "react";
import renderer from "react-test-renderer";

import SearchBar from "./";

test("default render", () => {
	const component = renderer.create(
		<SearchBar onChange={jest.fn} onUpload={jest.fn()} />
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
