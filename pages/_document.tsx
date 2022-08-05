import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
					<meta property="og:title" content="" />
					<meta property="og:image" content="" />
					<meta property="og:description" content="" />
					<meta property="og:url" content="//" />
					<meta name="description" content="" />
					<meta name="keywords" content="" />
					<link rel="stylesheet" href="https:fonts.googleapis.com/earlyaccess/jejuhallasan.css" type="text/css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;