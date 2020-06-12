function trainNewUsers() {
	$('#trainNewUsers').on('click', function() {
        console.log("training new users started");
		$.ajax({
            type: "POST",
            url: "../../backend/train_data.php",
            data: {
                type: "New_Users"
            },
            success: function (response) {
                console.log(response);
            }
        });
	});
}

function trainRecommendation() {
	$('#trainRecommendation').on('click', function() {
        console.log("training recommendation started");
		$.ajax({
            type: "POST",
            url: "../../backend/train_data.php",
            data: {
                type: "Recommendation"
            },
            success: function (response) {
                console.log(response);
            }
        });
	});
}