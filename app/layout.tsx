import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toolbar } from "basehub/next-toolbar";

const instrumentSerif = Instrument_Serif({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
	title: "laura",
	description: "Traces of a Coder's Hum.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`}
		>
			<body className="bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen text-gray-200">
				<div className="text-gray-100 font-serif text-[26px] flex items-baseline-last container mx-auto h-16 mb-16 px-4 md:px-0">
					<span className="tracking-wide">raula</span>
					<span className="italic text-gray-300 text-[20px] pl-2 leading-relaxed">
						- Traces of a Coder's Hum.
					</span>
				</div>
				{children}
				<Toolbar />
			</body>
		</html>
	);
}
