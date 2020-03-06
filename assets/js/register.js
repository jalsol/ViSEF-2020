function FormWarning(str) {
	var warn = document.getElementById('form-warning');
	warn.innerHTML = str;
}

async function move(s) {
	if($('div.active').index() == 2) quit();
	$('#newuser-carousel').carousel(s);
	await sleep(750);
	if($('div.active').index() == 2) init();
}

function show_close() {
	$('#close-form').modal('toggle');
}

function show_confirm() {
	$('#confirm-form').modal('toggle');
}


function dismiss_modal() {
	if($('div.active').index() == 2) quit();
	// confirm
	$('#close-form').modal('toggle');
	$('#newuserform').modal('toggle');
}

var name = null;
var phonenumber = null;
var city = null;
var country = null;

function newuser() {
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
		alert('Hãy điền tên nước.');
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
		show_confirm();
	}
}

function create_new_user() {
	$.ajax({
		url: '../../backend/create_new_user.php',
		type: 'post',
		data: {
			name: name,
			phonenumber: phonenumber,
			city: city,
			country: country,
			preselectedItems: preselectedItems
		}
	}).done(() => {
		show_confirm();
	});
}
