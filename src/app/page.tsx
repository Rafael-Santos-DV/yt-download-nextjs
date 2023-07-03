"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  async function download() {
    try {
      const response = await fetch(`api/download?url=${url}`);

      if (!response.ok) {
        throw new Error("Erro ao baixar o arquivo.");
      }

      const videoInfo = await (await fetch(`api/video-info?url=${url}`)).json();

      const totalSize = videoInfo.contentLength;

      let downloadedSize = 0;

      const body = response.body as ReadableStream<Uint8Array>;

      const reader = body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        downloadedSize += value.length;

        if (totalSize) {
          const progress = Math.round((downloadedSize / totalSize) * 100);
          setProgress(progress);
        }
      }

      const contentDisposition = response.headers.get("Content-Disposition");

      const filename =
        contentDisposition?.split("; ")[1].split("=")[1].replace(/"/g, "") ||
        "video.mp4";

      const blob = new Blob(chunks);

      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.log("deu erro!! recarregue a página");
      setProgress(0);
      setUrl("");
    }
  }

  return (
    <main className="flex items-center h-full justify-center flex-col gap-2">
      <h1 className="text-slate-900 font-sans">
        Baixe videos do youtube gratuitamente
      </h1>

      <div className="w-full max-w-xl bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex w-full max-w-xl gap-2">
        <input
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
            setProgress(0);
          }}
          type="text"
          className="flex-1 outline-none p-2 rounded-md text-slate-900 font-sans"
          placeholder="URL DO VÍDEO"
        />
        <button
          onClick={download}
          className="flex items-center bg-black text-white text-sm p-2 rounded-md hover:text-cyan-200"
        >
          Download
        </button>
      </div>
    </main>
  );
}
