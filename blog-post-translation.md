# Starting a New Blog Experience with Basehub: The Appeal of an API First Document Platform

Over the years, I've written blogs on various platforms and created my own websites. I've been impressed by Medium's minimal and refined look and feel, amazed by how Next.js can integrate static content with interactive demos to create rich websites, and moved by Astro's development experience that's honed for specific use cases.

The time spent trying new platforms and tools may not directly produce results, but I think it's wonderful time that allows you to experience various inspirations.

And now, I'm using Basehub to write this article and create a new personal website. Yes, I'm excited again.

## Were You Satisfied with Markdown + Git?

Many engineers have created workflows where Markdown is managed with Git, and the website updates when you git push. I was one of them. I've tried various tools, from Jekyll in the old days to Next.js and Astro later on.

Editing markdown in your favorite editor (my current favorite is Zed) and publishing to the world with git push was indeed a wonderful experience. Code and content are managed in the same repository with version control. It seems like an ideal environment for engineers.

However, to be honest, there were some hassles. One of them was handling images and videos.

For example, when writing a blog post introducing a new framework and taking a screenshot to show how great type safety is, I always thought:

"Where should I place this image? /public/images/capture001.jpeg, or /public/blogs, or colocation/blogs/... I don't want to think about this."

"Paste the file path into the editor... ah, copying the file path is tedious."

Also, while having website design, structure, and data coexisting in the repository seemed reasonable, I wondered if there wasn't a better approach.

The real-time preview of markdown in editors is quite capable, but it differs from the actual appearance, and you can't tell the rhythm and feel when reading. I had this ideal where I could write text with a Medium (or Notion) like writing experience while retrieving necessary data via API and customizing the look and feel to my liking.

## Basehub: API First Document Platform

Basehub is what realized this ideal. Write like you would in Notion, and retrieve data via API. "Wouldn't it be nice if we could do this?" has actually been realized.

I think a prototype of an application with such features could be created in half a day with Vibe Coding. Or it could be made by hacking Notion. However, to actually use it requires meticulous implementation and adjustments, which demand patience. Basehub has accomplished that.

The appeal of Basehub isn't just providing a Notion-like editor and API. It's packed with features that deeply understand and solve the concerns of blog writers, especially engineers.

## Notion-like, and a Data Structure More Optimized for "Documents"

Notion is a great product that's highly flexible and intuitive to use, but when trying to use it for specific use cases like "content management for a personal website," that flexibility can become a hindrance. Of course, you can create workflows by investing time, but there's no need to go that far to use Notion.

Basehub offers Notion-like UI and operations, but it comes with data structures and constraints that are optimized for the "document" use case/domain from the start.

For the first couple of hours using Basehub, I was a bit confused by the operations, but when I operated based on intuition thinking "This is probably how it works," I was mostly correct, which made me happy to realize that the developers and I likely share similar mental models. Or perhaps the developers have been observing users like me as role models.

## I Love the Components the Platform Provides

It's common to struggle with how to handle data retrieved using a platform's API. Sure, the API can be quickly executed and data can be retrieved, but without a way to ensure type safety, we often end up writing Zod schemas as a workaround.

In such times, having components provided by the platform allows you to trust in that black box without delving too deep. You can accept that "this is within the platform's responsibility."

Also, even if the implementation is a black box, being able to customize the behavior and look and feel makes me very happy. As a fellow engineer, I feel a sense of respect thinking, "The developers of this product have thought this far."

Below is the source code for this page (blog page):

```typescript
import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode as getDraftMode } from "next/headers";
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
						<div className="max-w-[940px]">
							<p className="text-gray-500 mb-2">
								{new Date(post.modifiedAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>
							<h1 className="font-serif text-5xl/12 mb-6 tracking-wide">
								{post._title}
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
```

Right now, it's simple because I'm only using minimal components, but it seems like various customizations are possible from here. I'm particularly looking forward to the CodeBlock component. When I previously created a blog with Astro, I struggled a lot with handling code blocks, but from reading the documentation, it seems like those struggles have been addressed.

https://docs.basehub.com/api-reference/javascript-sdk/react/code-block-component

## Encountering Exciting Tools Makes You Creative

If we compare features, similar ones surely exist, and there might be more convenient ones. However, tools that excite you when you use them—with their look and feel, data structures, UI interactions—make you think "I want to create something with this!" beyond just features. Upon discovering Basehub, I thought, "I'm going to restart my personal blog that I've put on hold for about 2 years!"

Also, as an engineer developing products, I was reminded that carefully implementing everything from concept features to detailed look and feel is what attracts users.

Tools that evoke such feelings are rare, so I want to cherish this and create various content going forward.