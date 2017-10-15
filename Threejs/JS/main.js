function SimpleRotatingBox(){
	var scene = new THREE.Scene();
	var aspect = window.innerWidth / window.innerHeight;
	var camera = new THREE.PerspectiveCamera( 45, aspect, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
		var count = 0;
	var geometry = new THREE.BoxGeometry( 2 , 2, 2 );
	var material = new THREE.MeshNormalMaterial({
		wireframe: true,
		color: 0x32CD32
	});
	var cube = new THREE.Mesh( geometry, material );
	var cubes = new Array();
	function createCube()
	{
		cube = new THREE.Mesh(geometry,material);
		cube.position.x = Math.floor((Math.random() - 0.5) * 100);
		cube.position.z = Math.floor((Math.random() - 0.5) * 100);
		cube.position.y = Math.floor((Math.random() - 0.5) * 100);

		cubes.push(cube);
	}
		camera.position.z = 10;

	var render = function () {
		scene.add( cube);
		cube.rotation.x += 0.01;
	  	cube.rotation.y -= 0.01;


	  requestAnimationFrame( render );
	  renderer.render( scene, camera );
	};

	render();
}
//SimpleRotatingBox()
function DrawingLines(){
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
	camera.position.set(0, 0, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var scene = new THREE.Scene();

	var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 10, 0));
	geometry.vertices.push(new THREE.Vector3(10, 0, 0));
	geometry.vertices.push(new THREE.Vector3(-10, 0, 0));


	var line = new THREE.Line(geometry, material);
	scene.add(line);
	renderer.render(scene, camera);
}
//DrawingLines();
function IcosahedronWithLights(){
	var scene = new THREE.Scene();
	var aspect = window.innerWidth / window.innerHeight;
	var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
		var count = 0;
	var geometry = new THREE.IcosahedronGeometry(20, 0);
	var material = new THREE.MeshPhongMaterial({
		wireframe: false,
		color: 0x32CD82,
		shinyness: 2,
		specular: 0x009900
	});
	var cube = new THREE.Mesh( geometry, material );
	var cubes = new Array();

	camera.position.z = 100;

	var light = new THREE.PointLight(0x322D32);
	light.intensity = 5;
	light.position.set(11,1,25);
	var light2 = new THREE.PointLight(0x0000FF);
	light2.intensity = 100;
	light2.position.set(10,50,2);

	var render = function () {
		scene.add(cube);
		scene.add(light);
		scene.add(light2);
		cube.rotation.x += 0.01;
	  	cube.rotation.y -= 0.01;


	  requestAnimationFrame( render );
	  renderer.render( scene, camera );
	};

	render();
}
//IcosahedronWithLights()

function TextureTest(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
	var mesh;

	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// add icosahedron
	var geometry = new THREE.SphereGeometry(24, 32, 32 );
	THREE.ImageUtils.crossOrigin = true;
	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = true;
	textureLoader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNdO3P6oO6Dc-KRr8_ETOgEKBlfUCLx1uA7WWjZ7lYRBInSJ4Gw', function(texture) {
	  texture.wrapS = texture.wrapT =   THREE.RepeatWrapping;
	    texture.repeat.set( 2, 1 );
	    var material = new THREE.MeshLambertMaterial( {map: texture} );
	  mesh = new THREE.Mesh( geometry, material );
	  scene.add( mesh );
	  
	  render();
	});


	camera.position.z = 100;

	// so many lights
	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 1, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, -1, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 0, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( 0, 0, 1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 0, -1 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
	light.position.set( -1, 0, 0 );
	scene.add( light );


	var render = function () {
	  requestAnimationFrame( render );
	  mesh.rotation.y += 0.01;
	  renderer.render(scene, camera);
	};
}
//TextureTest();
