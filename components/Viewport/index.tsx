import {
	FunctionComponent,
	createContext,
	memo,
	useCallback,
	useEffect,
	useState,
} from "react";

export const viewportContext = createContext<{
	height?: number;
	width?: number;
}>({});

const Viewport: FunctionComponent = memo((props) => {
	const [width, setWidth] = useState(Infinity);
	const [height, setHeight] = useState(Infinity);

	const handleWindowResize = useCallback(() => {
		if (!process.browser) return;
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (!process.browser) return;
		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();
		return () => window.removeEventListener("resize", handleWindowResize);
	}, [handleWindowResize]);

	return (
		<viewportContext.Provider value={{ width, height }}>
			{props.children}
		</viewportContext.Provider>
	);
});

export default Viewport;
