
window.onload = function(e) {

    // initialisation:
    var onPlay = [false],  // this one is useless now
      pCount = 0;
      playlistUrls = [
        "/sound/sin.wav",
        // "/sound/saw.wav",
        "/sound/sqr.wav",
        "/sound/tri.wav",


        ], // audio list
      howlerBank = []
      loop = false
      wholeTrack = false
      currentTime = false
      crossFadeStartPoints = []
      startPointPercentage = 0.4;
      nextIndex = howlerBank[pCount + 1];
      currentTime = 0;
      // // get how long the track is
      // let currentTrackDuration = 0;
      // //fade start at this time in seconds
      // let timeAfterStartPoint = currentTrackDuration * (1 - startPointPercentage) // 10s * 0.1 = 9%
      // //rest of the track that doesn't fade in seconds
      // let timeBeforeStartPoint = currentTrackDuration - timeAfterStartPoint
      // //remove the first
      // let progressAfterStartPointInDec = (currentTime - timeBeforeStartPoint) / timeAfterStartPoint;


// DEFINITIONS
    // build up howlerBank:
    playlistUrls.forEach(function(current, i) {
      howlerBank.push(new Howl({
        src: [playlistUrls[i]],
        onplay: () => {
          currentTrackDuration = howlerBank[pCount].duration();
        },
        onend: () => {
          pCount = pCount + 1
        },
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

    function crossFade(percent, pIndex) {
      var newVal = Math.cos(percent * 0.5*Math.PI)
      // console.log(newVal);
      console.log(pIndex, 'minus:', newVal, 'percent:', percent)
      howlerBank[pIndex].volume(newVal)
    }

    // function inc(percent) {
    //   var plus = Math.cos(percent * 0.5*Math.PI);
    //   // howlerBank[pCount].play();
    //   howlerBank[pCount+1].volume(0);
    //   howlerBank[pCount+1].volume(plus);
    // }




//EXPRESSIONS
    // initiate the whole :
      howlerBank[pCount].play();
        // playing i+1 audio (= chaining audio files)
        // var onEnd = function(e) {
        //   // if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
        //   // pCount = pCount + 1;
        //   howlerBank[pCount].play();
        // };

        // console.log(howlerBank[pCount])

        setInterval(() => {
          console.log(howlerBank.map(item => item.playing()))
          // console.log(pCount, howlerBank.length)

          if (pCount < howlerBank.length -1) {


          // get current track time
          const currentTime = howlerBank[pCount].seek();
          // get how long the track is
          currentTrackDuration = howlerBank[pCount].duration()
          //fade start at this time in seconds
          timeAfterStartPoint = currentTrackDuration * (1 - startPointPercentage) // 10s * 0.1 = 9%
          //rest of the track that doesn't fade in seconds
          timeBeforeStartPoint = currentTrackDuration - timeAfterStartPoint      // 10s
          //remove the first
          console.log(currentTime, timeBeforeStartPoint, timeAfterStartPoint);
          progressAfterStartPointInDec = (currentTime - timeBeforeStartPoint) / timeAfterStartPoint
          // console.log(timeBeforeStartPoint, timeAfterStartPoint)
          // whats the current time and where it's start point?
          console.log(currentTime, timeBeforeStartPoint)
          // start the next track when current track is over its fade start point
          if ( currentTime > timeBeforeStartPoint ) {
              // play next to next track
              if (!howlerBank[pCount + 1].playing()) {

                // console.log(howlerBank[pCount + 1]);
                howlerBank[pCount + 1].play();
                howlerBank[pCount + 1].volume(0);

              }
              // if next track is playing console log the current position of that track
              // if (howlerBank[0].playing()){
              //   console.log(howlerBank[1].volume())
              // }

              crossFade(progressAfterStartPointInDec, pCount);
              crossFade(1 - progressAfterStartPointInDec, pCount + 1);
            }

          }
        }, 500);



}
