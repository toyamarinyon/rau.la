import { Pump } from "basehub/react-pump";
import Image from "next/image";
import Link from "next/link";

export default async function () {
	return (
		<div className="container mx-auto px-4 md:px-0">
			<div className="border-b pb-4 mb-16">
				<p className="text-3xl">
					<span>Hello! </span>
					<span className="">I'm Satoshi.</span>
				</p>
				<p className="text-xl tracking-wider">
					<span className="">I think, prototype, built </span>
					<span className="font-serif tracking-widest text-3xl italic">
						something new.
					</span>
				</p>
			</div>
			<Pump
				queries={[
					{
						posts: {
							__args: {
								first: 1,
								filter: {
									featured: true,
								},
							},
							items: {
								_id: true,
								_slug: true,
								_title: true,
								outline: true,
								icon: {
									width: true,
									height: true,
									url: true,
								},
							},
						},
					},
				]}
			>
				{async ([data]) => {
					"use server";

					const featuredPost = data.posts.items[0];

					return (
						<div>
							{featuredPost && (
								<Link
									href={`/posts/${featuredPost._slug}`}
									className="text-gray-500 p-6 shadow space-y-3 cursor-pointer transition-colors hover:border-gray-700 flex gap-4"
									key={featuredPost._id}
								>
									<Image
										src={featuredPost.icon.url}
										width={featuredPost.icon.width}
										height={featuredPost.icon.height}
										alt="blog icon"
										className="size-20"
									/>
									<div className="space-y-2">
										<h2 className="text-4xl/8 tracking-wider font-[700] font-serif text-gray-200">
											{featuredPost._title}
										</h2>
										<p className="w-[700px] overflow-x-hidden text-[16px]/5">
											{featuredPost.outline}
										</p>
									</div>
								</Link>
							)}
						</div>
					);
				}}
			</Pump>
		</div>
	);
}
