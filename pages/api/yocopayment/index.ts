import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const result = await axios.post(
				'https://online.yoco.com/v1/charges/',
				{
					token: req.body,
					amountInCents: 200,
					currency: 'ZAR',
				},
				{
					headers: {
						'X-Auth-Secret-Key': process.env.YOCO_SECRET_KEY,
					},
				},
			);
			console.log(result);
			res.status(200).json({ status: 'OK' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ status: 'not ok' });
		}
	}
}
