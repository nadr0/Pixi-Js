var game = game || {};


game.BearWalkingTweens = function(entity){

    this.body = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI/25}, 500 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.body.position.y = this.x;
	    	entity.body.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.head = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 13}, 450 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.head.rotation = this.x;
	    } )
	    .repeat(Infinity)

	// Legs
    this.frontleftleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 17}, 300 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.frontleftleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.frontrightleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 17}, 400 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.frontrightleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.backleftleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 20}, 300 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.backleftleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.backrightleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 20}, 400 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.backrightleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

	this.StartWalking = function(){
		this.body.start();
		this.head.start();
		this.frontleftleg.start();
		this.frontrightleg.start();
		this.backrightleg.start();
		this.backleftleg.start();

	};

	this.StopWalking = function(){
		this.body.stop();
		this.head.stop();
		this.frontleftleg.stop();
		this.frontrightleg.stop();
		this.backrightleg.stop();
		this.backleftleg.stop();	
	};
};

game.Bear = function(position) {

	this.initMoving();

	this.maxSpeed = 100.0;

	this.attackSpeed = 2.0;	// in seconds.
	this.attackCooldown = 0.0;
	this.attackDamage = 25.0;
	this.enemy = true;

	this.states = {
		hunting: 'hunting',
		attacking: 'attacking'
	};

	this.currentState = this.states.hunting;

	// All the textures
	this.coretexture = PIXI.Texture.fromImage("sprites/core.png");
	this.headtexture = PIXI.Texture.fromImage("sprites/bearhead.png");
	this.bodytexture = PIXI.Texture.fromImage("sprites/bearbody.png");
	this.frontleftlegtexture = PIXI.Texture.fromImage("sprites/bearfrontleftleg.png");
	this.frontrightlegtexture = PIXI.Texture.fromImage("sprites/bearfrontrightleg.png");
	this.backleftlegtexture = PIXI.Texture.fromImage("sprites/bearbackleftleg.png");
	this.backrightlegtexture = PIXI.Texture.fromImage("sprites/bearbackrightleg.png");

	// Creating each sprite body part
	this.core = new PIXI.Sprite(this.coretexture);
	this.body = new PIXI.Sprite(this.bodytexture);
	this.head = new PIXI.Sprite(this.headtexture);;
	this.frontleftleg = new PIXI.Sprite(this.frontleftlegtexture);
	this.frontrightleg = new PIXI.Sprite(this.frontrightlegtexture);
	this.backleftleg = new PIXI.Sprite(this.backleftlegtexture);
	this.backrightleg = new PIXI.Sprite(this.backrightlegtexture);

	// Adding child body parts to the core -- order matters
	this.core.addChild(this.frontrightleg);
	this.core.addChild(this.backrightleg);
	this.core.addChild(this.head);
	this.core.addChild(this.body);
	this.core.addChild(this.backleftleg);
	this.core.addChild(this.frontleftleg);

	// Anchoring the core of the bear
	this.core.anchor.x = 0.5;
	this.core.anchor.y = 0.5;
	this.core.position.x = position.x;
	this.core.position.y = position.y;

	// Anchoring the body parts to the core of the bear
	// Body
	this.body.anchor.x = 0.0;
	this.body.anchor.y = 0.0;

	// Head
	this.head.anchor.x = 0.9;
	this.head.anchor.y = -0.45;
	this.head.rotation = -Math.PI/36;

	// Front Left Leg
	this.frontleftleg.anchor.x = -0.1;
	this.frontleftleg.anchor.y = -0.75;

	// Front Right Leg
	this.frontrightleg.anchor.x = -0.7;
	this.frontrightleg.anchor.y = -0.70;

	// Back Left Leg
	this.backleftleg.anchor.x = -1.5;
	this.backleftleg.anchor.y = -0.5;

	// Back Right Leg
	this.backrightleg.anchor.x = -0.9;
	this.backrightleg.anchor.y = -0.5;

	// Add to stage
	game.stage.addChild(this.core);

	this.initHealth(20);
	this.initCollision(this.core.position, 25);

	// Flip on x-axis
	this.core.scale.x = 1;

	this.walkingtweens = new game.BearWalkingTweens(this);

	this.walkingtweens.StartWalking();

	var bear = this;

    var death = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 125 )
	    .easing( TWEEN.Easing.Linear.None )
	    .onUpdate( function () {
	    	// Rotates the core 
	    	bear.core.rotation = this.x;
	    } )
	 	.onComplete(function() {
	 		// When done it calls the remove function to delete everything
	 		if (game.stage.children.indexOf(bear.core) !== -1) {
			game.stage.removeChild(bear.core);
			bear.removeCollision();
			//var i = game.state.currentScreen.enemies.indexOf(bear);
			//game.state.currentScreen.enemies.splice(i,1);
			}
		})

	this.facepaul = function(screen){
		if(this.core.position.x > screen.paul.core.position.x){
			this.core.scale.x = 1;
		}
		else
		{
			this.core.scale.x = -1;
		}
	};

	// Removes all the components of this object from the game
	this.remove = function(){
		game.stage.removeChild(this.core);
		this.removeCollision();
		var i = game.state.currentScreen.enemies.indexOf(this);
		game.state.currentScreen.enemies.splice(i,1);	
	};

	// The function that gets called when it dies; health = 0;
	this.kill = function(){
		// Plays the death animation
		death.start();
	};

	this.position = function() {
		return { x: this.core.position.x, y: this.core.position.y };
	};

	this.handleInput = function(input) {

	};

	this.update = function(delta, screen) {

		// are we near paul?
		var near = screen.nearPaul(this);

		if (this.currentState === this.states.hunting) {
			this.facepaul(screen);
			this.force = this.seek(screen.paul);

			// if we are near paul chang state to attacking.
			if (near) {
				this.currentState = this.states.attacking;
			}
		}
		else if (this.currentState === this.states.attacking) {
			this.facepaul(screen);
			// stop the wolf
			this.force = { x: 0.0, y: 0.0 };
			this.velocity = { x: 0.0, y: 0.0 };

			if (this.attackCooldown > this.attackSpeed) {
				screen.attackPaul(this, this.attackDamage);

				this.attackCooldown = 0.0;
			}

			this.attackCooldown += delta;

			// if we are not near paul anymore change state
			if (!near) {
				this.currentState = this.states.hunting;
			}
		}
		this.updateSteering(delta);
	};
};

_.extend(game.Bear.prototype, game.Moving);
_.extend(game.Bear.prototype, game.SteeringBehaviors);
_.extend(game.Bear.prototype, game.HP);
_.extend(game.Bear.prototype, game.Collision);
