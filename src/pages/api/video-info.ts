import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videoUrl = req.query.url as string;
  const videoInfo = await ytdl.getInfo(videoUrl);
  const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
    quality: "highest",
  });

  return res.json(videoFormat);
}
