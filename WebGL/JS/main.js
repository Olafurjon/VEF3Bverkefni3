//Fór eftir þessum gæja á youtube
/*https://www.youtube.com/watch?v=kB0ZVUrI4Aw*/


//Ég setti þetta bara með til að fikta bara, ætlaði að hafa meira random liti og leika mér með þetta
var color = [[0.5, 0.5, 0.5],[0.75, 0.25, 0.5],[0.25, 0.25, 0.75],[1.0, 0.0, 0.15],[0.0, 1.0, 0.15],[0.5, 0.5, 1.0],[0.1, 0.2, 0.7]];
//kóðinn að neðan segir sig meira og minna bara sjálfur þangað til við komum að vertex shadernum
var rotspeed = 1;
var rotspeedbox = document.getElementById("rotspeed")
rotspeedbox.value = rotspeed;
rotspeedbox.addEventListener("focusout", function(){
var rotspeedval = document.getElementById("rotspeed").value;
rotspeed = rotspeedval;
});


var zview = 5;
var zviewbox = document.getElementById("z-view")
zviewbox.value = zview;
zviewbox.addEventListener("focusout", function(){
var zviewval = document.getElementById("z-view").value;
zview = zviewval;
});

var yview = 0;
var yviewbox = document.getElementById("y-view")
yviewbox.value = yview;
yviewbox.addEventListener("focusout", function(){
var yviewval = document.getElementById("y-view").value;
yview = yviewval;
});

var xview = 0;
var xviewbox = document.getElementById("x-view")
xviewbox.value = xview;
xviewbox.addEventListener("focusout", function(){
var xviewval = document.getElementById("x-view").value;
xview = xviewval;
});


//Hérna kemur OpenGL forritunin fyrir vertexshaderinn þar sem við undirbúum hann til að vinna með á eftir
var vertexShaderText = 
[
'precision mediump float;', 
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'void main()',
'{',
' fragColor = vertColor;',
'gl_Position = mProj *  mView * mWorld * vec4(vertPosition,1.0);',
'}'
].join('\n');

//hérna erum við meira og minna bara  að láta vita að það verður breytilegir litir á píxlunum 
var fragmentShaderText = 
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
' gl_FragColor = vec4(fragColor,1.0);',
'}'
].join('\n');

