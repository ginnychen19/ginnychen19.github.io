var Div01H = document.getElementById('header').offsetHeight;
        var Div02H = document.getElementsByClassName('book').offsetHeight;
        var Div03H = document.getElementById('processAndProblem-C').offsetHeight;
        var Div04H = document.getElementById('contactMe').offsetHeight;
        //alert(Div02H);
 
        var Weed ="img/svg/Weed_dark.svg";
           var canvas1Settings = {
               target: 'canvas1',
               max: 500,
               size: 1,
               props: ['square',
                   'triangle',
                   {'type': 'svg', 'src': 'img/svg/WdDark.svg'},
               ],
               colors: [[233, 224, 217], [254, 162, 32], [110, 149, 76]],
               clock: 3,
               width: "1900",
               height: "960",
               
               respawn: true
           };
           var canvas1 = new ConfettiGenerator(canvas1Settings);

           window.onload = function(){
               canvas1.render();
           };            