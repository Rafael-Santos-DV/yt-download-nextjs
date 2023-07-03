import { NextApiRequest, NextApiResponse } from "next";
import ytdl, { videoFormat } from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;

  const videoInfo = await ytdl.getInfo(url);
  const videoFormat = ytdl.chooseFormat(videoInfo.formats, {
    quality: "highest",
  });

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${videoInfo.videoDetails.title}.mp4"`
  );

  res.setHeader("Content-Length", +videoFormat.contentLength);

  ytdl(url, {
    format: videoFormat,
  }).pipe(res);

  return res.status(200);
}
