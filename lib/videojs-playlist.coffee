debug = console.debug

###
A class to contain a playlist and do operations to it.
###
class Playlist

	###
	@param [vjs.Player] player
	@param [Hash] media
	@option options [Boolean] repeatAll (default: false)
	@option options [Integer] startPosition (default: 0)
	###
	constructor: (@player, @name, @media, @options) ->
		debug "constructing Playlist"
		# Handle options
		@repeatAll = @options.repeatAll || false
		@positionInPlaylist = @options.startPosition || 0

		@player.on('ended', @onPlayEnd)

		# Try and convert String sources to { src: source, type: mimeType } objects
		for medium in @media
			medium.sources = medium.sources.map (source)=>
				# Don't attempt to convert objects
				# User might've already given a good source
				return source if typeof source != "string"

				return {
					src: source
					type: @guessMimeType(source)
				}

	guessMimeType: (url)->
		videoTypes = {
			'webm' : 'video/webm'
			'mp4' : 'video/mp4'
			'ogv' : 'video/ogg'
			'mp3' : 'audio/mp3'
		}
		extension = url.split('.').pop()

		videoTypes[extension] || ''

	currentMedium: ->
		@media[@positionInPlaylist]

	# Moves @positionInPlaylist to the next song
	# returns: true move successfull
	pointToNextIndex: ->
		# Loop to the beginning if necessary
		if @positionInPlaylist >= @media.length-1
			if @repeatAll && @media.length > 1
				@positionInPlaylist = -1
			else
				return false
		@positionInPlaylist++
		return true

	# Moves @positionInPlaylist to the previous song
	# returns: true move successfull
	pointToPreviousIndex: ->
		#Loop to the last if necessary
		if @positionInPlaylist <= 0
			if @repeatAll && @media.length > 1
				@positionInPlaylist = @media.length
			else
				return false
		@positionInPlaylist--
		return true

	###
	Attempts to create a new vjs.PosterImage component for the player
	###
	updatePoster: ->
		medium = @currentMedium()
		return if not medium.poster
		debug "Setting posterUrl: #{medium.poster}"
		@player.poster(medium.poster)
		@player.removeChild(@player.posterImage)
		@player.posterImage = @player.addChild("posterImage")
		debug "Added poster"

	onPlayEnd: ->
		if @positionInPlaylist == @media.length -1
			@player.trigger 'lastVideoEnded'
		else
			@player.next()
			@resumeVideo()

	resumeVideo: ->
		debug "resumeVideo"
		player.on 'loadstart',()->
			player.play()

	updatePlayerWithCurrentMedium: ->
		deubg "updateWithCurrentMedium"
		@player.src @currentMedium().sources
		@updatePoster()

playlistPlugin = (options,arg)->
	debug options
	debug arg

	@playlist = new Playlist @, options.name, options.media, options.options
	@playlist.updatePlayerWithCurrentMedium()

	return @

videojs.Player.prototype.next = ->
	debug("player.next")
	if @playlist.pointToNextIndex()
		@playlist.updatePlayerWithCurrentMedium()
		@trigger "next", @playlist.currentMedium()
	else
		debug "Can't move to next medium"

videojs.Player.prototype.prev = ->
	debug("player.prev")
	if @playlist.pointToPreviousIndex()
		@playlist.updatePlayerWithCurrentMedium()
		@trigger "prev", @playlist.currentMedium()
	else
		debug "Can't move to previous medium"

debug "create playlistPlugin"
videojs.plugin "playlistPlugin", playlistPlugin
