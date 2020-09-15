import { FunctionComponent, memo } from "react";

import Button from "@app/components/Button";
import Flex from "@app/components/Flex";
import { UploadDocument } from "@app/lib/interfaces";
import useMedia from "@app/lib/useMedia";
import { formatBytes } from "@app/lib/util";

import css from "./index.module.css";

export interface DocumentProps extends UploadDocument {
	onDelete: () => void;
}

const Document: FunctionComponent<DocumentProps> = memo((props) => {
	const size = useMedia();

	return (
		<Flex
			width={size.large ? "33.33%" : "100%"}
			className={`${css.root} ${!size.large ? css.small : ""}`}
		>
			<Flex
				alignItems="stretch"
				className={css.card}
				direction="column"
				grow={1}
			>
				<Flex>
					<div className={css.filename}>{props.filename}</div>
				</Flex>
				<Flex alignItems="center">
					<Flex grow={1}>{formatBytes(props.byteSize)}</Flex>
					<Button size="small" onClick={props.onDelete}>
						delete
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
});

export default Document;
