var width = 320;
var height = 0;

var streaming = false;

var video = null;
var canvas = null;
var photo = null;
var startbutton = null;

function startupVideoFrame() {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	photo = document.getElementById('photo');
	startbutton = document.getElementById('startbutton');
	mul = document.getElementById('startmul');

	video.addEventListener('canplay', function(ev){
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth/width);

			if (isNaN(height)) {
				height = width / (4/3);
			}
		
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);

	startbutton.addEventListener('click', function(ev){
		captureImage();
		ev.preventDefault();
	}, false);

	mul.addEventListener('click', function(ev){
		captureMultipleImages(5, 1);
		ev.preventDefault();
	}, false);

	clearCanvas();
}

function initCameraStream() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(function(stream) {
		video.srcObject = stream;
		video.play();
	})
	.catch(function(err) {
		console.log("An error occurred: " + err);
	});
}

function quitCameraStream() {
	video.srcObject.getTracks().forEach(function(track) {
 		track.stop();
	});
}

function clearCanvas() {
	var context = canvas.getContext('2d');
	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);

	var data = canvas.toDataURL('image/png');
	photo.setAttribute('src', data);
}

function captureImage() {
	var context = canvas.getContext('2d');
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);
	
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
		getCapturedImages();
	} else {
		clearCanvas();
	}
}

function getCapturedImages() {
	var myImg = document.getElementById("photo").src;
	$.ajax({
		url: '../../backend/save_captured_images.php',
		type: 'post',
		data: {
			encoded_img: myImg,
			id: id
		},
		success: function(data) {
			console.log(data);
		}
	});
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureMultipleImages(picnum=5, time=1) {
	for(var i = 0; i < picnum; i++) {
		captureImage();
		await sleep(time * 1000);
	}
}
window.addEventListener('load', startupVideoFrame, false);
