
suite('videojs-playlists', function() {
  var player, videos, index;
  suiteSetup(function(){
    videos = [
      {
        src : [
          'http://stream.flowplayer.org/bauhaus/624x260.webm',
          'http://stream.flowplayer.org/bauhaus/624x260.mp4',
          'http://stream.flowplayer.org/bauhaus/624x260.ogv'
        ],
        poster : 'http://flowplayer.org/media/img/demos/functional.jpg',
        title : 'Whales'
      },
      {
        src : [
          'http://vjs.zencdn.net/v/oceans.mp4',
          'http://vjs.zencdn.net/v/oceans.webm'
        ],
        poster : 'http://www.videojs.com/img/poster.jpg',
        title : 'Whales'
      }
    ];
    player = videojs("example_video_1");
    player.playList(videos);
  });

  suite('#_init()', function(){
    test('should have same videos stored after videos have been loaded',function(){
      assert.equal(player.pl.videos.length,videos.length);
    });
    test('current video should be 0 after init',function(){
      assert.equal(player.pl.current,0);
    });
  });
  suite('#playList(index)',function(){
    suiteSetup(function(){
      index = 1;
      player.playList(index);
    });
    test('current should change on index passing',function(){
      assert.equal(player.pl.current,index);
    });
    test('poster should match video poster',function(){
      var poster = $('.vjs-poster').css('background-image').replace('url(','').replace(')','');
      assert.equal(poster,videos[index].poster);
    });
  });
  suite('general',function(){
    setup(function(){
      index = 0;
      player.playList(index);
    });
    test('next video should autostart',function(done){
      player.one('loadedmetadata',function(){
        var duration = player.duration();
        player.currentTime(duration);
      });
      player.one('next',function(){
        done();
      });
    });
    test('last video should fire event',function(done){
      player.playList(1);
      player.one('loadedmetadata',function(){
        var duration = player.duration();
        player.currentTime(duration);
      });
      player.one('lastVideoEnded',function(){
        done();
      });
    });
  });
  suite('#next()',function(){
    setup(function(){
      index = 0;
      player.playList(index);
    });
    test('calling next increase the current video index',function(done){
      var currentVideo = player.pl.current;
      player.one('next',function(){
        assert.equal(player.pl.current,currentVideo+1);
        done();
      });
      player.next();
    });
    test('calling next should fire a \'next\' event',function(done){
      player.one('next',function(){
        done();
      });
      player.next();
    });
  });

  suite('#prev()',function(){
    setup(function(){
      index = 1;
      player.playList(index);
    });
    test('calling prev decrease the current video index',function(done){
      var currentVideo = player.pl.current;
      player.one('prev',function(){
        assert.equal(player.pl.current,currentVideo-1);
        done();
      });
      player.prev();
    });
    test('calling prev should fire a \'prev\' event',function(done){
      player.one('prev',function(){
        done();
      });
      player.prev();
    });
  });
});
