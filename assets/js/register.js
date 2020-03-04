function FormWarning(str) {
	var warn = document.getElementById('form-warning');
	warn.innerHTML = str;
}

function newuser() {
	// var name = document.getElementById('fullname');
	// var phonenumber = document.getElementById('phone-number');
	// var validname = name.validity.valid;
	// var validphonenumber = phonenumber.validity.valid;
	
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

async function move(s) {
	if($('div.active').index() == 2) quit();
	$('#newuser-carousel').carousel(s);
	await sleep(1000);
	if($('div.active').index() == 2) {
		console.log($('div.active').index());
		init();
	}
}

function validateCheckbox() {
	var a = [];
	$("input:checkbox[name=checkbox-list]:checked").each(function() {
    	a.push($(this).val());
	});
	console.log(a);
}
