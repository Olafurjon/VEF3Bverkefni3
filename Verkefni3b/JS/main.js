window.addEventListener('DOMContentLoaded', function() {
  	
  getStats();



}, true);

var width = 900;
var getstats = false;
var height = 600;
var changeTransform = false;
var changeCam = document.getElementById("camera");
var scene = new THREE.Scene();
var autorotate = true;
var selectAll = false;
var lightson = true;
var lightint = 0.5;
var lightint2 = 0.5;
var aspect = (width / height);
var camera = new THREE.PerspectiveCamera(100, aspect, 0.1,100);
var renderer = new THREE.WebGLRenderer();
var geomSelect = document.getElementById("geomSelector");
var matSelect = document.getElementById("matSelector");
var buttons = document.getElementById("Button");
var lightintensity = document.getElementById("lightintensity");
var lightintensity2 = document.getElementById("lightintensity2");

renderer.setSize(width,height);
var paused = false;
var gemoindex = 0;
var number = 1;
var raiseflag = false;
var randomsizes = false;
var numberchanger  = document.getElementById("number");
var points = [];
for ( var i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
function CustomSinCurve( scale ) {

	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

	var tx = t * 3 - 1.5;
	var ty = Math.sin( 2 * Math.PI * t );
	var tz = 0;

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};
var spriteMap = new THREE.TextureLoader().load( '../Verkefni3b/IMG/Bumpmap/gler.jpg' );
var path = new CustomSinCurve( 10 )
var geoms = [
	new THREE.CylinderGeometry( 2, 2, 2, 36 ),
	new THREE.BoxGeometry( 2, 2, 2),
	new THREE.SphereGeometry( 2,0 ),
	new THREE.CircleGeometry( 5, 32 ),
	new THREE.DodecahedronGeometry(1,0),
	new THREE.ConeGeometry( 5, 20, 32 ),
	new THREE.IcosahedronGeometry(1,0),
	new THREE.LatheGeometry( points ),
	new THREE.RingGeometry( 1, 5, 32 ),
	new THREE.PlaneGeometry( 5, 20, 32 ),
	new THREE.SphereGeometry( 5, 32, 32 ),
	new THREE.TorusGeometry( 10, 3, 16, 100 ),
	new THREE.TubeGeometry( path, 20, 2, 8, false )

]
var mats = [
	new THREE.MeshNormalMaterial(),
	new THREE.MeshBasicMaterial(),
	new THREE.MeshPhongMaterial({
		color: 0x32CD82,
		specular: 0x990000}),
	new THREE.MeshDepthMaterial(),
	new THREE.MeshLambertMaterial(),
	new THREE.MeshPhysicalMaterial(),
	new THREE.MeshStandardMaterial(),
	new THREE.MeshToonMaterial(),

]

function changeintensity()
{
	console.log(lightintensity.value)
	lightint = lightintensity.value;
}
function changeintensity2()
{
	console.log(lightintensity2.value)
	lightint2 = lightintensity2.value;
}
function changeGeom()
{
	object.geometry = geoms[geomSelect.value];
}

function changeMat()
{
	object.material = mats[matSelect.value];
}
function flag(wireframe)
{
	
	scene = new THREE.Scene();
	var cy = -33;
	var cx = -50;
	var k = 0;
	for (var i = 0; i < 204; i++) {
	var object = new THREE.Mesh( new THREE.BoxGeometry(4,4,4), new THREE.MeshPhongMaterial({color: 0x000080}));
	object.position.x = cx;
	object.position.y = cy;

	cy += 7;
	k++;
	//cx += 10;


	if(i > 71 && i < 84 )
	{
		object.material =  new THREE.MeshPhongMaterial({color: 0xffffff})
	}
	if(i > (71+36) && i < (84+36) )
	{
		object.material =  new THREE.MeshPhongMaterial({color: 0xffffff})
	}
	if(k ==6 || k==7)
	{
		object.material =  new THREE.MeshPhongMaterial({color: 0x880000})
	}

	if(k ==5 || k==8)
	{
		object.material =  new THREE.MeshPhongMaterial({color: 0xffffff})
	}
	if(i > 83 && i < (84+24) )
	{
		object.material =  new THREE.MeshPhongMaterial({color: 0x880000})
	}

	if(k == 12)
	{
		cx+= 7;
		cy = -33;
		k = 0;
	}
	if(wireframe)
	{
	object.material.wireframe = true;
	}

	objects.push(object);

}
	

}



var uppTransX,uppTransY,uppTransZ,downTransX, downTransY, downTransZ,uppRotX,uppRotY,uppRotZ,downRotX, downRotY, downRotZ,
	uppCamX,uppCamY,uppCamZ,downCamX, downCamY, downCamZ,uppCamX,uppCamY,uppCamZ,downCamX, downCamY, downRotZ,downCamFov, uppCamFov,
	ppRotCamX,uppRotCamY,uppRotCamZ,downRotCamX, downRotCamY, downRotCamZ,uppRotCamX,uppRotCamY,uppRotCamZ,downRotCamX, downRotCamY, downRotZ;

var ranges = document.getElementsByClassName("range")
  function sliderfunc(num){
  	
  	console.log("test " + ranges[num].value);
  	changeTransform = true
  	if(ranges[num].value < 0)
  	{
  		if(num == 0)
  		{
  		 downTransX = true;
  		}
  		if(num == 1)
  		{
  		 downTransY = true;
  		}
  		if(num == 2)
  		{
  		 downTransZ = true;
  		}
  		if(num == 3)
  		{
  		 downRotX = true;
  		}
  		if(num == 4)
  		{
  		 downRotY = true;
  		}
  		if(num == 5)
  		{
  		 downRotZ = true;
  		}
  		if(num == 6)
  		{
  		 downCamX = true;
  		}
  		if(num == 7)
  		{
  		 downCamY = true;
  		}
  		if(num == 8)
  		{
  		 downCamZ = true;
  		}
  		if(num == 9)
  		{
  		 downCamFov = true;
  		}
  		if(num == 10)
  		{
  		 downRotCamX = true;
  		}
  		if(num == 11)
  		{
  		 downRotCamY = true;
  		}
  		if(num == 12)
  		{
  		 downRotCamZ = true;
  		}


  	}
  	if(ranges[num].value > 0)
  	{
  		if(num == 0)
  		{
  		 uppTransX = true;
  		}
  		if(num == 1)
  		{
  		 uppTransY = true;
  		}
  		if(num == 2)
  		{
  		 uppTransZ = true;
  		}
  		if(num == 3)
  		{
  		 uppRotX = true;
  		}
  		if(num == 4)
  		{
  		 uppRotY = true;
  		}
  		if(num == 5)
  		{
  		 uppRotZ = true;
  		}
  		if(num == 6)
  		{
  		 uppCamX = true;
  		}
  		if(num == 7)
  		{
  		 uppCamY = true;
  		}
  		if(num == 8)
  		{
  		 uppCamZ = true;
  		}
  		if(num == 9)
  		{
  		 uppCamFov = true;
  		}
  		if(num == 10)
  		{
  		 uppRotCamX = true;
  		}
  		if(num == 11)
  		{
  		 uppRotCamY = true;
  		}
  		if(num == 12)
  		{
  		 uppRotCamZ = true;
  		}
  	}
  	ranges[num].value = 0;

  }


numberchanger.addEventListener("focusout",function(){
	number = numberchanger.value;
	scene = new THREE.Scene();
	AddMoreToScene(object,number);

})

var random = Math.floor(Math.random()*geoms.length);
geomSelect.value = random
var objects = new Array();
function AddMoreToScene(copy,number){
	objects = new Array();
	for (var i = 0; i < number ; i++) {
		object = new THREE.Mesh(geoms[random], mats[random])
		object.position.x = Math.floor((Math.random() - 0.5) * 100);
		object.position.z = Math.floor((Math.random() - 0.5) * 100);
		object.position.y = Math.floor((Math.random() - 0.5) * 100);
		object.rotation = copy.rotation;
		objects.push(object)
	}


}

var lights = new Array();

/*var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 1, 0 );
	lights.push( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, -1, 0 );
	lights.push( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 0, 0 );
	lights.push( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, 0, 1 );
	lights.push( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 0, -1 );
	lights.push( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( -1, 0, 0 );
	lights.push( light ); */




document.addEventListener("click",function(e){
	//console.log(e);
	if(e.target.id == "randomsize")
	{
		if(randomsizes)
		{
			randomsizes = false;
		}
		else
		{
			randomsizes = true;
		}
	}
	if(e.target.id == "wireframe")
	{
		if(object.material.wireframe)
		{
			object.material.wireframe = false;
		}
		else{
		object.material.wireframe = true;
		}
	}

	
	if(e.target.id == "pause")
	{
		if(paused)
		{
			autorotate = true;
			paused = false;
		}
		else
		{
		autorotate= false;
		getStats();
		paused = true;
		}
	}

	if(e.target.id == "lights")
	{
		if(lightson)
		{
			lightson = false;
		}
		else
		{
		lightson = true;
		}
	}

	if(e.target.id == "iceland")
	{
		raiseflag = true;
		flag(false);
		geomSelect.value = 12
		object.geometry = geoms[12];
	}
	if(e.target.id == "icelandwire")
	{
		raiseflag = true;
		flag(true);
		geomSelect.value = 12
		object.geometry = geoms[12];
	}
	if(e.target.id == "selectAll")
	{
		if(!selectAll)
		{
			selectAll = true;
		}
		else
		{
			selectAll = false;
		}

	}

	if(e.target.id == "lookAt")
	{
		camera.lookAt(object.position);
	}
})

document.body.appendChild(renderer.domElement);
camera.position.z = 30;
var geometry = geoms[gemoindex];
var material =  mats[1];
var object = new THREE.Mesh(geometry,material);



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener("mousemove",function(){
	mouse.x = -( event.clientX / width ) * 2 - 1;
	mouse.y = - ( event.clientY / height ) * 2 + 1;
	//console.log(mouse);

})
//var grid = new THREE.GridHelper(10, 100);
//	scene.add(grid);
	//grid.rotation.x = 45;
var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 1, 0 );
var light2 = new THREE.DirectionalLight( 0xffffff, 1 );
	light2.position.set( 0, -1, 0 );


