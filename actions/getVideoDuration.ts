export async function getVideoDuration(videoUrl: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.preload = "metadata";
  
      video.onloadedmetadata = () => {
        resolve(video.duration);
        video.remove();
      };
  
      video.onerror = () => {
        reject(new Error("No se pudo cargar el video"));
      };
    });
  }