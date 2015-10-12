#pragma strict

var block : GameObject; //prefab block
var gui : GameObject; //the gui handler

var initialSpeed : float = 5; //speed of character
var canMove : boolean = true;

//determines blockmaking speed
var timeSince : float = -3;
var creationInterval : float = 0.5;

function Start () {
	InvokeRepeating("makeBlock", 3, 0.5);
}

function Update () {
	if (canMove) {
		//constantly move player forward
		transform.Translate(0, 0, Time.deltaTime * initialSpeed + 0.01 * Time.timeSinceLevelLoad);
	
		//let player move left/right
		if (Input.GetKey(KeyCode.LeftArrow)) transform.Translate(Time.deltaTime * -10, 0, 0);
		if (Input.GetKey(KeyCode.RightArrow)) transform.Translate(Time.deltaTime * 10, 0, 0);
	}
	
	
	//increase blockmaking over time 
	timeSince += Time.deltaTime;
	if (timeSince > creationInterval) {
		makeBlock();
		//mod for future
		timeSince = 0;
		creationInterval /= 1.01;
	}
	
}



//instantiate a random block
function makeBlock() {
	if (canMove)
		Instantiate(block, new Vector3(transform.position.x + Random.Range(-10, 10), transform.position.y, transform.position.z + Random.Range(8, 12)), transform.rotation); 
}

//do stuff upon crashing
function OnTriggerEnter(other : Collider) {
	canMove = false; //stop movement
	
	//alert gui to make appropriate changes
	gui.SendMessage("triggered");
}
