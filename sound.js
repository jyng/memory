
window.onload = function(e) {

    // initialisation:
    var onPlay = [false],  // this one is useless now
      pCount = 0;
      playlistUrls = [
        "/sound/2p.mp3",
        "/sound/3m.mp3",
        "/sound/4dd.ogg",
        ], // audio list
      howlerBank = []
      loop = false
      wholeTrack = false
      currentTime = false
      crossFadeStartPoints = [];


// DEFINITIONS
    // build up howlerBank:
    playlistUrls.forEach(function(current, i) {
      howlerBank.push(new Howl({
        src: [playlistUrls[i]],
        onend: onEnd,
        buffer: true,
        }))
    });
    setTimeout(() => {
      wholeTrack = howlerBank.map(howlerObject => {
        return howlerObject.duration()
      })
      currentTime = howlerBank[pCount].seek();
    }, 1000)

    //Current percent
    // console.log("crossFadeStartPoints =",crossFadeStartPoints);
    // Equal-power crossfading curve:

    function dec(percent) {
      var minus = 0.4-(Math.cos(percent * 0.5*Math.PI));
      howlerBank[pCount].volume(minus);
    }

    function inc(percent) {
      var plus = Math.cos(percent * 0.5*Math.PI);
      howlerBank[pCount].volume(plus);
    }




//EXPRESSIONS
    // initiate the whole :
        howlerBank[pCount].play();
          // playing i+1 audio (= chaining audio files)
          var onEnd = function(e) {
            // if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
            pCount = pCount + 1;
            howlerBank[pCount].play();
          };

        console.log(howlerBank[pCount])

        setInterval(() => {
          const current = howlerBank[pCount].seek();
          trackPercent = (wholeTrack[pCount] - current)/wholeTrack[pCount] ;
          console.log()
          console.log(trackPercent)

          if ( trackPercent < .4) {
            // crossFadeStartPoints[pCount]
            dec(trackPercent);
            // howlerBank[pCount].play();
            // howlerBank[pCount].volume(0);
            // inc(trackPercent)
          }
          //if trackPercent is greater than 90% than add a pCount, start it at volume 0, and then increase
          if (trackPercent ) {

          }

          console.log()
          ;}, 500);



}
