const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false}) // returns a promise
    .then(localMediaStream => {
      // video.src = window.URL.createObjectURL(localMediaStream); is deprecated in Chrome
      video.srcObject = localMediaStream;
      video.play();
    })
     .catch(err => {
       console.error("OH NO!!!", err);
     });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take data out of canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt = "Handsome man" />`;
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener("canplay", paintToCanvas);

getVideo();
