import { basehub } from "basehub";
import Link from "next/link";

export default async function () {
	const { posts } = await basehub().query({
		posts: {
			items: {
				_id: true,
				_title: true,
				_slug: true,
				modifiedAt: true,
				body: {
					plainText: true,
				},
			},
		},
	});
	return (
		<div className="container mx-auto px-4 md:px-0">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.items.map((post) => (
					<Link
						href={`/posts/${post._slug}`}
						className="bg-gradient-to-b from-gray-900 to-gray-950/10 border border-gray-800 rounded-xs text-gray-500 p-6 shadow space-y-3 cursor-pointer transition-colors hover:border-gray-700"
						key={post._id}
					>
						<h2 className="text-2xl/7 tracking-wider font-[700] font-serif text-gray-200">
							{post._title}
						</h2>
						<div className="space-y-1.5">
							<p className="text-sm/5 line-clamp-4">{post.body.plainText}</p>
							<p className="font-mono text-xs text-gray-600">
								Modified on{" "}
								{new Date(post.modifiedAt).toLocaleDateString("en-US", {
									month: "long",
									day: "numeric",
									year: "numeric",
								})}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
