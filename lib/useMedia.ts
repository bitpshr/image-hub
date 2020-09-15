import React from "react";

import { viewportContext } from "@app/components/Viewport";

export interface UseMediaConfig {
	[key: string]: number;
}

export interface UseMediaValue {
	[key: string]: boolean;
}

const BREAKPOINTS = {
	large: 600,
};

export default function useMedia(
	config: UseMediaConfig = BREAKPOINTS
): UseMediaValue {
	const { width } = React.useContext(viewportContext);
	const value: UseMediaValue = {};
	for (const breakpoint in config) {
		value[breakpoint] = !!width && width >= config[breakpoint];
	}
	return value;
}
