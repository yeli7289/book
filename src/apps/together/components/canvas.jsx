function refresh(){
    var pixelDataRef = new Firebase('https://wetravel.firebaseio.com/Groups/CS_Grad_Trip/drawing');
    var mapRef = new Firebase('https://wetravel.firebaseio.com/Groups/CS_Grad_Trip/map');
    var myCanvas = document.getElementById('drawing-canvas');
    var myContext = myCanvas.getContext ? myCanvas.getContext('2d') : null;
    var transImage = new Image();
    var outlineImage = new Image();
    outlineImage.onload = function() {
        myContext.drawImage(outlineImage, 0, 0, 480, 420);
    };
    mapRef.on('value',function(snapshot) {
        var mapurl = snapshot.val();
        outlineImage.src = mapurl;
    });
    transImage.onload = function() {
        myContext.drawImage(transImage, 0, 0, 480, 420);
    };
    transImage.src = "images/watermelon-duck-outline.png";
    pixelDataRef.remove();
}

class Canvas extends React.Component {
    render(){
        var drawing = this.props.drawings;
        return(

            <div id="set-canvas">
                <div className="row">
                    <div className="center-align">
                        <div className="container">
                            <div id="colorholder"></div>
                            <canvas id="drawing-canvas" width="480" height="420"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount(){
        $(document).ready(function () {
            //Set up some globals
            var pixSize=2, lastPoint = null, currentColor = "000", mouseDown = 0;
            small.onclick = function() {
                pixSize = 2;
            };
            medium.onclick = function() {
                pixSize = 4;
            };
            large.onclick = function() {
                pixSize = 8;
            };
            //Create a reference to the pixel data for our drawing.
            var pixelDataRef = new Firebase('https://wetravel.firebaseio.com/Groups/CS_Grad_Trip/drawing');
            var mapRef = new Firebase('https://wetravel.firebaseio.com/Groups/CS_Grad_Trip/map');
            // Set up our canvas
            var myCanvas = document.getElementById('drawing-canvas');
            var myContext = myCanvas.getContext ? myCanvas.getContext('2d') : null;
            if (myContext == null) {
                alert("You must use a browser that supports HTML5 Canvas to run this demo.");
                return;
            }
            var outlineImage = new Image();
            outlineImage.onload = function() {
                myContext.drawImage(outlineImage, 0, 0, 480, 420);
            };
            mapRef.on('value',function(snapshot) {
                var mapurl = snapshot.val();
                outlineImage.src = mapurl;
            });
            //Setup each color palette & add it to the screen
            var colors = ["fff","000","f00","0f0","00f","88f","f8d","f88","f05","f80","0f8","cf0","08f","408","ff8","8ff", "aed081", "eee"];
            for (c in colors) {
                var item = $('<div/>').css("background-color", '#' + colors[c]).addClass("colorbox");
                item.click((function () {
                    var col = colors[c];
                    return function () {
                        currentColor = col;
                    };
                })());
                item.appendTo('#colorholder');
            }
            //Keep track of if the mouse is up or down
            myCanvas.onmousedown = function () {mouseDown = 1;};
            myCanvas.onmouseout = myCanvas.onmouseup = function () {
                mouseDown = 0; lastPoint = null;
            };
            var drawLineOnMouseMove = function(e) {
                if (!mouseDown) return;
                e.preventDefault();
                var offset = $('canvas').offset();
                var x1 = Math.floor((e.pageX - offset.left) / pixSize - 1),
                    y1 = Math.floor((e.pageY - offset.top) / pixSize - 1);
                var x0 = (lastPoint == null) ? x1 : lastPoint[0];
                var y0 = (lastPoint == null) ? y1 : lastPoint[1];
                var dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
                var sx = (x0 < x1) ? 1 : -1, sy = (y0 < y1) ? 1 : -1, err = dx - dy;
                while (true) {
                    if(currentColor=="fff"){
                        pixelDataRef.child(x0 + ":" + y0).set(null);
                    }else{
                        pixelDataRef.child(x0 + ":" + y0).set({curColor: currentColor,
                            curSize : pixSize});
                    }
                    console.log("size",pixSize);
                    if (x0 == x1 && y0 == y1) break;
                    var e2 = 2 * err;
                    if (e2 > -dy) {
                        err = err - dy;
                        x0 = x0 + sx;
                    }
                    if (e2 < dx) {
                        err = err + dx;
                        y0 = y0 + sy;
                    }
                }
                lastPoint = [x1, y1];
            };
            $(myCanvas).mousemove(drawLineOnMouseMove);
            $(myCanvas).mousedown(drawLineOnMouseMove);
            var drawPixel = function(snapshot) {
                var coords = snapshot.key().split(":");
                var object = snapshot.val();
                myContext.fillStyle = "#" + object.curColor;
                var radius = object.curSize;
                myContext.fillRect(parseInt(coords[0]) * radius, parseInt(coords[1]) * radius, radius, radius);
            };
            var clearPixel = function(snapshot) {
                var coords = snapshot.key().split(":");
                var object = snapshot.val();
                var radius = object.curSize;
                myContext.clearRect(parseInt(coords[0]) * radius, parseInt(coords[1]) * radius, radius, radius);
            };
            pixelDataRef.on('child_added', drawPixel);
            pixelDataRef.on('child_changed', drawPixel);
            pixelDataRef.on('child_removed', clearPixel);
        });
    }
}

MyComponents.Canvas = Canvas