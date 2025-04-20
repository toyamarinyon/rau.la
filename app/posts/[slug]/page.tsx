import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode as getDraftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const draftMode = await getDraftMode();
	return (
		<Pump
			queries={[
				{
					posts: {
						__args: {
							first: 1,
							filter: {
								_slug: {
									eq: slug,
								},
							},
						},
						items: {
							_slug: true,
							_title: true,
							modifiedAt: true,
							icon: {
								width: true,
								height: true,
								url: true,
							},
							body: {
								json: {
									content: true,
								},
							},
						},
					},
				},
			]}
			draft={draftMode.isEnabled}
			next={{ revalidate: 30 }}
		>
			{async ([data]) => {
				"use server";

				const post = data.posts.items[0];

				if (post === undefined) {
					return notFound();
				}
				return (
					<div className="container mx-auto">
						<div className="max-w-[940px] pl-30">
							<p className="text-gray-500 mb-2">
								{new Date(post.modifiedAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>

							<h1 className="font-serif text-5xl/12 mb-6 tracking-wide relative">
								{post._title}

								<Image
									src={post.icon.url}
									width={post.icon.width}
									height={post.icon.height}
									alt="blog icon"
									className="size-20 absolute top-0 -left-24"
								/>
							</h1>
							<div className="markdown mb-36">
								<RichText>{post.body.json.content}</RichText>
							</div>
						</div>
					</div>
				);
			}}
		</Pump>
	);
}
