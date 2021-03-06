var game = game || {};


game.WolfWalkingTweens = function(entity){

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

    this.tail = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 34}, 250 )
	    .easing( TWEEN.Easing.Elastic.InOut )
	    .onUpdate( function () {
	    	entity.tail.rotation = this.x;
	    } )
	    .repeat(Infinity)

	// Legs
    this.frontleftleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 17}, 200 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.frontleftleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.frontrightleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 17}, 300 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.frontrightleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.backleftleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 20}, 200 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.backleftleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

    this.backrightleg = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: -Math.PI / 20}, 300 )
	    .easing( TWEEN.Easing.Bounce.InOut )
	    .onUpdate( function () {
	    	entity.backrightleg.rotation = this.x;
	    } )
	    .repeat(Infinity)

	this.StartWalking = function(){
		this.body.start();
		this.head.start();
		this.tail.start();
		this.frontleftleg.start();
		this.frontrightleg.start();
		this.backrightleg.start();
		this.backleftleg.start();

	};

	this.StopWalking = function(){
		this.body.stop();
		this.head.stop();
		this.tail.stop();
		this.frontleftleg.stop();
		this.frontrightleg.stop();
		this.backrightleg.stop();
		this.backleftleg.stop();	
	};
};

game.Wolf = function(position) {

	this.maxSpeed = 150.0;

	this.attackSpeed = 1.0;	// in seconds.
	this.attackCooldown = 0.0;
	this.attackDamage = 15.0;

	this.enemy = true;

	this.states = {
		hunting: 'hunting',
		attacking: 'attacking'
	};

	this.currentState = this.states.hunting;

	// All the textures
	// Head, body, tail, 4 legs	
	this.coretexture = PIXI.Texture.fromImage("sprites/core.png");
	this.headtexture = PIXI.Texture.fromImage("sprites/wolfhead.png");
	this.bodytexture = PIXI.Texture.fromImage("sprites/wolfbody.png");
	this.tailtexture = PIXI.Texture.fromImage("sprites/tail.png");
	this.frontleftlegtexture = PIXI.Texture.fromImage("sprites/frontleftleg.png");
	this.frontrightlegtexture = PIXI.Texture.fromImage("sprites/frontrightleg.png");
	this.backleftlegtexture = PIXI.Texture.fromImage("sprites/backleftleg.png");
	this.backrightlegtexture = PIXI.Texture.fromImage("sprites/backrightleg.png");

	// Creating each sprite body part
	this.core = new PIXI.Sprite(this.coretexture);
	this.body = new PIXI.Sprite(this.bodytexture);
	this.head = new PIXI.Sprite(this.headtexture);
	this.tail = new PIXI.Sprite(this.tailtexture);
	this.frontleftleg = new PIXI.Sprite(this.frontleftlegtexture);
	this.frontrightleg = new PIXI.Sprite(this.frontrightlegtexture);
	this.backleftleg = new PIXI.Sprite(this.backleftlegtexture);
	this.backrightleg = new PIXI.Sprite(this.backrightlegtexture);

	// Adding child body parts to the core -- order matters
	this.core.addChild(this.frontrightleg);
	this.core.addChild(this.tail);
	this.core.addChild(this.backrightleg);
	this.core.addChild(this.head);
	this.core.addChild(this.body);
	this.core.addChild(this.backleftleg);
	this.core.addChild(this.frontleftleg);


	// Anchoring the core of the wolf
	this.core.anchor.x = 0.5;
	this.core.anchor.y = 0.5;
	this.core.position.x = position.x;
	this.core.position.y = position.y;

	// Anchoring the body parts to the core of the wolf
	// Body
	this.body.anchor.x = 0.0;
	this.body.anchor.y = 0.0;

	// Head
	this.head.anchor.x = 0.65;
	this.head.anchor.y = 0.2;

	// Front Left Leg
	this.frontleftleg.anchor.x = 0.25;
	this.frontleftleg.anchor.y = -0.8;

	// Front Right Leg
	this.frontrightleg.anchor.x = -0.60;
	this.frontrightleg.anchor.y = -0.70;

	// Back Left Leg
	this.backleftleg.anchor.x = -1.5;
	this.backleftleg.anchor.y = -0.35;

	// Back Right Leg
	this.backrightleg.anchor.x = -1.25;
	this.backrightleg.anchor.y = -0.35;

	// Tail
	this.tail.anchor.x = -1.0;
	this.tail.anchor.y = -0.15;

	// Add to stage
	game.stage.addChild(this.core);

	this.initMoving();
	this.initHealth(15);
	this.initCollision(this.core.position, 15);

	// Flip on x-axis
	this.core.scale.x = -1;

	this.walkingtweens = new game.WolfWalkingTweens(this); 

	this.walkingtweens.StartWalking();

	var wolf = this;

    var death = new TWEEN.Tween( { x: 0.0 } )
	    .to( { x: Math.PI * 2}, 125 )
	    .easing( TWEEN.Easing.Linear.None )
	    .onUpdate( function () {
	    	// Rotates the core 
	    	wolf.core.rotation = this.x;
	    } )
	 	.onComplete(function() {
	 		// When done it calls the remove function to delete everything
	 		if (game.stage.children.indexOf(wolf.core) !== -1) {
	 			//var i = game.state.currentScreen.enemies.indexOf(wolf);
				//game.state.currentScreen.enemies.splice(i,1);	
				game.stage.removeChild(wolf.core);
				wolf.removeCollision();
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

	this.position = function() {
		return { x: this.core.position.x, y: this.core.position.y };
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

_.extend(game.Wolf.prototype, game.Moving);
_.extend(game.Wolf.prototype, game.HP);
_.extend(game.Wolf.prototype, game.SteeringBehaviors);
_.extend(game.Wolf.prototype, game.Collision);
