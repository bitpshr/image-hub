import { FunctionComponent, SyntheticEvent, memo } from "react";

import Button from "@app/components/Button";
import Flex from "@app/components/Flex";
import useMedia from "@app/lib/useMedia";

import css from "./index.module.css";

export interface SearchBarProps {
	onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
	onUpload: (event: SyntheticEvent<HTMLInputElement>) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = memo((props) => {
	const size = useMedia();

	return (
		<Flex
			alignItems={size.large ? "flex-start" : "stretch"}
			className={`${css.control} ${!size.large ? css.small : ""}`}
			direction={size.large ? "row" : "column"}
		>
			<Flex grow={1}>
				<input
					autoCorrect="off"
					className={css.search}
					onChange={props.onChange}
					placeholder="Search documents..."
					spellCheck={false}
					type="search"
				/>
			</Flex>
			<div className={css.uploadControl}>
				<input
					accept="image/x-png,image/jpeg"
					id="upload"
					onChange={props.onUpload}
					type="file"
				/>
				<Button>upload</Button>
			</div>
		</Flex>
	);
});

export default SearchBar;
