(function(){
  function getData() {
    return $.getJSON('data.json');
  }
  $.when(getData()).then(function (data) {
    var app = {
      init: function(){
        this.$level = $('.level');
        this.$submit = $('.submit');
        this.$start = $('.start');
        this.$resultBoxes = $( ".result-boxes" );
        this.$startBoxes = $('.start-boxes');
        this.$counter = $('.counter');
        this.$result = $('.result');
        this.allImages = data;
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
        this.$level.prop('selectedIndex',0); 
        this.$level.prop("disabled","true");

        this.$resultBoxes.sortable({
          placeholder: "highlight",
          cursor: "move"
        });
        this.$resultBoxes.disableSelection();
        this.$level.on('change', this.levelChange.bind(this));
        this.$start.on('click', this.startGame.bind(this));
        this.$submit.on('click', this.checkResult.bind(this));
      },
      levelChange: function (level){
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
        }
      },
      getRandom:  function (arr, count) {  // get random images from all images
        var rand = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = rand[index];
          rand[index] = rand[i];
          rand[i] = temp;
        }
        return rand.slice(min);
      },
      shuffle: function (array) { //sfuffle images
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      },
      insertBox: function (){
        for(var i = 0; i < this.finalImages.length; i++){
          this.$startBoxes.append(
            '<div class = "box"><img src = "img/'+ this.finalImages[i]+'.png" alt = "image"></div>'
          );
        } 
      },
      countDown: function (){
        var self = this;
        this.resultImages = [];
        this.$startBoxes.animate({"opacity":"0"},1000);
        setTimeout(function(){
          self.$resultBoxes.animate({"opacity":"1"},1000);
        },1500);
        $('.box').each(function(){
          self.resultImages.push($(this).find('img').attr('src'));
        });
        this.resultImages = this.shuffle(this.resultImages);
        for(var i = 0; i < this.resultImages.length; i++){
          this.$resultBoxes.append(
            '<div class = "box"><img src = "'+ this.resultImages[i] + '" alt = "image"></div>'
          );
        }
      },
      timer: function (){
        var self = this;
        this.$start.prop("disabled","true");
        //$('.level').prop("disabled","true");
        this.$counter.css("opacity","1");
        this.$counter.html(this.sec);
        this.sec--;
        if(this.sec == -1){
          clearInterval(this.count);
          this.sec = this.counter;
          this.$start.prop("disabled","");
          //$('.level').prop("disabled","");
          setTimeout(function(){
            self.$counter.empty();
            self.$counter.css("opacity","0");
            setTimeout(function(){
              self.$submit.show('slow');
            },1500);

          },700);
          this.countDown();
        }
      },
      checkResult:  function (){
        this.$submit.hide();
        var self = this;
        this.ct = 0;
        this.compareImages = [];
        this.startImages= [];
        $('.result-boxes .box').each(function(){
          self.src = $(this).find('img').attr('src').toString();
          self.compareImages.push(self.src);
        });
        $('.start-boxes .box').each(function(){
          self.src2 = $(this).find('img').attr('src').toString();
          self.startImages.push(self.src2);
        });

        for (var i = 0; i < this.compareImages.length; ++i) {
          if (this.compareImages[i] == this.startImages[i]){ 
            this.ct++;
          }
        } 
        if(this.ct == this.compareImages.length){
          this.$result.empty().append('<span class = "correct">Congratulations!</span>');
          setTimeout(function(){
            self.$result.empty(); 
            self.currentLevel++;
            self.$level.val(self.currentLevel);
            self.$start.trigger('click');
          },2000);
        }else{
          this.$result.empty().append('<span class = "wrong">Sorry!</span>');
          setTimeout(function(){ 
            self.currentLevel = 1;
            self.$level.val(self.currentLevel);
          },2000);  
        }
      },
      startGame:  function (){ 
        var self = this;
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
        this.images = this.getRandom(this.allImages, this.boxes);
        this.finalImages = [];
        this.finalImages = this.shuffle(this.images);
        this.insertBox();
        this.sec = this.counter;
        this.count = setInterval(function(){self.timer()},1000);
      }
    }
    //$(window).on("load", function(){
    app.init();
    //});
  });
})();