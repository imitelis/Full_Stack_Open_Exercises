export function urlConverter(url) {
    const watchURLPattern = /https:\/\/www\.youtube\.com\/watch\?v=(\w+)/;
    const shortURLPattern = /https:\/\/youtu\.be\/(\w+)/;

    if (watchURLPattern.test(url)) {
      const videoID = url.match(watchURLPattern)[1];
      return `https://www.youtube.com/embed/${videoID}`;
    } else if (shortURLPattern.test(url)) {
      const videoID = url.match(shortURLPattern)[1];
      return `https://www.youtube.com/embed/${videoID}`;
    } else {
      return url;
    }
  }