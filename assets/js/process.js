// Generate buttons for users list
function genbutton() {
	$.ajax({
		url: '../../backend/createlist.php',
		success: (data) => {
			data = $.parseJSON(data);

			// Add buttons to #list
			$.each(data, (index, value) => {
				$('#list').append('<button type="button" id="'+value['id']+'" data-placement="top" class="btn btn-lg btn-primary getid" data-toggle="popover" title="Phone: '+value['phone']+'" data-content="Place: '+value['city']+', '+value['country']+'">'+value['name']+'</button>')
			});
		}
	}).done(() => {
		// enable popover
		$(function () {
			$('#list *').popover({
				trigger: 'hover'
			})
		});
		
		// get recommendation on click
		$(function() {
			$('#list *').on('click', function() {
				var name = document.getElementById(this.id);
				var s = name.innerHTML;
				var div = document.getElementById('showName');
				div.innerHTML = '<br>Gợi ý cho người dùng: <strong>'+s+'</strong>';
				$.ajax({
					url: '../../backend/recommend.php',
					type: 'post',
					data: {userid: this.id},
					success: getRecommendation
				}).done(() => {
					var th = document.getElementById('name1');
					var s = th.innerHTML;
					console.log(th);
					$.ajax({
						url: '../../backend/search_by_name.php',
						type: 'post',
						data: {name: s},
						success: function(data) {
							toastr.options = {
								"closeButton": true,
								"newestOnTop": false,
								"timeOut": "1500",
								"extendedTimeOut": "0",
								"positionClass": "toast-top-right"
							}
							var name = document.getElementById('showItemName');
							name.innerHTML = '<br>'+s;
							data = $.parseJSON(data);
							$('#similaritemslist > tbody').empty();
							var i = 0;
							$.each(data, function() {
								$('#similaritemslist > tbody').append(
									'<tr class="clickable_row"><th><img src="../../database/items_img/'+this[0]+'.jpg"></th><th>'+data[i++][1]+'</th></tr>'
								);
							});
						}
					});
					$(function () {
						$('#recommendationlist > tbody > .clickable_row *').on('click', function() {
							var th = document.getElementById(this.id);
							var s = th.innerHTML;
							$.ajax({
								url: '../../backend/search_by_name.php',
								type: 'post',
								data: {name: s},
								success: function(data) {
									toastr.options = {
										"closeButton": true,
										"newestOnTop": false,
										"timeOut": "1500",
										"extendedTimeOut": "0",
										"positionClass": "toast-top-right"
									}
									var name = document.getElementById('showItemName');
									name.innerHTML = '<br>'+s;
									data = $.parseJSON(data);
									$('#similaritemslist > tbody').empty();
									var i = 0;
									$.each(data, function() {
										$('#similaritemslist > tbody').append(
											'<tr class="clickable_row"><th><img src="../../database/items_img/'+this[0]+'.jpg"></th><th>'+data[i++][1]+'</th></tr>'
										);
									});
									toastr.success('[INFO]<br>Gợi ý thành công.');
								}
							});
						})
					})
				});
			});
		})
	});
}

// Get Recommendation + info popup + show name
function getRecommendation(data) {

	// Options for toastr.js popup
	toastr.options = {
		"closeButton": true,
		"newestOnTop": false,
		"timeOut": "1500",
		"extendedTimeOut": "0",
		"positionClass": "toast-top-right"
	}

	// Check whether data is empty
	var fail = 0;
	if(data == '[]') fail = 1;

	// Parse data from string to JSON and create table
	data = $.parseJSON(data);
	$('#recommendationlist > tbody').empty();
	var counter = 1;
	$.each(data, function() {
		$('#recommendationlist > tbody').append(
			'<tr class="clickable_row"><th><img src="../../database/items_img/'+this.id+'.jpg"></th><th id="name'+counter.toString()+'">'+this.name+'</th></tr>'
		);
		counter++;
	});

	// show popup
	if(fail) {
		toastr.error('[INFO]<br>Chưa có dữ liệu của khách hàng này.');
		$('#similaritemslist > tbody').empty();
	}
	else 
		toastr.success('[INFO]<br>Gợi ý thành công.');
}

// Search for users (which are buttons)
function search() { $('#username').on('keyup keypress', function(e) {
	// Disable Enter (avoid Enter -> Refresh)
	var keyCode = e.keyCode || e.which;
	if(keyCode === 13) {
		e.preventDefault();
		return false;
	}

	// Show result that matches the keyword
	var value = $(this).val().toLowerCase();
	$('#list *').filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
	})
});}

function startscan() { $('#startscan').on('click', function() {
	$.ajax({
		url: '../../backend/run.php',
		success: function(data) {
			console.log(data);
		}
	});
	
});}

function FormWarning(str) {
	var warn = document.getElementById('form-warning');
	warn.innerHTML = str;
}

function newuser() {
	var name = document.getElementById('fullname');
	var phonenumber = document.getElementById('phone-number');
	var validname = name.validity.valid;
	var validphonenumber = phonenumber.validity.valid;
	
	if(!validname && !validphonenumber)
		FormWarning('Tên và SĐT đều trống!');
	else if(!validname)
		FormWarning('Tên trống!');
	else if(!validphonenumber)
		FormWarning('SĐT trống!');
	else {
		FormWarning('');
		// console.log(name.value);
		// console.log(phonenumber.value);
		$('#newuser-carousel').carousel('next');
	}
}

// Main function
$(document).ready(function() {
	genbutton();
	search();
	startscan();
});