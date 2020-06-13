# HentaiHaven API

This package access hentaihaven's undocumented API

**NOTE: due to hentaihaven's rather _dead_ status, this package may not remain supported for long**

## Usage

```ts
const { HentaiHavenAPI } = require('hentaihaven');

const api = new HentaiHavenAPI();

const search = await api.search('query');

const video = search.results[0];
const video_image = await api.get_video_image(video);
const video_series = await api.get_video_series(video);

```