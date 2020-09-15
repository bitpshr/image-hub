import "@app/lib/useDocuments";

import React from "react";
import renderer from "react-test-renderer";

import Dashboard from "./";

let mockReturn = {};
jest.mock("@app/lib/useDocuments", () => () => mockReturn);

test("loading state", () => {
	mockReturn = { isLoading: true };
	const component = renderer.create(<Dashboard />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test("error state", () => {
	mockReturn = { isError: true };
	const component = renderer.create(<Dashboard />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test("documents", () => {
	mockReturn = {
		documents: [{ filename: "name.png", byteSize: 1337, date: 1000000000 }],
	};
	const component = renderer.create(<Dashboard />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

afterAll(() => {
	jest.clearAllMocks();
});
