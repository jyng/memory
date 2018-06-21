
window.onload = function(e) {

    // initialisation:
    var onPlay = [false],  // this one is useless now
      pCount = 0;
      playlistUrls = [
        "/sound/4dd.ogg",
        "/sound/2p.mp3",
        "/sound/3m.mp3"
        ], // audio list
      howlerBank = []
      loop = false
      wholeTrack = false
      currentTime = false

      crossFadeStartPoints = [];

      // playing i+1 audio (= chaining audio files)
      var onEnd = function(e) {
        // if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
        pCount = pCount + 1;
        howlerBank[pCount].play();
      };
      // crossFadeStartPoints = wholeTrack * 0.9
      setTimeout(() => {
        wholeTrack = howlerBank.map(howlerObject => {
          return howlerObject.duration()
        })
        currentTime = howlerBank[pCount].seek();
      }, 1000)






// DEFINITIONS
    // build up howlerBank:
    playlistUrls.forEach(function(current, i) {
      howlerBank.push(new Howl({
        src: [playlistUrls[i]],
        onend: onEnd,
        buffer: true,
        }))
    });

    //Current percent
    // console.log("crossFadeStartPoints =",crossFadeStartPoints);
    // Equal-power crossfading curve:
    function equalPowerCrossfade(trackPercent) {
    var gain1 = Math.cos(percent * 0.5*Math.PI);
    var gain2 = Math.cos((1.0 - percent) * 0.5*Math.PI);
    this.ctl1.gainNode.gain.value = gain1;
    this.ctl2.gainNode.gain.value = gain2;

    }




    // initiate the whole :
        howlerBank[0].play();

        setInterval(() => {
          const current = howlerBank[pCount].seek();
          trackPercent = (wholeTrack[pCount] - currentTime)/(wholeTrack[pCount] * 0.9);

          if ( current > crossFadeStartPoints[pCount]) {
            crossFadeStartPoints[pCount]
            equalPowerCrossfade(trackPercent);
          }
          console.log(trackPercent)
          ;}, 50);



}
