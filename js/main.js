var ul;
//var container;
var liItems; 
var imageWidth;
var imagecount;
var currentImage;

function init(){
    ul = document.getElementById('image_slider');
    liItems = ul.children;
    imagecount = liItems.length;
    imageWidth = liItems[0].children[0].offsetWidth;
    // set ul’s width as the total width of all images in image slider.
    ul.style.width = parseInt(imageWidth * 4.1) + 'px';
    //ul.style.height = liItems[0].children[0].offsetHeight + 'px';
    //container = ul.parentNode.parentNode;
    //container.style.height = parseFloat(liItems[0].children[0].offsetHeight + 40) + 'px';
    //ul.parentNode.style.height = parseFloat(liItems[0].children[0].offsetHeight) + 'px';
    slider(ul);
}

function slider(ul){ 
    animate({
        delay:17,
        duration: 2000,
        delta:function(p){return Math.max(0, -1 + 2 * p)},
        step:function(delta){
            ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
    },
        callback:function(){
            currentImage++;
        // if it doesn’t slied to the last image, keep sliding
            if(currentImage < imagecount-1){
                slider(ul);
	        }
       // if current image it’s the last one, it slides back to the first one
            else{
                var leftPosition = 0;
               // after 2 seconds, call the goBack function to slide to the first image 
                setTimeout(function(){goBack(leftPosition)}, 1000);
            }
        }
    });
}

function goBack(leftPosition){
    currentImage = 0; 
    var id = setInterval(function(){
        if(leftPosition >= 0){
            ul.style.left = '-' + parseInt(leftPosition) + 'px';
            leftPosition -= imageWidth / 10;
        }
        else{
            clearInterval(id);
        } 
    }, 17);
    setTimeout(function(){slider(ul)}, 2000);
}

//generic animate function
function animate(opts){
    var start = new Date;
    var id = setInterval(function(){
        var timePassed = new Date - start;
        var progress = timePassed / opts.duration
        if(progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
           opts.callback();
         }
    }, opts.delay || 17);
}

window.onload = init;
