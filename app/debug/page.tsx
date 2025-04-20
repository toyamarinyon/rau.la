import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";

export default async function () {
	return (
		<Pump
			queries={[
				{
					posts: {
						items: {
							_id: true,
							_title: true,
							modifiedAt: true,
						},
					},
				},
			]}
			draft={(await draftMode()).isEnabled}
			next={{ revalidate: 30 }}
		>
			{async ([data]) => {
				"use server";
				return (
					<pre className="text-white">
						<code>{JSON.stringify(data, null, 2)}</code>
					</pre>
				);
			}}
		</Pump>
	);
}
