
window.onload = function(e) {
      //Track Library
      thisTrackNum = 0;
      playlistUrls = [
        //1//
        ["/sound/2p.mp3",
        "/sound/lobby.wav",
        "/sound/airport.mp3",
        "/sound/3m.mp3",
        "/sound/party.wav",
        "/sound/school.mp3",
        "/sound/bus-begin.wav"],
        //2//
        ["/sound/bus-on.wav",
        "/sound/plow.mp3",
        "/sound/21.mp3",
        "/sound/55.mp3",
        "/sound/office.mp3",
        "/sound/park.wav"],
        //3//
        ["/sound/21.mp3",
        "/sound/3bus.mp3",
        "/sound/3m.mp3",
        "/sound/3bus2.mp3",
        "/sound/3bus3.mp3",
        "/sound/plow.mp3"],
        //4//
        ["/sound/4d.mp3",
        "/sound/4dd.ogg",
        "/sound/song.mp3",
        "/sound/faye.mp3",
        "/sound/4dd.ogg",
        "/sound/waves.mp3"],
      ]
      currentTime = false
      crossFadeStartPoints = []
      startPointPercentage = 0.7
      currentTrackDuration = 0
      timeAfterStartPoint = 0
      timeBeforeStartPoint = 0
      currentTime = 0;
      // var sensor = 0;
      var r;



// DEFINITIONS
    // build up hb:
    // const hb = playlistUrls.map((track, index) => {
    //   return new Howl({
    //     src: [playlistUrls[index]],
    //     onplay: () => currentTrackDuration = hb[thisTrackNum].duration(),
    //     onend: () => updateOnTrackEnd() ,
    //     buffer: true,
    //   })
    // })



    //Randomizer array
    const randMap = (subArray) => {
      const randomIndex = randInt(subArray.length - 1)
      const randomSelection = subArray[randomIndex]
      return randomSelection
    }
    const randInt = (maximumNumber) => {
      return Math.floor(Math.random() * maximumNumber)
    }
    const randomItems = playlistUrls.map((subArray) => {
      return randMap(subArray)
    })
    //add random items into howler bank
    const hb = randomItems.map((track, index) => {
      return new Howl({
        src: randomItems[index],
        onplay: () => currentTrackDuration = hb[thisTrackNum].duration(),
        onend: () => updateOnTrackEnd() ,
        buffer: true,
        })
    });
      console.log(hb);
    // Wait for tracks to load
    var socket = io.connect(window.location.origin);

    socket.on('data',function(data) {
        r = data;
    });
    console.log(r);


    // const sensor = () => {
    //
    //
    // }
    if (r > 2){
    setTimeout(() => {
      updateTrackCrossfade()
      // currentTime = hb[thisTrackNum].seek();
      hb[thisTrackNum].play();

      setInterval(() => {
        // console.log(hb.map(item => item.playing()))

        //
      if (isInBounds(thisTrackNum, hb)) {
        currentTime = hb[thisTrackNum].seek();
        progressAfterStartPointInDec = (currentTime - timeBeforeStartPoint) / timeAfterStartPoint

        console.log('vol B:', hb[thisTrackNum+1].volume(), 'vol A:', hb[thisTrackNum].volume())

        if ( currentTime > timeBeforeStartPoint ) {

          if (!hb[thisTrackNum + 1].playing()) {

            hb[thisTrackNum + 1].volume(0);
            hb[thisTrackNum + 1].play();
          }

          crossFade(progressAfterStartPointInDec, thisTrackNum)
          crossFade(1 - progressAfterStartPointInDec, thisTrackNum + 1);


        }
      }


      }, 50);

    }, 1000)
  }

  else {

  }




    const updateTrackCrossfade = () => {
      currentTrackDuration = hb[thisTrackNum].duration()
      timeAfterStartPoint = currentTrackDuration * (1 - startPointPercentage) // 10s * 0.1 = 9%
      timeBeforeStartPoint = currentTrackDuration - timeAfterStartPoint
    }

    const isInBounds = (idx, arr) => idx < arr.length - 1




// FUNCTIONS

    const crossFade = (percent, pIndex) => {
      var newVal = Math.cos(percent * 0.5*Math.PI)
      // console.log(pIndex, 'minus:', newVal, 'percent:', percent)
      hb[pIndex].volume(newVal)
    }


    const updateOnTrackEnd = () => {
      // Track num has been updated
      if (isInBounds(thisTrackNum, hb)) {
        thisTrackNum = thisTrackNum + 1
        updateTrackCrossfade()
      } else {
        console.log("i'm done")
      }
      //
      // hb[thisTrackNum].volume(0);
      // hb[thisTrackNum].play();
    }

}