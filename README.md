# yt-streamer
an nodejs YouTube downloader


# usage
```
const { DownloadMusic, DownloadVideo} = require('yt-streamer');
const fs = require('fs');

(async () => {
  const aud = await DownloadMusic(videoId);
  const aud = fs.readFileSync(aud);
  //Video (default: 720p)
  const vi = await DownloadVideo(videoId, quality);
  const vid = fs.readFileSync(vid);
})();

thats goas to video.as.well

```

