import Main from './main.js';

export default class Result extends Main {
  checkResult() {
    this.$submit.hide();
    this.ct = 0;
    this.compareImages = [];
    this.startImages= [];
    $('.result-boxes .box').each((i, el)=>{
      this.src = $(el).find('img').attr('src').toString();
      this.compareImages.push(this.src);
    });
    $('.start-boxes .box').each((i, el)=>{
      this.src2 = $(el).find('img').attr('src').toString();
      this.startImages.push(this.src2);
    });

    for (let i = 0; i < this.compareImages.length; ++i) {
      if (this.compareImages[i] == this.startImages[i]){ 
        this.ct++;
      }
    } 
    if(this.ct == this.compareImages.length){
      this.$result.empty().append(`<span class = "correct">Congratulations!</span>`);
      setTimeout(()=>{
        this.$result.empty(); 
        this.currentLevel++;
        this.$level.val(this.currentLevel);
        this.$start.trigger('click', [this.currentLevel]);
      },2000);
    }else{
      this.$result.empty().append(`<span class = "wrong">Sorry!</span>`);
      setTimeout(()=>{ 
        this.currentLevel = 1;
        this.$level.val(this.currentLevel);
      },2000);  
    }
  }
}