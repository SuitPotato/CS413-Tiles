/* TODO

1. Menu Setup 
2. Game Setup


*/

/**********************************************************************************************************
Game Global Variables/Constants
**********************************************************************************************************/
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_SCALE = 1;

var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;

/**********************************************************************************************************
Attaching to Gameport
**********************************************************************************************************/
// Attach to the HTML document via gameport ID
var gameport = document.getElementById("gameport");

/**********************************************************************************************************
Aliasing 
**********************************************************************************************************/
// Using Aliasing 
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	TextureCache = PIXI.utils.TextureCache,
	Texture = PIXI.Texture,
	Sprite = PIXI.Sprite
	Text = PIXI.Text;
	
/**********************************************************************************************************
Creating the Stage and appending to Gameport
**********************************************************************************************************/	
// Creating the PIXI stage and renderer
var stage = new Container(),
	renderer = autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, {backgroundColor: 0x000000});
	
// Appying to the HTML view
gameport.appendChild(renderer.view);

/**********************************************************************************************************
Loader
**********************************************************************************************************/	
// Load Music, Assets, and Setup

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

loader
	.add("images/assets.json")
	
	.add('images/map.json')
	.add('images/tileset.png')
	
	.add("audio/Bump.wav")
	.add("audio/Back.wav")
	.add("audio/Credits Tween.wav")
	.add("audio/Hit.wav")
	.add("audio/How to Play Tween.wav")
	.add("audio/Play Tween.wav")
	.add("audio/Select.wav")
	.load(setup);
	
/**********************************************************************************************************
Global Variables
**********************************************************************************************************/	