//gerum startGL functionið klárt
var StartGl = function(){
// Hvar er canvasinn?
var canvas = document.getElementById('glCanvas');
//sækjum í webgl contextið
var gl = canvas.getContext('webgl');
//ef vafrinn þinn styður það ekki skoðum þá experimental webgl
   if(!gl)
   {
      console.log("WebGL not supported, falling back on Experimental web-gl")
      gl = canvas.getContext('experimental-webgl');

   }
   //ef hann styður ekki experimental þá bra greyið þú...
   if(!gl)
   {
    
      alert("Your Browser does not support WebGL");
   }

   //clearcolor hérna setjum við í raun bakgrunninn á canvasnum hvaða lit við viljum hafa
   gl.clearColor(0.75,0.85,0.8,1.0);
   //hvaða hluti viljum við hreinsa úr buffernum, það myndi vera depthið og litirnir þar sem við erum að rotatea þessu á fullu
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   //undirbúum shaderna segjum hvað það er og látum vita að sources séu viðeigandi shaderar með viðeigandi texcta og skilyrðum sem við græjuðum að ofan
   var vertexShader = gl.createShader(gl.VERTEX_SHADER);
   var fragmentShader  = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(vertexShader,vertexShaderText);
   gl.shaderSource(fragmentShader,fragmentShaderText);
   //við viljum að það kanni dýptina á þessu svo þeir geti bara hætt að spá  því píxlarnir ef þetta er  hvort eð er fyrir aftan hlutinn sem er að renderast
   gl.enable(gl.DEPTH_TEST);
   //kveikjjum á Cull face og látum vita að það eru aftari polygonarnir sem við viljum culla
   gl.enable(gl.CULL_FACE);
   gl.cullFace(gl.BACK);
   //hvernig þetta snýr uppá sig getum verið með clock wise eða counter clockwise
   gl.frontFace(gl.CCW);

   //þjappar og vinnur úr vertexshade-er kóðanum okkkar
   gl.compileShader(vertexShader);
   //ef það var eitthvað vesen þá sjáum við það oog loggið hérna að neðan birtir hvar veseinð var
   if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
   {
      console.error("ERROR compiling shader! ", gl_getShaderInfoLog(vertexShader))
      return;
   }
   //sama og að ofan nema fyrir fragmentshaderinn
   gl.compileShader(fragmentShader);
   if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
   {
      console.error("ERROR compiling shader! ", gl_getShaderInfoLog(fragmentShader))
      return;
   }
   //Undirbúum við "programmið" sem sameinað báða shaderna og vinnur úr þeim, og eru þeir "festir" við programmið hér að neðanm
   var program = gl.createProgram();
   gl.attachShader(program,vertexShader);
   gl.attachShader(program,fragmentShader);
   gl.linkProgram(program);
   //gekk þetta eins o gí sögu?
   if(!gl.getProgramParameter(program, gl.LINK_STATUS))
   {
      console.error("Error linking program ", gl.getProgramInfoLog(program));
      return;
   }
   //bara í debug
   gl.validateProgram(program);
   if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
   {
      console.error("Error validating program ", gl.getProgramInfoLog(program));
      return;
   }
    var r1 = Math.floor(Math.random() * color.length);
    var r2 = Math.floor(Math.random() * color.length);
    var r3 = Math.floor(Math.random() * color.length);
    var r4 = Math.floor(Math.random() * color.length);
    var r5 = Math.floor(Math.random() * color.length);
    var r6 = Math.floor(Math.random() * color.length);

   //
   //Buffer
   //
   //komum hornahnitunum fyrir og þar sem við ætlum að vera með þrívídd þurfum við að gera XYZ hnitinn á öllum hliðunum
   var boxVertices = 
   [ //X,Y,Z   //RGB

   //toppurinn
     -1.0, 1.0, -1.0,   color[r1][0],color[r1][1],color[r1][2],
     -1.0, 1.0, 1.0,   color[r1][0],color[r1][1],color[r1][2],
     1.0, 1.0, 1.0,   color[r1][0],color[r1][1],color[r1][2],
     1.0, 1.0, -1.0,   color[r1][0],color[r1][1],color[r1][2],

      //vinstri hlið
     -1.0, 1.0, 1.0,   color[r2][0],color[r2][1],color[r2][2],
     -1.0, -1.0, 1.0,   color[r2][0],color[r2][1],color[r2][2],
     -1.0, -1.0, -1.0,   color[r2][0],color[r2][1],color[r2][2],
     -1.0, 1.0, -1.0,   color[r2][0],color[r2][1],color[r2][2],

      //hægri hlið
     1.0, 1.0, 1.0,   color[r3][0],color[r3][1],color[r3][2],
     1.0, -1.0, 1.0,   color[r3][0],color[r3][1],color[r3][2],
     1.0, -1.0, -1.0,   color[r3][0],color[r3][1],color[r3][2],
     1.0, 1.0, -1.0,   color[r3][0],color[r3][1],color[r3][2],

     //Framan á hlið
     1.0, 1.0, 1.0,   color[r4][0],color[r4][1],color[r4][2],
     1.0, -1.0, 1.0,   color[r4][0],color[r4][1],color[r4][2],
     -1.0, -1.0, 1.0,   color[r4][0],color[r4][1],color[r4][2],
     -1.0, 1.0, 1.0,   color[r4][0],color[r4][1],color[r4][2],

     //Bakvið
     1.0, 1.0, -1.0,   color[r5][0],color[r5][1],color[r5][2],
     1.0, -1.0, -1.0,   color[r5][0],color[r5][1],color[r5][2],
     -1.0, -1.0, -1.0,   color[r5][0],color[r5][1],color[r5][2],
     -1.0, 1.0, -1.0,   color[r5][0],color[r5][1],color[r5][2],

    //Botn
     -1.0, -1.0, -1.0,   color[r6][0],color[r6][1],color[r6][2],
     -1.0, -1.0, 1.0,   color[r6][0],color[r6][1],color[r6][2],
     1.0, -1.0, 1.0,   color[r6][0],color[r6][1],color[r6][2],
     1.0, -1.0, -1.0,   color[r6][0],color[r6][1],color[r6][2],
      
   ];

   var boxIndices = 
   [
      //Toppurinn
      0,1,2,
      0,2,3,

      //vinstri
      5,4,6,
      6,4,7,

      //hægri
      8,9,10,
      8,10,11,

      //framan
      13,12,14,
      15,14,12,

      //Bak
      16,17,18,
      16,18,19,

      //botn
      21,20,22,
      22,20,23

   ]
   //komum þessu fyrir í bufferinn og undirbúum hvernig þetta verður framkvæmt
   var boxVerticesBufferObject = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER,boxVerticesBufferObject);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices) ,gl.STATIC_DRAW);

   var boxIndexBufferObject = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
   //forritum hvar þetta er staðsett og hvernig við viljum vinna úr þessu
   var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
   var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
   gl.vertexAttribPointer(
      positionAttribLocation, //attrib loc
      3,//hversu marga hluti erum við að vinna með, semsagt fyrir hverja þrá
      gl.FLOAT, //hvers konar data er í þessu,
      gl.FALSE, //það þarf ekki að normalize-a
      6*Float32Array.BYTES_PER_ELEMENT,//bitar hvert element eða þá þar sem þetta er float eru það 4 bitar og hérna er óskað eftir stærð per stakt vertex
      0//hvar á þetta á byrja? 0 == byrjunin
      );
      gl.vertexAttribPointer(
      colorAttribLocation, //hvar má ég lita?
      3,//sama og að ofan
      gl.FLOAT,//sama og að ofan
      gl.FALSE,////sama og að ofan
      6*Float32Array.BYTES_PER_ELEMENT,//sama og að ofan
      3 * Float32Array.BYTES_PER_ELEMENT//viljum láta þetta byrja á stöku vertexi
      );
    //keyrum þetta í gang og látum hvernig þetta liggur
   gl.enableVertexAttribArray(positionAttribLocation);
   gl.enableVertexAttribArray(colorAttribLocation);
   //notaðu þetta sem ég er búinn að vera hafa fyrir að gera...
   gl.useProgram(program);
   //undirbúum við sviðið okkar
   var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
   var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
   var matProjUniformLocation = gl.getUniformLocation(program, 'mProj'); 
   //þetta eru fylki af float tölum
   var projMatrix = new Float32Array(16);
   var worldMatrix = new Float32Array(16);
   var viewMatrix = new Float32Array(16);


   var xRotationMatrix = new Float32Array(16);
   var yRotationMatrix = new Float32Array(16);

   //
   //aðal dótið okkar sem keyrir
   //
   var identityMatrix = new Float32Array(16);
   mat4.identity(identityMatrix);
   var angle = 0;
   var loop = function()
   {   
    //hvar erum, við
    mat4.identity(worldMatrix);
    //Hvað á að vera focusað á?
   mat4.lookAt(viewMatrix,[0,0,zview],[xview,yview,0],[0,1,0]);
   //hvert er sjónarhornið?
   mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height,0.1,1000.0);

   gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
   gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
   gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
   
    //angle*rotspeed frá svaka perfomance.now formúlu, bara til að fá smooth snúning
      angle = performance.now() / 1000 / 6 * 2 * Math.PI;
      angle = angle * rotspeed;;


      mat4.rotate(yRotationMatrix, identityMatrix, angle ,[0,1,0]);
      mat4.rotate(xRotationMatrix, identityMatrix, angle /4 ,[1,0,0]);
      mat4.mul(worldMatrix, yRotationMatrix,xRotationMatrix);
      gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE,worldMatrix);
      //hreinsum í sífellu þar sem við erum alltaf að mynda aftur
      gl.clearColor(0.75,0.85,0.8,1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      //endurtökum leikinn stanslaust
      requestAnimationFrame(loop);
   gl.drawElements(gl.TRIANGLES,boxIndices.length,gl.UNSIGNED_SHORT,0);
   };
   requestAnimationFrame(loop);

   
};

window.addEventListener("click",function(e){
  console.log(e);
})

/*function vertexShader(vertPosition,vertColor) {
   return{
      fragColor:vertColor,
      gl_Position: [vertPosition.x, vertPosition.y, 0.0,1.0]
   };
};*/




