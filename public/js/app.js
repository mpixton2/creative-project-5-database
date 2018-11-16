

$(document).ready(function(){
  $("#postComment").click(function(e){
      e.preventDefault();
      var myobj = {book:$("#book").val(),review:$("#review").val()};
      var jobj = JSON.stringify(myobj);
      var url = "reviews";
      console.log("Posting");
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {}
      })
  });
  
  $("#getReviews").click(function(e) {
    e.preventDefault();
    console.log("Getting");
    $.getJSON('reviews', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li><h4>Movie: " + com.book + "</h4> Review: " + com.review + "</li>";
      }
      everything += "</ul>";


      $("#reviews").html(everything);
    })
    
  })
  
  $("#getQuery").click(function(e) {
      e.preventDefault();
      console.log("Starting query");
      var q = $("#query").val();
      console.log("Query: ", q);
      var url = "query";
      var myobj = {Query:q};
      var jobj = JSON.stringify(myobj);
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data, textStatus) {
          console.log(data);
          var mosteverything = "<ul>";
          var everything = "";
          var i = 0;
          for(var comment in data) {
            com = data[comment];
            mosteverything += "<li>Review: " + com.review + "</li>";
            everything = "<h3>" + com.book + "</h3>";
            i = i + 1;
          }
          mosteverything += "</ul>";
          everything = everything + mosteverything;
          if (i == 0) {
            console.log("No results");
            everything = "<p>No review yet. </p>"
          }
          $("#reviews").html(everything);
        }
      })
  })
});



