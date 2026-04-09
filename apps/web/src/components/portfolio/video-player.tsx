'use client';

interface VideoPlayerProps {
  url: string;
}

function getEmbedUrl(url: string): { type: 'embed' | 'direct'; src: string } {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (youtubeMatch) {
    return { type: 'embed', src: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return { type: 'embed', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Direct video (GCS or other)
  return { type: 'direct', src: url };
}

export function VideoPlayer({ url }: VideoPlayerProps): JSX.Element {
  const { type, src } = getEmbedUrl(url);

  if (type === 'embed') {
    return (
      <div className="aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          src={src}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="시연 동영상"
        />
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-black">
      <video
        src={src}
        controls
        className="w-full h-full"
        preload="metadata"
      >
        <track kind="captions" />
        브라우저가 동영상 재생을 지원하지 않습니다.
      </video>
    </div>
  );
}
