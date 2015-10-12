#pragma strict
var playerMove : Component;
var crashed : boolean = false;
var finalTime : float;
var width : int;

function Start() {
}

function OnGUI () {
	//restart game when pressed
	if (crashed)
		if (GUI.Button(new Rect(Screen.width / 2 - 50, Screen.height / 2 - 25, 100, 50), "Restart")) Application.LoadLevel("MainScene");
	
	//display elapsed time
	var elapsed : int;
	if (crashed) elapsed = finalTime;
	else elapsed = Time.timeSinceLevelLoad;
	GUI.TextField(Rect(0, 0, 80, 20), "" + elapsed);
	GUI.TextField(Rect(Screen.width - 80, 0, 80, 20), "" + PlayerPrefs.GetInt("high_score"));
	
}

//do stuff when player collides
function triggered() {
	crashed = true;
	finalTime = Time.timeSinceLevelLoad; //stop timer
	
	//save high score 
	if (finalTime > PlayerPrefs.GetInt("high_score")) {
		PlayerPrefs.SetInt("high_score", finalTime);
		PlayerPrefs.Save();
	}
}