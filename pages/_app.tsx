import "@app/lib/app.css";

import { AppProps } from "next/app";
import { memo } from "react";

import Viewport from "@app/components/Viewport";

const MyApp = memo(({ Component, pageProps }: AppProps) => (
	<Viewport>
		<Component {...pageProps} />
	</Viewport>
));

export default MyApp;
