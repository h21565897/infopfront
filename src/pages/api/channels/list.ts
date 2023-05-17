/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  let fetchres = await fetch(
    `${process.env.BACKEND_URL}/account/list?creator=${session?.user_creator}`,
    {
      method: "GET",
    }
  );
  let data = await fetchres.json();
  if (data.error) {
    return res.status(404).json({ error: "not found" });
  }
  if (data.data) {
    return res.status(200).json(data.data);
  }
  return res.status(500).json({ error: "invalid creator" });
}
