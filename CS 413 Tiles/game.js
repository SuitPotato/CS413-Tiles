/* TODO

1. Menu Setup 
2. Game Setup


*/




/**********************************************************************************************************
Game Global Variables/Constants
**********************************************************************************************************/
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_SCALE = 4;

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

loader
	.load(setup);
	
/**********************************************************************************************************
Global Variables
**********************************************************************************************************/	

var player, world;

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
	
	// PLACE MUSIC FILES HERE
	
	/*******************************************************************************************************
	Scene Creations
	*******************************************************************************************************/
	// Introduction Menu
	introScene = new Container();
	stage.addChild(introScene);
	
	// How to Play Scene
	instructScene = new Container();
	stage.addChild(instructScene);
	instructScene.visible = false;
	
	// Credits Scene
	creditScene = new Container();
	stage.addChild(creditScene);
	creditScene.visible = false;
	
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
	introMenu = new Sprite(id[""]);
	playBut = new Sprite(id[""]);
	instructBut = new Sprite(id[""]);
	creditsBut = new Sprite(id[""]);
	
	introScene.addChild(introMenu);
	
	// Buttons Container
	var introMenuButtons = new Container();
	introMenuButtons.position.x = 300;
	introMenuButtons.position.y = 300;
	introScene.addChild(introMenuButtons);
	
		// Stagger effect
			// Play
				// Instruction
					// Credits
	
	
		// Play Button
		introMenuButtons.addChild(playBut);
		playBut.anchor.x = 0.5;
		playBut.anchor.y = 0.5;
		playBut.position.x = 0;
		playBut.position.y = 0;
		playBut.interactive = true;
		playBut.on('mousedown', playHandler)			// No handlers yet
		
		// Instruction Button
		introMenuButtons.addChild(instructBut);
		instructBut.anchor.x = 0.5;
		instructBut.anchor.y = 0.5;
		instructBut.position.x = 50;
		instructBut.position.y = 100;
		instructBut.interactive = true;
		instructBut.on('mousedown',instructHandler);	// No handlers yet
		
		
		// Credits button
		introMenuButtons.addChild(creditsBut);
		creditsBut.anchor.x = 0.5;
		creditsBut.anchor.y = 0.5;
		creditsBut.position.x = 100;
		creditsBut.position.y = 200;
		creditsBut.interactive = true;
		creditsBut.on('mousedown', creditHandler);		// No handlers yet
	
	/*******************************************************************************************************
	How to Play/Instructions Scene 
	*******************************************************************************************************/
	instructScreen = new Sprite(id[""]);
	instructScene.addChild(instructScreen);
	
		// Back Button
		instructBack = new Sprite(id[""]);
		instructScene.addChild(back);
		instructBack.anchor.x = 0.5;
		instructBack.anchor.y = 0.5;
		instructBack.position.x = 300;		// Dummy Value
		instructBack.position.y = 400;		// Dummy Value
		instructBack.interactive = true;
		instructBack.on('mousedown', backHandler);
		
	/*******************************************************************************************************
	Credits Scene 
	*******************************************************************************************************/	
	creditScreen = new Sprite (id[""]);
	creditScene.addChild(creditScreen);
	
		// Back Button
		creditBack = new Sprite(id[""]);
		creditScene.addChild(creditBack);
		creditBack.anchor.x = 0.5;
		creditBack.anchor.y = 0.5;
		creditBack.position.x = 300;	// Dummy Value
		creditBack.position.y = 400; 	// Dummuy Value
		creditBack.interactive = true;
		creditBack.on('mousedown', backHandler);
	
	/*******************************************************************************************************
	Game Scene 
	*******************************************************************************************************/
	gameScreen = new Sprite(id[""]);
	gameScene.addChild(gameScreen);
	
	/*******************************************************************************************************
	Game Over Scene 
	*******************************************************************************************************/
	gameOverScreen = new Sprite(id[""]);
	gameOverScene.addChild(gameOverScreen);
	
	
	/*******************************************************************************************************
	Win Scene 
	*******************************************************************************************************/
	gameWinScreen = new Sprite(id[""]);
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


/**********************************************************************************************************
Handlers
**********************************************************************************************************/
	
	/*******************************************************************************************************
	Game Handler
	*******************************************************************************************************/
	function gameHandler(e){
		introScene.visible = false;
		//state = game;
		gameScene.visible = true;
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
	
		/*******************************************************************************************************
		Keyboard Control Definitions
		*******************************************************************************************************/
		// Variables storing Ascii keyCodes for WASD keys
		var up = keyboard(87),	// W
			down = keyboard(83), // A
			left = keyboard(65), // S
			right = keyboard(68); // D
			interact = keyboard(69); // E
			
		up.press = function() {
			
		}
		
		up.release = function() {
			
		}
		
		down.press = function() {
			
		}
		
		down.release = function() {
			
		}
		left.press = function() {
			
		}
		
		left.release = function() {
			
		}
		
		right.press = function() {
			
		}
		
		right.release = function() {
			
		}
		
		interact.press = function() {
			
		}
		
		interact.release = function() {
			
		}
	
	