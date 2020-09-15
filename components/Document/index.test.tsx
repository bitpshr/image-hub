import React from "react";
import renderer from "react-test-renderer";

import Document from "./";

test("default render", () => {
	const component = renderer.create(
		<Document
			byteSize={100000}
			date={1600202591670}
			filename="Doc1"
			onDelete={jest.fn()}
		/>
	);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
