import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="kr">
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<meta property="og:title" content="씨어게인" />
					<meta property="og:image" content="https://seaagainuploads.s3.ap-northeast-2.amazonaws.com/avatars/seaagain_logo.png-1661275533657" />
					<meta property="og:description" content="안전하고 인기있는 해수욕장 찾고 싶을때는 씨어게인" />
					<meta property="og:url" content="https://sea-again.vercel.app/" />
					<meta name="description" content="안전하고 인기있는 해수욕장 찾고 싶을때는 씨어게인" />
					<meta name="keywords" content="해수욕장 해변가 beach 씨어게인" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/jejuhallasan.css" type="text/css" />

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