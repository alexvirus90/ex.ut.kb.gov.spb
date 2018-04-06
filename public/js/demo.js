$(document).ready(function(){
    setTimeout(function(){
        //All demo scripts go here
        globalbox.notify('info', {
            icon: 'fas fa-user',
            sound: false,
            position: 'top right',
            delay: 15000,
            showClass: 'fadeInDown',
            title: 'Добро пожаловать!'
            // msg: 'globalAdmin is fully responsive ajax based web app with unique components and exclusive plugins'
        });
    }, 1000);
    
    $(document).on('submit', 'form', function(ev){
        ev.preventDefault();
    });
});

/**
 * Generate n random numbers each of them in between min and max values
 * 
 * @param {Integer} n
 * @param {Integer} min
 * @param {Integer} max
 * @returns {Array} 
 */
function randomIntegers(n, min, max) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(Math.round(min + Math.random() * (max - min)));
    }
    return arr;
}