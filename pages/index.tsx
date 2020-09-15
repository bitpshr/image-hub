import Head from "next/head";
import { FunctionComponent, memo } from "react";

import Dashboard from "@app/components/Dashboard";

const Home: FunctionComponent = memo(() => (
	<>
		<Head>
			<title>Kraken | Image Hub</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Dashboard />
	</>
));

export default Home;