var player, world, character;
var backSound, creditsTweenSound, hitSound, instructSound, playSound, selectSound;
var tu, wallLayer, floorLayer;
/**********************************************************************************************************
Setup Function
**********************************************************************************************************/
function setup(){
	
	/*******************************************************************************************************
	Sprite Creation Setup
	*******************************************************************************************************/
	// Creating an alias to the texture atlas
	id = PIXI.loader.resources["images/assets.json"].textures;
	
	/*******************************************************************************************************
	Assigning Music Stuff 
	*******************************************************************************************************/
	
	backSound = PIXI.audioManager.getAudio("audio/Back.wav");
	creditsTweenSound = PIXI.audioManager.getAudio("audio/Credits Tween.wav");
	// hitSound = PIXI.audioManager.getAudio("audio/Hit.wav");
	instructSound = PIXI.audioManager.getAudio("audio/How to Play Tween.wav");
	playSound = PIXI.audioManager.getAudio("audio/Play Tween.wav");
	selectSound = PIXI.audioManager.getAudio("audio/Select.wav");
	bumpSound = PIXI.audioManager.getAudio("audio/Bump.wav")
	
	
	/*******************************************************************************************************
	Scene Creations
	*******************************************************************************************************/
	// Introduction Menu
	
	introScene = new Container();
	stage.addChild(introScene);
	
	// How to Play/Instructions Scene
	instructScene = new Container();
	stage.addChild(instructScene);
	instructScene.visible = false;
	
		// Positioned to Right of the Menu
		// Tween in
		instructScene.position.x = 800;
		instructScene.position.y = 0;
	
	
	// Credits Scene
	creditScene = new Container();
	stage.addChild(creditScene);
	creditScene.visible = false;
	
		// Positioned to the Left of the Menu
		// Tween in
		creditScene.position.x = -800;
		creditScene.position.y = 0;
	
	// Game Scene
	gameScene = new Container();
	stage.addChild(gameScene);
	gameScene.visible = false;
	
	// Game Over Scene
	gameOverScene = new Container();
	stage.addChild(gameOverScene);
	gameOverScene.visible = false;
	
	// Win Scene
	gameWinScene = new Container();
	stage.addChild(gameWinScene);
	gameWinScene.visible = false;
	
	
	/*******************************************************************************************************
	Introduction Scene 
	*******************************************************************************************************/
	introMenu = new Sprite(id["Introduction Screen.png"]);
	playBut = new Sprite(id["New Game Button.png"]);
	instructBut = new Sprite(id["How to Play Button.png"]);
	creditsBut = new Sprite(id["Credits Button.png"]);
	
	introScene.addChild(introMenu);
	
	// Buttons Container
	var introMenuButtons = new Container();
	introMenuButtons.position.x = 350;
	introMenuButtons.position.y = 270;
	introScene.addChild(introMenuButtons);
	
		// Stagger effect
			// Play
				// Instruction
					// Credits
	
	
		// Play Button
		introMenuButtons.addChild(playBut);
		playBut.anchor.x = 0.5;
		playBut.anchor.y = 0.5;
		playBut.position.x = -550;
		playBut.position.y = 0;
		createjs.Tween.get(playBut.position).to({x: 0, y: 0}, 1000, createjs.Ease.bounceOut);
		playSound.play();
		playBut.interactive = true;
		playBut.on('mousedown', gameHandler)			
		
		// Instruction Button
		introMenuButtons.addChild(instructBut);
		instructBut.anchor.x = 0.5;
		instructBut.anchor.y = 0.5;
		instructBut.position.x = -550;
		instructBut.position.y = 120;
		createjs.Tween.get(instructBut.position).wait(500).to({x: 50, y: 120}, 1000, createjs.Ease.bounceOut);
			setTimeout(function(){instructSound.play();}, 750);
		instructBut.interactive = true;
		instructBut.on('mousedown',instructHandler);	
		
		
		
		// Credits button
		introMenuButtons.addChild(creditsBut);
		creditsBut.anchor.x = 0.5;
		creditsBut.anchor.y = 0.5;
		creditsBut.position.x = -550;
		creditsBut.position.y = 240;
		createjs.Tween.get(creditsBut.position).wait(1000).to({x: 100, y: 240}, 1000, createjs.Ease.bounceOut);
			setTimeout(function(){creditsTweenSound.play();}, 1250);
		creditsBut.interactive = true;
		creditsBut.on('mousedown', creditHandler);		
	
	/*******************************************************************************************************
	How to Play/Instructions Scene 
	*******************************************************************************************************/
	instructScreen = new Sprite(id["How to Play Screen.png"]);
	instructScene.addChild(instructScreen);
	
		// Back Button
		instructBack = new Sprite(id["Back Button.png"]);
		instructScene.addChild(instructBack);
		instructBack.anchor.x = 0.5;
		instructBack.anchor.y = 0.5;
		instructBack.position.x = 250;		
		instructBack.position.y = 500;		
		instructBack.interactive = true;
		instructBack.on('mousedown', generalBackHandler);
		
	/*******************************************************************************************************
	Credits Scene 
	*******************************************************************************************************/	
	creditScreen = new Sprite (id["Credits Screen.png"]);
	creditScene.addChild(creditScreen);
	
		// Back Button
		creditBack = new Sprite(id["Back Button.png"]);
		creditScene.addChild(creditBack);
		creditBack.anchor.x = 0.5;
		creditBack.anchor.y = 0.5;
		creditBack.position.x = 250;	
		creditBack.position.y = 500; 	
		creditBack.interactive = true;
		creditBack.on('mousedown', generalBackHandler);
	
	/*******************************************************************************************************
	Game Scene 
	*******************************************************************************************************/
	tu = new TileUtilities(PIXI);
	world = tu.makeTiledWorld('images/map.json', "images/tileset.png");
	gameScene.addChild(world);
	
	var character = world.getObject("playerCharacter");
	player = new PIXI.Sprite(id["standDown.png"]);
	
	player.x = character.x;
	player.y = character.y;
	player.anchor.x = 0;
	player.anchor.y = 0;
	
	var entityLayer = world.getObject("Entities");
	entityLayer.addChild(player);
	
	wallLayer = world.getObject("Walls").data;
	floorLayer = world.getObject("Floor").data;
	
	
	player.direction = MOVE_NONE;
	player.moving = false;
	/*******************************************************************************************************
	Game Over Scene 
	*******************************************************************************************************/
	gameOverScreen = new Sprite(id["Introduction Screen.png"]);			
	gameOverScene.addChild(gameOverScreen);
	
	
	/*******************************************************************************************************
	Win Scene 
	*******************************************************************************************************/
	gameWinScreen = new Sprite(id["Introduction Screen.png"]);				
	gameWinScene.addChild(gameOverScreen)
	
	/*******************************************************************************************************
	Render Setup!
	*******************************************************************************************************/
	renderer.render(stage);
	state = introduction;
	gameLoop();
}

