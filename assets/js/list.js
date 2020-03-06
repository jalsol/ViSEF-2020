toastr.options = {
	"closeButton": true,
	"newestOnTop": false,
	"timeOut": "1500",
	"extendedTimeOut": "0",
	"positionClass": "toast-bottom-right"
}

function showSimilar(data, s) {
	var name = document.getElementById('showItemName');
	name.innerHTML = '<br>' + s;
	data = $.parseJSON(data);
	$('#similaritemslist > tbody').empty();
	var i = 0;
	$.each(data, function() {
		$('#similaritemslist > tbody').append(
			'<tr class="clickable_row">' +
				'<th>' +
					'<img class="product_img" src="../../database/items_img/' + this[0] + '.jpg">' +
				'</th>' +
				'<th>' +
					data[i++][1] +
				'</th>' +
			'</tr>'
		);
	});
}

function SearchByName(id) {
	var th = document.getElementById(id);
	var s = th.innerHTML;
	$.ajax({
		url: '../../backend/search_by_name.php',
		type: 'post',
		data: {name: s},
		success: function(data) {showSimilar(data, s);}
	});
}

function RecommendOnClick() {
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
			SearchByName('name1');
		});
	});
}

function genbutton() {
	$.ajax({
		url: '../../backend/createlist.php',
		success: (data) => {
			data = $.parseJSON(data);

			$.each(data, (index, value) => {
				$('#list').append(
					'<button type="button" id="' +
					value['id'] +
					'" data-placement="top" class="btn btn-lg btn-primary getid"' +
					'data-toggle="popover" title="SĐT: ' +
					value['phone'] + '" data-content="Vị trí: ' +
					value['city'] + ', '
					+value['country'] + '">' +
					value['name'] + '</button>'
				)
			});
		}
	}).done(() => {
		$(function () { $('#list *').popover({trigger: 'hover'})});
		RecommendOnClick();
	});
}

function getRecommendation(data) {
	var fail = 0;
	if(data == '[]') fail = 1;

	data = $.parseJSON(data);
	$('#recommendationlist > tbody').empty();
	var counter = 1;
	$.each(data, function() {
		$('#recommendationlist > tbody').append(
			'<tr class="clickable_row">' +
				'<th>' +
					'<img class="product_img" src="../../database/items_img/' + this.id + '.jpg">' +
				'</th>' +
				'<th id="name' + (counter++).toString()+'">' +
					this.name +
				'</th>' +
			'</tr>'
		);
	});

	if(fail) {
		toastr.error('[INFO]<br>Chưa có dữ liệu của khách hàng này.');
		$('#similaritemslist > tbody').empty();
		var name = document.getElementById('showItemName');
		name.innerHTML = '<br><br>';
	}
	else {
		toastr.success('[INFO]<br>Gợi ý thành công.');
	}
}

function search() {
	$('#username').on('keyup keypress', function(e) {
		var keyCode = e.keyCode || e.which;
		if(keyCode === 13) {
			e.preventDefault();
			return false;
		}

		var value = $(this).val().toLowerCase();
		$('#list *').filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		})
	});
}

function startscan() {
	$('#startscan').on('click', function() {
		$.ajax({
			url: '../../backend/run.php',
			success: function(data) {
				console.log(data);
			}
		});
	});
}

function gencheckbox() {
	for(var id = 1; id <= 10; id++) {
		var i = id.toString();
		$('#checkbox-area').append(
			'<li>' +
                '<input type="checkbox" id="checkbox-unit-' + i + '" name="checkbox-list" value="' + i + '"/>' +
                '<label for="checkbox-unit-' + i + '"><img src="./database/items_img/' + i + '.jpg" /></label>' +
            '</li>'
        )
	}
}

// main
$(document).ready(function() {
	genbutton();
	gencheckbox();
	search();
	startscan();
});