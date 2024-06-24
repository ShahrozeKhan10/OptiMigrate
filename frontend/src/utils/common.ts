/* eslint-disable @typescript-eslint/no-explicit-any */

export const isUndefined = (value: any) => value === undefined;
export const isDefined = (value: any) => value !== undefined;
export const isNull = (value: any) => value === null;
export const getEmbedCode = (url: string | string[] | undefined) => {
  if (!url) {
    return '';
  }
  const newUrl = Array.isArray(url) ? url[0] : url;

  if (newUrl && newUrl.includes('/embed')) {
    // If the URL already contains '/embed', remove anything after '/embed/'
    const modifiedUrl = newUrl.replace(/\/embed\/.*$/, '/embed/');
    return modifiedUrl;
  }

  if (newUrl && newUrl.includes('/watch?v=')) {
    // If it's a YouTube watch URL, extract the video ID and construct the embed URL
    const videoIdMatch = newUrl.match(/v=([\w-]+)/);
    if (videoIdMatch) {
      // const videoId = videoIdMatch[1];
      const videoId = Array.isArray(videoIdMatch) ? videoIdMatch[1] : videoIdMatch;
      const embedURL = `https://www.youtube.com/embed/${videoId}`;
      return embedURL;
    }
  }

  // If it's neither an embed URL nor a watch URL, return it as is
  return newUrl;
};

export const formatFileSize = (bytes: number) => {
  const sufixes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
};
