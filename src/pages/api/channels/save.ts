import type { NextApiRequest, NextApiResponse } from "next";
export interface accountSaveParamsType {
  name: string;
  sendChannel: number;
  accountConfig: string;
  creator: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params: accountSaveParamsType = req.body;
  const result = await fetch(`${process.env.BACKEND_URL}/account/save`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  if (data.error) {
    return res.status(500).json({ error: data.error });
  }
  res.status(200).json({ msg: "success" });
}