/**********************************************************************************************************
GameLoop 
**********************************************************************************************************/
function gameLoop() {
	requestAnimationFrame(gameLoop);
	state();
	renderer.render(stage);
	
}


/**********************************************************************************************************
State Functions
**********************************************************************************************************/

function introduction() {

}

function game() {
	updateCamera();
	contain();
	
}

/**********************************************************************************************************
Handlers
**********************************************************************************************************/
	
	/*******************************************************************************************************
	Game Handler
	*******************************************************************************************************/
	function gameHandler(e){
		introScene.visible = false;
		state = game;
		gameScene.visible = true;
		selectSound.play();
	}
	
	/*******************************************************************************************************
	How to Play/Instructions Handler
	*******************************************************************************************************/
	function instructHandler(e){
		introScene.visible = false;
		instructScene.visible = true;
		selectSound.play();
		introScene.position.y = -800;
		
		createjs.Tween.get(instructScene.position).to({x: 0, y: 0}, 1000, createjs.Ease.bounceOut);
		
	}
	
	/*******************************************************************************************************
	Credits Handler
	*******************************************************************************************************/
	function creditHandler(e){
		introScene.visible = false;
		creditScene.visible = true;
		selectSound.play();
		introScene.position.y = -800;
		createjs.Tween.get(creditScene.position).to({x: 0, y: 0}, 1000, createjs.Ease.bounceOut);
	}
	
	/*******************************************************************************************************
	General Back Handler
	*******************************************************************************************************/
	// Going back in the main menu
	function generalBackHandler(e){
		introScene.visible = true;
		instructScene.visible = false;
		creditScene.visible = false;
		backSound.play();
		instructScene.position.x = 800;
		creditScene.position.x = -800;
		
		createjs.Tween.get(introScene.position).to({x: 0, y: 0}, 1000, createjs.Ease.bounceOut);
		
	}

