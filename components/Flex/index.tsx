import { CSSProperties, FunctionComponent, memo } from "react";

export interface FlexProps {
	alignContent?: CSSProperties["alignContent"];
	alignItems?: CSSProperties["alignItems"];
	alignSelf?: CSSProperties["alignSelf"];
	basis?: CSSProperties["flexBasis"];
	className?: string;
	direction?: CSSProperties["flexDirection"];
	display?: CSSProperties["display"];
	flex?: CSSProperties["flex"];
	flow?: CSSProperties["flexFlow"];
	grow?: CSSProperties["flexGrow"];
	justifyContent?: CSSProperties["justifyContent"];
	maxWidth?: CSSProperties["maxWidth"];
	minWidth?: CSSProperties["minWidth"];
	order?: CSSProperties["order"];
	shrink?: CSSProperties["flexShrink"];
	width?: CSSProperties["width"];
	wrap?: CSSProperties["flexWrap"];
}

const Flex: FunctionComponent<FlexProps> = memo((props) => (
	<div
		className={props.className}
		style={{
			...(props.alignContent ? { alignContent: props.alignContent } : {}),
			...(props.alignSelf ? { alignSelf: props.alignSelf } : {}),
			...(props.basis ? { flexBasis: props.basis } : {}),
			...(props.flex ? { flex: props.flex } : {}),
			...(props.flow ? { flexFlow: props.flow } : {}),
			...(props.grow ? { flexGrow: props.grow } : {}),
			...(props.justifyContent ? { justifyContent: props.justifyContent } : {}),
			...(props.maxWidth ? { maxWidth: props.maxWidth } : {}),
			...(props.minWidth ? { minWidth: props.minWidth } : {}),
			...(props.order ? { order: props.order } : {}),
			...(props.shrink ? { flexShrink: props.shrink } : {}),
			...(props.width ? { width: props.width } : {}),
			...(props.wrap ? { flexWrap: props.wrap } : {}),
			alignItems: props.alignItems || "flex-start",
			display: props.display || "flex",
			flexDirection: props.direction || "row",
		}}
	>
		{props.children}
	</div>
));

export default Flex;
