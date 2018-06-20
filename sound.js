// stage1= [];
//
//
// var id1 = new Howl({
//   src: ['sound/getting-off-bus.mp3'],
// });
//
// var id2 = new Howl({
//   src: ['sound/higg.mp3'],
// });
//
// var id3 = new Howl({
//   src: ['sound/a.mp3'],
// });
//
// var id4 = new Howl({
//   src: ['sound/b.mp3'],
// });
//
// var id5 = new Howl({
//   src: ['sound/c.mp3'],
// });
//
// var id6 = new Howl({
//   src: ['sound/d.mp3'],
// });

window.onload = function(e) {
    // initialisation:
    var onPlay = [false],  // this one is useless now
      pCount = 0;
      playlistUrls = [
        "/sound/a.mp3",
        "/sound/b.mp3",
        "/sound/c.mp3",
        "/sound/home.mp3"
        ], // audio list
      howlerBank = []
      loop = true;

    // playing i+1 audio (= chaining audio files)
    var onEnd = function(e) {
      if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
      else { pCount = pCount + 1; }
      howlerBank[pCount].play();
    };

    // build up howlerBank:
    playlistUrls.forEach(function(current, i) {
      howlerBank.push(new Howl({ src: [playlistUrls[i]], onend: onEnd, buffer: true }))
    });

    // initiate the whole :
        howlerBank[0].play();
}
