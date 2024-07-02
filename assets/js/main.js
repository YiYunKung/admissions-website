$(function () {

    "use strict";

    //===== Prealoder

    $(window).on('load', function (event) {
        $('.preloader').delay(500).fadeOut(500);
    });



    //===== Sticky

    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 20) {
            $(".navbar-area").removeClass("sticky");
        } else {
            $(".navbar-area").addClass("sticky");
        }
    });



    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
    // Active link switching
    $(window).scroll(function () {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function () {

            var sectionOffset = $(this.hash).offset().top - 73;

            if (sectionOffset <= scrollbarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });


    //===== close navbar-collapse when a  clicked

    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass("active");
    });

    $(".navbar-nav a").on('click', function () {
        $(".navbar-toggler").removeClass('active');
    });




    //===== Back to top

    // Show or hide the sticky footer button
    $(window).on('scroll', function (event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });


    //Animate the scroll to yop
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });


    //===== Svg

    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


    //===== Activity

    function moveElement(ele,x_final,y_final,interval){//ele為元素物件
        var x_pos=ele.offsetLeft;
        var y_pos=ele.offsetTop;
        var dist=0;
        if(ele.movement){//防止懸停
          clearTimeout(ele.movement);
        }
        if(x_pos==x_final&&y_pos==y_final){//先判斷是否需要移動
          return;
        }
        dist=Math.ceil(Math.abs(x_final-x_pos)/5);//分5次移動完成
        x_pos = x_pos<x_final ? x_pos+dist : x_pos-dist;
        
        dist=Math.ceil(Math.abs(y_final-y_pos)/5);//分5次移動完成
        y_pos = y_pos<y_final ? y_pos+dist : y_pos-dist;
        
        ele.style.left=x_pos+'px';
        ele.style.top=y_pos+'px';
        
        ele.movement=setTimeout(function(){//分5次移動，自呼叫5次
          moveElement(ele,x_final,y_final,interval);
        },interval)
      }
      
      function moveIndex(list,num){//移動小圓點
        for(var i=0;i<list.length;i++){
          if(list[i].className=='on'){//清除li的背景樣式
            list[i].className='';
          }
        }
        list[num].className='on';
      }

      var img=document.getElementById('img');
        var list=document.getElementById('index').getElementsByTagName('li');
        var index=0;//這裡定義index是變數，不是屬性

        var nextMove=function(){//一直向右移動，最後一個之後返回
            index+=1;
            if(index>=list.length){
            index=0;
            }
            moveIndex(list,index);
            moveElement(img,-540*index,0,20);
        };
        var play=function(){
            timer=setInterval(function(){
              nextMove();
            },2500);
          };
          for(var i=0;i<list.length;i++){//滑鼠覆蓋上哪個小圓圈，圖片就移動到哪個小圓圈，並停止
            list[i].index=i;//這裡是設定index屬性，和index變數沒有任何聯絡
            list[i].onmouseover= function () {
              var clickIndex=parseInt(this.index);
              moveElement(img,-540*clickIndex,0,20);
              index=clickIndex;
              moveIndex(list,index);
              clearInterval(timer);
            };
            list[i].onmouseout= function () {//移開後繼續輪播
              play();
            };
          }
          if(x_pos==-4320){
            ele.style.left='0';
            ele.style.top='0';
          }else{
            ele.style.left=x_pos+'px';
            ele.style.top=y_pos+'px';
          }
    


});
