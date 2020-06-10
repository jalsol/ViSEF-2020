function trainNewUsers() {
	$('#trainNewUsers').on('click', function() {
		$.ajax({
            type: "POST",
            url: "../../backend/train_data.php",
            data: {
                type: "New_Users"
            },
            success: function (response) {
                console.log(response);
                console.log("training new users started");
            }
        });
	});
}

function trainRecommendation() {
	$('#trainRecommendation').on('click', function() {
		$.ajax({
            type: "POST",
            url: "../../backend/train_data.php",
            data: {
                type: "Recommendation"
            },
            success: function (response) {
                console.log(response);
                console.log("training recommendation started");
            }
        });
	});
}