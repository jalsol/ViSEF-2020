function FormWarning(str) {
	var warn = document.getElementById('form-warning');
	warn.innerHTML = str;
}

async function move(s) {
	if($('div.active').index() == 2) quitCameraStream();
	$('#newuser-carousel').carousel(s);
	await sleep(750);
	if($('div.active').index() == 2) initCameraStream();
}

function closeRegisterForm() {
	$('#close-form').modal('toggle');
}

function showConfirmForm() {
	$('#confirm-form').modal('toggle');
}

function dismissModal() {
	if($('div.active').index() == 2) quitCameraStream();
	// confirm
	$('#close-form').modal('toggle');
	$('#newuserform').modal('toggle');
}

var name = null;
var phonenumber = null;
var city = null;
var country = null;

function validateForm() {
	name = $('#fullname').val();
	phonenumber = $('#phone-number').val();
	city = $('#city').val();
	country = $('#country').val();

	if(name == "")
		alert('Hãy điền tên.');
	else if(phonenumber == "")
		alert('Hãy điền số điện thoại.');
	else if(city == "")
		alert('Hãy điền thành phố/tỉnh.');
	else if(country == "")
		alert('Hãy điền tên quốc gia.');
	else if(/\D/.test(phonenumber))
		alert('Số điện thoại chỉ được chứa các chữ số.')
	else
		move('next'); // from register.js
}

var preselectedItems = [];
function validateCheckbox() {
	$("input:checkbox[name=checkbox-list]:checked").each(function() {
    	preselectedItems.push($(this).val());
	});
	if(preselectedItems.length < 3) {
		alert('Không đủ.');
	}
	else {
		showConfirmForm();
	}
}

var id = null;
function addNewUserToDB() {
	$.ajax({
		url: '../../backend/add_new_user_to_db.php',
		type: 'post',
		data: {
			name: name,
			phonenumber: phonenumber,
			city: city,
			country: country,
			preselectedItems: preselectedItems
		},
		success: function(data) {
			id = parseInt(data);
			console.log('the id of the new user is', id);
		}
	}).done(() => {
		showConfirmForm();
		move('next');
	});
}
