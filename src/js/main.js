export default class Main {
  constructor(){
    this.$level = $('.level');
    this.$submit = $('.submit');
    this.$start = $('.start');
    this.$resultBoxes = $( ".result-boxes" );
    this.$startBoxes = $('.start-boxes');
    this.$counter = $('.counter');
    this.$result = $('.result');
    this.boxes;
    this.images = [];
    this.finalImages = [];
    this.resultImages = [];
    this.counter = 3;
    this.count;
    this.sec = this.counter;
    this.startImages = [];
    this.compareImages = [];
    this.src; 
    this.src2;
    this.ct = 0;
    this.currentLevel = parseInt(this.$level.val());
  }
}