var selected;
AddMoreToScene(object,number);
var render = function(){ 

	raycaster.setFromCamera( mouse, camera );
	for (var i = 0; i < objects.length; i++) {
		scene.add(objects[i]);
		objects[i].geometry = object.geometry;
		if(selectAll)
		{
			
			objects[i].material = object.material
		}


		if(autorotate)
		{
			objects[i].rotation.x += 0.01;
			objects[i].rotation.y += 0.01;
			objects[i].rotation.z += 0.01;
		}
		if(randomsizes)
		{
			objects[i].scale.x = Math.floor(Math.random() * 5)+1;
			objects[i].scale.y = Math.floor(Math.random() * 5)+1;
			objects[i].scale.z = Math.floor(Math.random() * 5)+1;

		}
		if(lightson)
		{
				light.intensity = lightint;
					scene.add( light );
				light2.intensity = lightint2;
					scene.add(light2);

		}
		if(!lightson)
		{
			light.intensity = 0;
			light2.intensity = 0;
		}
		if(changeTransform)
		{
			if(!selected)
			{
				if(downTransX)
				{
					objects[i].position.x -= 1;
					
				}
				if(uppTransX)
				{
					objects[i].position.x += 1;
				}
				if(downRotX)
				{
					objects[i].rotation.x -= 0.1;
					
				}
				if(uppRotX)
				{
					objects[i].rotation.x += 0.1;
				}
				if(downRotY)
				{
					objects[i].rotation.y -= 0.1;
					
				}
				if(uppRotY)
				{
					objects[i].rotation.y += 0.1;
				}
				if(downRotZ)
				{
					objects[i].rotation.z -= 0.1;
					
				}
				if(uppRotZ)
				{
					objects[i].rotation.z += 0.1;
				}
				if(downTransY)
				{
					objects[i].position.y -= 1;
					
				}
				if(uppTransY)
				{
					objects[i].position.y += 1;
				}
				if(downTransZ)
				{
					objects[i].position.z -= 1;
					
				}
				if(uppTransZ)
				{
					objects[i].position.z += 1;
				}
				
			}
			if(selected)
			{
				if(downTransX)
				{
					selected.position.x -= 0.1;
					
				}
				if(uppTransX)
				{
					selected.position.x += 0.1;
				}
				if(downRotX)
				{
					selected.rotation.x -= 0.1;
					
				}
				if(uppRotX)
				{
					selected.rotation.x += 0.1;
				}
				if(downRotY)
				{
					selected.rotation.y -= 0.1;
					
				}
				if(uppRotY)
				{
					selected.rotation.y += 0.1;
				}
				if(downRotZ)
				{
					selected.rotation.z -= 0.1;
					
				}
				if(uppRotZ)
				{
					selected.rotation.z += 0.1;
				}
				if(downTransY)
				{
					selected.position.y -= 0.1;
					
				}
				if(uppTransY)
				{
					selected.position.y += 1;
				}
				if(downTransZ)
				{
					selected.position.z -= 1;
					
				}
				if(uppTransZ)
				{
					selected.position.z += 1;
				}

			}
			if(uppCamX)
				{
					camera.position.x += 1;
				}
				if(uppCamY)
				{
					camera.position.y += 1;
					
				}
				if(uppCamZ)
				{
					camera.position.z += 0.5;
				}
				if(downCamX)
				{
					camera.position.x -= 1;
				}
				if(downCamY)
				{
					camera.position.y -= 1;
					
				}
				if(downCamZ)
				{
					camera.position.z -= 0.5;
				}
				if(downCamFov)
				{
					camera.fov -= 1;
				}
				if(uppCamFov)
				{
					camera.fov += 1;
				}
				if(uppRotCamX)
				{
					camera.rotation.x += 1;
				}
				if(downRotCamX)
				{
					camera.rotation.x -= 1;
				}
				if(uppRotCamY)
				{
					camera.rotation.y += 1;
				}
				if(downRotCamY)
				{
					camera.rotation.y -= 1;
				}
				if(uppRotCamZ)
				{
					camera.rotation.z += 1;
				}
				if(downRotCamZ)
				{
					camera.rotation.z -= 1;
				}

		}

			getStats();

	}
	randomsizes = false;
	changeTransform = false;
	uppTransX = false;	downTransX = false;	uppTransY = false;	downTransY = false;	downTransZ = false;	uppTransZ = false;
	uppRotX = false;	downRotX = false;	uppRotY = false;	downRotY = false;	downRotZ = false;	uppRotZ = false;
	uppCamX  = false;uppCamY = false; uppCamZ = false; downCamX = false; downCamY = false; downCamZ = false; uppCamX = false; uppCamY = false; uppCamZ = false; downCamX = false; downCamY = false; downRotZ  = false;downCamFov = false; uppCamFov = false;		
	uppRotCamX  = false;uppRotCamY = false; uppRotCamZ = false; downRotCamX = false; downRotCamY = false; downRotCamZ = false; uppRotCamX = false; uppRotCamY = false; uppRotCamZ = false; downRotCamX = false; downRotCamY = false; downRotZ  = false;
	

	getStats();
	makeNumberPretty();
	var	intersects = raycaster.intersectObjects(objects);

		if(intersects.length > 0)
		{
		var intersect = intersects[0];
		window.addEventListener("mousedown",function(e){
			console.log(intersect.object);
			selected = intersect.object;
			
		});
	}
	requestAnimationFrame(render);
	renderer.render( scene, camera );
	
}
render();
var canvas = document.getElementsByTagName("canvas")[0];
canvas.draggable = true;
canvas.addEventListener("mousewheel",function(e){
	//var scroll = window.scroll();
	//console.log(e);
	if(e.deltaY < 100)
	{
		camera.position.z -= 1;
	}
	else {
		camera.position.z += 1;
	}
})





