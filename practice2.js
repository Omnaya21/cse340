const getPlaylist = async () => {
    try {
        console.log("Loading playlist...");
        const playlist = await spotifyAPI.getPlaylist('top_hits');
        const tracks = await spotifyAPI.getPlaylistTracks(playlist.id);
        return tracks;
    } catch (error) {
        console.log("Couldn't load playlist:", error);
    }
};

// Using it is simple:
getPlaylist().then((tracks) => {
    console.log(`Here are the playlist tracks!\\n${tracks}`);
});