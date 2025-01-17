"use strict"

var gl;

window.onload = function init()
{
    var canvas = document.getElementById('gl-canvas');
    gl = canvas.getContext('webgl2');
    if(!gl){
        alert("WebGL 2.0 is not available on your browser");
    }

    var points = [
		vec2(-1, -1) ,
		vec2(0,  1) ,
		vec2(1, -1)
	];

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(1.0,1.0,1.0,1.0)

    var program = initShaders(gl,"vertex-shader","fragment-shader");
    gl.useProgram(program);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(points),gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program,"aPosition");
    gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aPosition);

    render();
};

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}