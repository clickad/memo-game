import Time from './time.js';

export default class Start extends Time {
  constructor(){
    super();
  }
  startGame(data, level=null) {
    level == null ? this.currentLevel = 1 : this.currentLevel = level ;
    $(this).prop("disabled","true");
    this.$submit.prop('disabled', "");
    this.$submit.hide('slow');
    this.$result.empty();
    this.levelChange(this.currentLevel);
    $('.start-text').hide();
    this.$counter.show();
    this.$startBoxes.animate({"opacity":"1"},1000);
    this.$resultBoxes.animate({"opacity":"0"},1000);
    this.$startBoxes.empty();
    this.$resultBoxes.empty();
    this.images = [];
    this.images = this.getRandom(data, this.boxes);
    this.finalImages = [];
    this.finalImages = this.shuffle(this.images);
    this.insertBox();
    this.sec = this.counter;
    this.count = setInterval(()=>{this.timer()},1000);
  }

  levelChange(level) {
    switch(level){
      case  1:
        this.boxes = 3;
        this.counter = 3;
        break;
      case  2:
        this.boxes = 4;
        this.counter = 3;
        break;
      case  3:
        this.boxes = 6;
        this.counter = 5;
        break;
      case  4:
        this.boxes = 8;
        this.counter = 10;
        break;
      case  5:
        this.boxes = 10;
        this.counter = 20;
        break;
      default:
        this.boxes = 3;
        this.counter = 3;
    }
  }

  getRandom(arr, count) {
      // get random images from all images
    let rand = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = rand[index];
      rand[index] = rand[i];
      rand[i] = temp;
    }
    return rand.slice(min);
  }
  shuffle(imges) { //suffle images
    let currentIndex = imges.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = imges[currentIndex];
      imges[currentIndex] = imges[randomIndex];
      imges[randomIndex] = temporaryValue;
    }
    return imges;
  }

  insertBox() {
    for(let i = 0; i < this.finalImages.length; i++){
      this.$startBoxes.append(
        `<div class = "box">
          <img src = "img/${this.finalImages[i]}.png" alt = "image">
        </div>`
      );
    } 
  }
}