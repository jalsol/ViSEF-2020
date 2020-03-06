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

function show_confirm() {
	$('#confirm-form').modal('toggle');
}

function dismiss_modal() {
	if($('div.active').index() == 2) quit();
	// confirm
	$('#confirm-form').modal('toggle');
	$('#newuserform').modal('toggle');
}

var name = null;
var phonenumber = null;
var city = null;
var country = null;

function newuser() {
	// if(!validname && !validphonenumber)
	// 	FormWarning('Tên và SĐT đều trống!');
	// else if(!validname)
	// 	FormWarning('Tên trống!');
	// else if(!validphonenumber)
	// 	FormWarning('SĐT trống!');
	// else {
	// 	FormWarning('');
	// 	// console.log(name.value);
	// 	// console.log(phonenumber.value);
	// 	$('#newuser-carousel').carousel('next');
	// }
	move('next'); // from register.js
}

function validateCheckbox() {
	var a = [];
	$("input:checkbox[name=checkbox-list]:checked").each(function() {
    	a.push($(this).val());
	});
	if(a.length < 3) {
		alert('not enough');
	}
	else {
		move('next');
	}
	console.log(a);
}
