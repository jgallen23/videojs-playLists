(function($){
  var videos = [
    {
      src : [
        'http://stream.flowplayer.org/bauhaus/624x260.webm',
        'http://stream.flowplayer.org/bauhaus/624x260.mp4',
        'http://stream.flowplayer.org/bauhaus/624x260.ogv'
      ],
      poster : 'http://flowplayer.org/media/img/demos/minimalist.jpg',
      title : 'Video 1'
    },
    {
      src : [
        'http://stream.flowplayer.org/night3/640x360.webm',
        'http://stream.flowplayer.org/night3/640x360.mp4',
        'http://stream.flowplayer.org/night3/640x360.ogv'
      ],
      poster : 'http://flowplayer.org/media/img/demos/playlist/railway_station.jpg',
      title : 'Video 2'
    },
    {
      src : [
        'http://stream.flowplayer.org/functional/624x260.webm',
        'http://stream.flowplayer.org/functional/624x260.mp4',
        'http://stream.flowplayer.org/functional/624x260.ogv'
      ],
      poster : 'http://flowplayer.org/media/img/demos/functional.jpg',
      title : 'Video 3'
    }
  ];


  var demoModule = {
    init : function(){
      this.els = {};
      this.cacheElements();
      this.initVideo();
      this.createListOfVideos();
      this.bindEvents();
      this.overwriteConsole();
    },
    overwriteConsole : function(){
      console._log = console.log;
      console.log = this.log;
    },
    log : function(string){
      demoModule.els.log.append('<p>' + string + '</p>');
      console._log(string);
    },
    cacheElements : function(){
      this.els.$playlist = $('div.playlist > ul');
      this.els.$next = $('#next');
      this.els.$prev = $('#prev');
      this.els.log = $('div.panels > pre');
    },
    initVideo : function(){
      this.player = videojs('video');
      this.player.playList(videos);
    },
    createListOfVideos : function(){
      var html = '';
      for (var i = 0, len = this.player.pl.videos.length; i < len; i++){
        html += '<li data-videoplaylist="'+ i +'">'+
                  '<span class="number">' + (i + 1) + '</span>'+
                  '<span class="poster"><img src="'+ videos[i].poster +'"></span>' +
                  '<span class="title">'+ videos[i].title +'</span>' +
                '</li>';
      }
      this.els.$playlist.empty().html(html);
      this.updateActiveVideo();
    },
    updateActiveVideo : function(){
      var activeIndex = this.player.pl.current;

      this.els.$playlist.find('li').removeClass('active');
      this.els.$playlist.find('li[data-videoplaylist="' + activeIndex +'"]').addClass('active');
    },
    bindEvents : function(){
      var self = this;
      this.els.$playlist.find('li').on('click', $.proxy(this.selectVideo,this));
      this.els.$next.on('click', $.proxy(this.nextOrPrev,this));
      this.els.$prev.on('click', $.proxy(this.nextOrPrev,this));
      this.player.on('next', function(e){
        console.log('Next video');
        self.updateActiveVideo.apply(self);
      });
      this.player.on('prev', function(e){
        console.log('Previous video');
        self.updateActiveVideo.apply(self);
      });
      this.player.on('lastVideoEnded', function(e){
        console.log('Last video has finished');
      });
    },
    nextOrPrev : function(e){
      var clicked = $(e.target);
      this.player[clicked.attr('id')]();
    },
    selectVideo : function(e){
      var clicked = e.target.nodeName === 'LI' ? $(e.target) : $(e.target).closest('li');

      if (!clicked.hasClass('active')){
        console.log('Selecting video');
        var videoIndex = clicked.data('videoplaylist');
        this.player.playList(videoIndex);
        this.updateActiveVideo();
      }
    }
  };

  demoModule.init();
})(jQuery);