function getStats(){
	var transformer = document.getElementById("transformer");
	var rotator = document.getElementById("rotator");
	var camerarot = document.getElementById("camerarot");

	var children = transformer.children
	children[2].value = object.position.x;
	
	children[4].value = object.position.y;
	children[6].value = object.position.z;

	var children = rotator.children
	children[2].value = object.rotation.x;
	children[4].value = object.rotation.y;
	children[6].value = object.rotation.z;
	var children = changeCam.children
	children[2].value = camera.position.x;
	children[4].value = camera.position.y;
	children[6].value = camera.position.z;
	children[8].value = camera.fov;
	var children = camerarot.children
	children[2].value = camera.rotation.x;
	children[4].value = camera.rotation.y;
	children[6].value = camera.rotation.z;
	if(numberchanger.onfocus = false)
	{
	numberchanger.value + objects.length();
	}

}

function makeNumberPretty(){
	if(object.rotation.x > 360 || object.rotation.x < -360)
	{
		object.rotation.x = 0;
	}
	if(object.rotation.y > 360 || object.rotation.y < -360)
	{
		object.rotation.y = 0;
	}
	if(object.rotation.z > 360 || object.rotation.z  -360)
	{
		object.rotation.z = 0;
	}
	if(camera.rotation.x > 360 || camera.rotation.x < -360)
	{
		camera.rotation.x = 0;
	}
	if(camera.rotation.y > 360 || camera.rotation.y < -360)
	{
		camera.rotation.y = 0;
	}
	if(camera.rotation.z > 360 || camera.rotation.z  -360)
	{
		camera.rotation.z = 0;
	}

}
