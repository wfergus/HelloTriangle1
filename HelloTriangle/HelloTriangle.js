/*
Will's Questions:
1)what does init stand for?
2)why do we only need one buffer even though we have multiple colors and points?
Adan's Answers:
1) Init is just short for initialize, being used to initialize the shaders, pg 26
2) The reason there is only one buffer, is because it handles all the colors, not just singular ones. pg 28


Adan's Questions:
1) Why is it important to create a vertex buffer?
2) Is it important to have the data for the buffer before or after binding? Or does it not matter?
Will's Answers:
1) It is important to create a vertex buffer so that you are able to pass multiple vertices through a single attribute variable. pg 72
2) The buffer is bound to the shader before any information is passed into it. You have to create the buffer object before you can do this, but the specifications
of it's contents and which attribute variable is being effected comes after. pg 73
*/


var VSHADER_SOURCE = //Creating a variable called VShader_Source
    'attribute vec4 a_Position;\n' + //assigning a attribute
    'void main() {\n' +
    ' gl_Position = a_Position;\n' + //connecting the GLES code with javascript
    '}\n';

var FSHADER_SOURCE = //Creating a variable called FShader_Source
    'void main() {\n' + 
    ' gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' + //initializing its color to the shader which is red
    '}\n';

function main() { //creating a main function to be called by the html page when loaded
    var canvas = document.getElementById('webgl'); //retireving the canvas speficied by our html

    var gl = getWebGLContext(canvas); //Create a gl variable that allows us to apply the shaders to the canvas
    //(ERROR CODE HERE)
    if (!gl) { //checks if the canvas loaded

        console.log('Failed to get the rendering context for WebGL'); // if not use different browser
        return;//stop program
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) { //initializing shaders and checking if they aren't loading
        console.log('failed to initialize shaders'); // error message
        return;//stop program
    }

    var n = initVertexBuffers(gl);// creating a variable with the positions of the Vertices that we will be creating
    if (n < 0) { //checking if was able to retreive
        console.log('error')//didn't set positions 
        return;//stop program
    }

    gl.clearColor(0, 0, 0, 1); //set background color to black
    gl.clear(gl.COLOR_BUFFER_BIT);//clears background

    gl.drawArrays(gl.TRIANGLES, 0, n);//takes positions and create an object out to draw
}

function initVertexBuffers(gl) {//creating a function that is setting & initalizing the points
    var vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]); // hard coding the points in an array
    var n = 3;// how many points with x & y locations

    var vertexBuffer = gl.createBuffer(); // creating a Buffer to be used
    if (!vertexBuffer) {//checking if it loaded
        console.log('Failed buffer object');//if failed alert 
        return -1;//stopping function call
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // binding buffer to the vertexBuffer we created
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //binding buffer object with vertices 

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); //getting reference of a_Position
    if (a_Position < 0) {//checking if got reference
        console.log('Failed to get location of a_Position');//error alert
        return -1;//stopping the function
    }

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);//binding a_position with where the memory is located

    gl.enableVertexAttribArray(a_Position);//assigning the values to a_Position

    return n;//returning how many points to draw

}