/**********************************************************************************************************
Helper Functions
**********************************************************************************************************/
	
	/**********************************************************************************************************
	Keyboard Function
	**********************************************************************************************************/
	
	// Keyboard function to support general Ascii Key Codes function creation
	function keyboard(keyCode) {
		// Empty Key Object
		var key = {};
		// Code:keyCode
		key.code = keyCode;
		
		// Default Settings for button positions
		key.isDown = false;
		key.isUp = true;
		key.press = undefined;
		key.release = undefined;
	  
		// When the key is pressed, call the downHandler
		key.downHandler = function(event) {
			// Verify the keyCode parameter matches the object code
			if (event.keyCode === key.code) {
				// If the key is up then key press
				if (key.isUp && key.press) key.press();
				
				// Settings for button positions
				key.isDown = true;
				key.isUp = false;
			}
			// Cancels the event
			event.preventDefault();
		};

		//The is released, call the upHandler
		key.upHandler = function(event) {
			// Verify the keyCode parameter matches the object code
			if (event.keyCode === key.code) {
				// If the key is down and released then release
				if (key.isDown && key.release) key.release();
				
				// Setting for button positions
				key.isDown = false;
				key.isUp = true;
			}
		// Cancels the event
		event.preventDefault();
		};

	  //Attach event listeners
	  window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	  );
	  window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	  );
	  return key;
	}
	
		/***************************************************************************************************
		Keyboard Control Definitions
		****************************************************************************************************/
	
		// Variables storing Ascii keyCodes for WASD keys
		var up = keyboard(87),	// W
			down = keyboard(83), // A
			left = keyboard(65), // S
			right = keyboard(68); // D
			
		up.press = function(){
			if(down.isDown || right.isDown || left.isDown)
				player.direction = MOVE_NONE;
			else {
				player.direction = MOVE_UP;
				move();
			}
		}
		
		up.release = function() {
			if(!down.isDown)
				player.direction = MOVE_NONE;
		}
		
		down.press = function() {
			if(up.isDown || right.isDown || left.isDown)
				player.direction = MOVE_NONE;
			else{
				player.direction = MOVE_DOWN;
				move();
			}
		}
		
		down.release = function() {
			if(!up.isDown)
				player.direction = MOVE_NONE;
		}
		left.press = function() {
			if(down.isDown || right.isDown || up.isDown)
				player.direction = MOVE_NONE;
			else{
			player.direction = MOVE_LEFT;
			move();
			}
		}
		
		left.release = function() {
			
			if(!right.isDown)
				player.direction = MOVE_NONE;
		}
		
		right.press = function() {
			if(down.isDown || up.isDown || left.isDown)
				player.direction = MOVE_NONE;
			else{
				player.direction = MOVE_RIGHT;
				move();
			}
		}
		
		right.release = function() {
			if(!left.isDown)
				player.direction = MOVE_NONE;
		}
			
	
		
	/***************************************************************************************************
	Move Function
	****************************************************************************************************/
	function move(){
		
		
		if (player.direction == MOVE_NONE){
			player.moving = false;
			tweenFix();
			//console.log("Stopped");
			return;
		}
		player.moving = true;
		//console.log("Moving");
		
		if (player.direction == MOVE_UP){
			createjs.Tween.get(player).to({y: player.y - 32}, 200).call(move);
			
			setTimeout(function(){
				if (contain() != true){
					createjs.Tween.get(player).to({y: player.y + 32}, 0).call(move);
				}
			}, 250);
		}	
		if (player.direction == MOVE_DOWN){
			createjs.Tween.get(player).to({y: player.y + 32}, 200).call(move);
			setTimeout(function(){
				if (contain() != true){
					createjs.Tween.get(player).to({y: player.y - 32}, 0).call(move);
				}
			}, 250);
		}
		if (player.direction == MOVE_RIGHT){
			createjs.Tween.get(player).to({x: player.x + 32}, 200).call(move);
			setTimeout(function(){
				if (contain() != true){
					createjs.Tween.get(player).to({x: player.x - 32}, 0).call(move);
				}
			}, 250);
		}
		if (player.direction == MOVE_LEFT){
			
			createjs.Tween.get(player).to({x: player.x - 32}, 200).call(move);
			setTimeout(function(){
				if (contain() != true){
					createjs.Tween.get(player).to({x: player.x + 32}, 0).call(move);
				}
			}, 250);
		}	
	}
	
	
	
	
	/***************************************************************************************************
	Update Camera Function
	****************************************************************************************************/
	function updateCamera(){
		gameScene.x = -player.x*GAME_SCALE + GAME_WIDTH/2 - player.width/2*GAME_SCALE;
		gameScene.y = -player.y*GAME_SCALE + GAME_HEIGHT/2 + player.height/2*GAME_SCALE;
		//console.log(stage.x);
		//console.log(-player.x);
		//console.log(-player.width);
		gameScene.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -gameScene.x));
		gameScene.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -gameScene.y));
	}
	
	/***************************************************************************************************
	Contain Function
	****************************************************************************************************/
	
	function contain(){
		
		// player is the sprite
		// wallLayer is all of the GID values for walls
		// need to create an array to loop through for all gid values 1,2,3,7,9
		var playerOnFloor;
		
		if ((tu.hitTestTile(player, floorLayer, 8, world, "some")).hit == true) {
			
			console.log("8");
			return true;
		}
		else if ((tu.hitTestTile(player, floorLayer, 11, world, "some")).hit == true){
			
			console.log("11");
			return true;
		}
		else if ((tu.hitTestTile(player, floorLayer, 12, world, "some")).hit == true){
			
			console.log("12");
			return true;
		} 
		else if ((tu.hitTestTile(player, floorLayer, 4, world, "some")).hit == true){
			;
			console.log("4");
			return true;
		} 
		else if ((tu.hitTestTile(player, floorLayer, 6, world, "some")).hit == true){
			
			console.log("6");
			return true;
		}
		else {
		
			if ((tu.hitTestTile(player, wallLayer, 9, world, "some")).hit == true){
				
				gameScene.visible = false;
				gameWinScene.visible = true;
			}
			else{
				bumpSound.play()
				console.log("Not on floor.");
			return false;
			}
		}
	}
	
	/***************************************************************************************************
	Tween Fix Function
	****************************************************************************************************/
	function tweenFix(){
		if (player.x % 32 != 0){
			console.log("I'm off!: x");
			console.log(player.x % 32);
			player.position.x = player.position.x - (player.x % 32);
			
			
		}
		
		if (player.y % 32 != 0){
			console.log("I'm off; y");
			console.log(player.y % 32);
			player.position.y = player.position.y - (player.y % 32);
		}
	}
	

	
	
	
