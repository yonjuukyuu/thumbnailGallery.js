/**
 * Created by danielsilva on 07/02/17.
 */

(function ($) {
    var defaultsSettings = {
        selectorClass: $(this)
    }
    function checkSliderPosition(position,imgWidth,singleWidth){
        if(position == 0){
            $("a.thumb-previous").fadeOut();
        }
        if(position > 0){
            $("a.thumb-previous").fadeIn();
        }

        var finalPosition = 0;
        finalPosition = (imgWidth - (singleWidth * 3)) - 20;

        if(position >= finalPosition){
            $("a.thumb-next").fadeOut();
        }
        if(position < finalPosition){
            $("a.thumb-next").fadeIn();
        }

    }

    function init(options){

        this.opts = $.extend({}, defaultsSettings, options);

        var totalNum = 0;
        var leftNum = 0
        var goLeft = 0
        var goRight = 0
        var countImgWidth = 0;
        var ImgWidth = 0;
        var ImgHeight = 0;

        $(this.opts.selectorClass.find("a")).each(function(i){
            totalNum = i;
            countImgWidth += $(this).width();
            ImgWidth = $(this).width();
            ImgHeight = $(this).height();

        });
        $(".thumbnail-gallery-container-slider").css({'width': (ImgWidth * 3) - 10,"position":"absolute"})
        $(".thumbnail-gallery-container").css({'width': (ImgWidth * 3) - 10, 'height': ImgHeight + "px"})



        if(totalNum > 3){
            $(this.opts.selectorClass.find("a")).each(function(x){
                if(x > 0){
                    leftNum += ($(this).width() + 10);
                }
                $(this).css({"position":"absolute","left": leftNum})
            });

            $(".thumbnail-gallery-container").append('<a class="thumb-next"></a>');
            $(".thumbnail-gallery-container").append('<a class="thumb-previous"></a>');

            checkSliderPosition(goLeft,countImgWidth,ImgWidth);

            $("a.thumb-next").on('click',function(){
                goLeft += ($(".thumbnail-gallery-container-slider a > img").width() + 10)
                $(".thumbnail-gallery-container-slider").css({'left': - goLeft,'transition' : 'left 0.3s linear;'})
                checkSliderPosition(goLeft,countImgWidth,ImgWidth);
            });
            $("a.thumb-previous").on('click',function(){
                goLeft -= ($(".thumbnail-gallery-container-slider a > img").width() + 10)
                $(".thumbnail-gallery-container-slider").css({'left': - goLeft,'transition' : 'left 0.3s linear;'})
                checkSliderPosition(goLeft,countImgWidth,ImgWidth);
            });
        }
    };

    // jQuery plugin wrapper
    $.fn.thumbnailGallery = function(options) {
        init(options);
    };

})(jQuery);

$(".thumbnail-gallery-container-slider").thumbnailGallery({
    selectorClass: $(".thumbnail-gallery-container-slider")
});