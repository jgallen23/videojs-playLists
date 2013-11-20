#videojs-playlists

Sexy Playlists for VideoJS.

##Installation

###Bower

`bower install videojs-playlists`

###Manual Download

- [Development]()
- [Production]()

##Usage

### Initialize playList

In order to initialize `playList` you need to pass an array of videos with this structure:

```js
videos = [
  {
    src : [
      'http://stream.flowplayer.org/bauhaus/624x260.webm',
      'http://stream.flowplayer.org/bauhaus/624x260.mp4',
      'http://stream.flowplayer.org/bauhaus/624x260.ogv'
    ],
    poster : '',
    title : 'Whales'
  },
  {
    src : [
      'http://vjs.zencdn.net/v/oceans.mp4',
      'http://vjs.zencdn.net/v/oceans.webm'
    ],
    poster : 'http://www.videojs.com/img/poster.jpg',
    title : 'Ocean'
  }
];
```

Now, when videos plays they automatically jump to the next one. You also gain a couple of methods

### Jump to video

Use `player.playList(index)` to jump to a video into the playlist.

### next

VideoJS receives a `next()` function which put in place the next video.

### prev

VideoJS receives a `prev()` function which put in place the previous video.

### Events

<table border="0" cellspacing="5" cellpadding="5">
  <tr><th>Name</th><th>Description</th></tr>
  <tr><td>next</td><td>Fired when you use the `next()` function or when one video finish and the next starts.</td></tr>
  <tr><td>prev</td><td>Fired when you use the `prev()` function.</td></tr>
  <tr><td>lastVideoEnded</td><td>Fired when the playlist has finished.</td></tr>
</table>

A [demo](http://belelros.github.io/videojs-playLists/) is now available to showcase what you can create with this plugin.

##Pending

Pass video parameter to `next` and `prev` events. That should need to rewrite the trigger function from videojs since
doesn't allow passing events.

As a workaround, the `player.pl.current` is updated with the actual index and `player.pl.currentVideo` contains the
video object.

##Development

###Requirements

- node and npm
- bower `npm install -g bower`
- grunt `npm install -g grunt-cli`

###Setup

- `npm install`
- `bower install`

###Run

`grunt dev`

or for just running tests on file changes:

`grunt ci`

###Tests

`grunt mocha`