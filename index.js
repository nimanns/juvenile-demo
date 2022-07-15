function preload() {
  sound = loadSound("song.mp3");
}

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT(0.7, 512);
  fft2 = new p5.FFT(0.1, 512);
  sound.amp(0.2);
  frameRate(29);
}

let var1 = 0;
let flag1 = false;

function draw() {
  clear();
  let spectrum = fft.analyze();
  spectrum.forEach((val, ind, arr) => {
    arr[ind] = log(val);
  });
  let spectrum2 = fft2.analyze();
  push();
  translate(width / 2, height / 2);
  strokeWeight(0.2);
  for (let i = 0; i < 512; i++) {
    stroke(color(0, 0, 0));
    let r = spectrum2[i];
    let x = r * cos(i);
    let y = r * sin(i);
    line(0, x, y, x);
    stroke(color(parseInt(fft.getEnergy("bass")), 90, 210));
    line(0, x, y * PI, x * PI);
    // line(i, 0, i + 1, spectrum[i] * 10);
  }

  strokeWeight(3);
  beginShape(POINTS);
  for (let i = 0; i < 360; i++) {
    let r = spectrum[i] * 40;
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
    fill(color(parseInt(fft.getEnergy("bass")), 40, 210));
    stroke(color(parseInt(fft.getEnergy("bass")), 40, 210));
  }
  endShape();

  strokeWeight(2);
  for (let i = 0; i < 360; i++) {
    let r = spectrum[i] * 35;
    let x = r * cos(i);
    let y = r * sin(i);
    let xs = (r / 2) * cos(i) - spectrum[i];
    let ys = (r / 2) * sin(i) - spectrum[i];
    line(x, y, xs, ys);
  }
  beginShape();
  for (let i = 0; i < 512; i++) {
    let r = spectrum[i] * 30;
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  strokeWeight(0.4);
  for (let i = 0; i < 512; i++) {
    // stroke(color(0, 0, 0));
    stroke(color(255, 255, 255));
    let r = spectrum[i] * 10;
    let x = r * cos(i);
    let y = r * sin(i);
    line(0, x, y, x);
    stroke(color(parseInt(fft.getEnergy("bass")), 70, 240));
    line(0, x, y * PI, x * PI);
    // line(i, 0, i + 1, spectrum[i] * 10);
  }
  stroke(color(255, 255, 255));
  strokeWeight(0.8);

  for (let i = 0; i < 360; i++) {
    let r = 80;
    let x = r * cos(i);
    let y = r * sin(i);
    let xs = spectrum[i] * 20 * cos(i);
    let ys = spectrum[i] * 20 * sin(i);
    line(x, y, xs, ys);
  }
  pop();
  stroke(0);
  for (i = 0; i < windowHeight; i += 20) {
    for (j = 0; j < windowWidth; j += 20) {
      let range;
      if (j > windowWidth / 4 && j < windowWidth - windowWidth / 4) {
        if (
          i > windowHeight / 4 &&
          i < windowHeight - windowHeight / 4 &&
          j > windowWidth / 4 &&
          j < windowWidth - windowWidth / 4
        ) {
        } else {
          range = fft2.getEnergy(10, 14);
        }
      } else if (i > windowHeight / 4 && i < windowHeight - windowHeight / 4) {
        range = fft2.getEnergy(6000, 7000);
      } else {
        range = 0;
      }
      const variable = map(range, 0, 100, 0, 5);
      ellipse(j, i, 2 + variable, 2 + variable);

      strokeWeight(0);
      fill(
        color(
          parseInt(random(70, 200)),
          parseInt(random(40, 90)),
          parseInt(random(200, 255))
        )
      );
    }
  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

window.onresize = () => {
  createCanvas(window.innerWidth, window.innerHeight);
};
