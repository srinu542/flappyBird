$(function(){
  var score_span = $(".score");
  var speed_span = $(".speed");

    var bird = $(".bird");
    var pole = $(".pole");
    var pole_1 = $(".pole1");
    var pole_2 = $(".pole2");
    var containar = $(".containar");

    var containar_width = parseInt(containar.width());
    var containar_height = parseInt(containar.height());
    var pole_intial_position = parseInt(pole.css('right'));
    var pole_intial_height = parseInt(pole.css('height'));
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());
  
    var speed = 10;
    var  time = 0;
    var score = 0;

    var go_up = false;
    var restart = $('.restart');
    var gameOver = false;
    
    
    var speed_inc_meter =  setInterval(() =>{
      speed = speed+1;
      $(speed_span).text(speed);
    },1500); 

    var time_inc_meter =  setInterval(() =>{
      time = time+1;
      $(".time").text(time);
    },1000); 

   var the_game = setInterval(function(){
      
    if(collision(bird , pole_1) || collision(bird , pole_2) || parseInt(bird.css('top')) <= 5 || 
    parseInt(bird.css('top')) >  containar_height - bird_height)
    {
      clearInterval(speed_inc_meter);
      clearInterval(time_inc_meter);
      stop();     
    }
    
    else{
      
      var pole_position = parseInt(pole.css('right'));
      
      
      if(pole_position >= containar_width){
        pole_position = pole_intial_position;  
        
        var new_height = parseInt((Math.random() * 100) + 10);
        speed_inc = true;
        
        $(pole_1).css("height",pole_intial_height + new_height);
        $(pole_2).css("height",pole_intial_height - new_height);
                if(bird_left > pole_position){
          score = score + 1;
          score_span.text(score);}
                                              }
      
      pole.css('right', pole_position + speed);
    }
    if(go_up === false){
      go_down();
    }
  },40);
    
  
  function go_down(){
    bird.css('top', parseInt(bird.css('top')) + 5);
    }
    
    $(document).keydown((e) =>{
      var key = e.keyCode;
      if(key == 38 && go_up === false && gameOver === false){
       go_up = setInterval(up,40);
      }
    }); 

    $(document).keyup((e) =>{
      var key = e.keyCode;
      if(key == 38){
        clearInterval(go_up);
        go_up= false;
      }
    }); 
    
    function up(){
      bird.css('top', parseInt(bird.css('top')) - 7);
    }

    function stop(){
      clearInterval(the_game);
      gameOver = true;
      restart.css("display","block");
      reload_on_enter();
    }
    
    
    $(".rb").click(function(){
      location.reload();
    });

   function reload_on_enter(){
 
    $(document).keypress((e) =>{
      var key = e.keyCode;
      if(key == 13){
        location.reload();
      }
    }); 

   }

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

  });

