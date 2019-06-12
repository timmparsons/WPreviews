jQuery.support.cors = !0;
jQuery.ajaxSetup({
    cache: !1
});
var reviewsToDisplay = 25;
jQuery(document).ready(function() {
        var reviews = '';
        if (jQuery('#reviewRoot').length > 0) {
            jQuery.ajax({
                cache: !1,
                crossDomain: !0,
                type: 'GET',
                url: 'https://peoplespublicconnections.azurewebsites.net/api/eEndorsements?code=jPJa5HqNmg9oH9FDwIUlrxmJv9fPlJmLB4n0OyWcC5DUjRdc8w2evQ==' + jQuery.now(),
                contentType: 'jsonp',
                success: function(data) {
                    var surveys = JSON.parse(data);
                    for (var i = 0; i < reviewsToDisplay; i++) {
                        buildReviews(surveys, i)
                    }
                    jQuery('#reviewLoader').remove();
                    jQuery('#reviewRoot').html(reviews)
                },
                error: function(object, err) {
                    console.log(object);
                    console.log(err)
                }
            })
        }

        function buildReviews(review, i) {
            console.log(review.endorsement_responses[i].answers[0].rating)
            var reviewItem = "<div class='review' id='review-" + (i + 1) + "'><div class='review-title'>" + stars(parseInt(review.endorsement_responses[i].answers[0].rating)) + "<h5 style='margin: 2px;'>" + properCase(review.endorsement_responses[i].first_name) + " on " + dateFormat(review.endorsement_responses[i].endorsement_request.sent) + "</h5></div><div><p class='review-body'>" + review.endorsement_responses[i].answers[1].answer + "</p></div></div>";
            reviews += reviewItem
        }

        function stars(score) {
            var stars = '<span class="stars">';
            var blanks = 5 - score;
            for (var i = 0; i < score; i++) {
                stars += '<i class="fas fa-star"></i>'
            }
            for (var j = 0; j < blanks; j++) {
                stars += '<i class="far fa-star"></i>'
            }
            return stars + '</span>'
        }

        function properCase(name) {
            return name.charAt(0).toUpperCase() + name.slice(1)
        }

        function dateFormat(date) {
            var dateArr = date.slice(0, 10).split('-');
            return dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0]
        }
    }) 

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

        <style>
            .loader {
                border: 8px solid #f3f3f3; /* Light grey */
                border-top: 8px solid #004791; /* Blue */
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 2s linear infinite;
                margin: 0 auto;
                margin-top: 20%;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .review {
                margin: 0 auto;
                width: 100%;
                margin-top: 30px;
            }

            .review-title {
                padding: 10px;
                border-radius: 15px 15px 0px 0px;
                margin-top: 0px;
            }

            .review-body {
                padding-left: 10px;
                padding-right: 10px;
                margin-top: 2px;
            }

            .stars {
                color: #004791;
                font-size: 1.25em;
            }
        </style>