import Main from './main.js';

export default class Time extends Main{
  constructor(){
    super();
  }
  countDown() {
    this.resultImages = [];
    this.$startBoxes.animate({"opacity":"0"},1000);
    setTimeout(()=>{
      this.$resultBoxes.animate({"opacity":"1"},1000);
    },1500);
    $('.box').each((i, el)=>{
      this.resultImages.push($(el).find('img').attr('src'));
    });
    this.resultImages = this.shuffle(this.resultImages);
    for(let i = 0; i < this.resultImages.length; i++){
      this.$resultBoxes.append(
        `<div class = "box">
          <img src = "${this.resultImages[i]}" alt = "img">
        </div>`
      );
    }
  }
  timer() {
    this.$start.prop("disabled","true");
    this.$counter.css("opacity","1");
    this.$counter.html(this.sec);
    this.sec--;
    if(this.sec == -1){
      clearInterval(this.count);
      this.sec = this.counter;
      this.$start.prop("disabled","");
      setTimeout(()=>{
        this.$counter.empty();
        this.$counter.css("opacity","0");
        setTimeout(()=>{
          this.$submit.show('slow');
        },1500);

      },700);
      this.countDown();
    }
  }
}