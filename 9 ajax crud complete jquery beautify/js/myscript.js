$(function() {
    // $("#updatebtn").hide();
    console.log("Script loaded");
    loadReceipe();
    $("#receipediv").on("click", ".deletebutton", handleDelete);
    $("#receipediv").on("click", ".updatebutton", handleUpdate);
    $("#addbtn").click(handleAdd);
    $("#updatebtn").click(sendAjaxUpdate);
});

function sendAjaxUpdate() {
    console.log("Send ajax PUT request");
    var title = $("#newTitle").val();
    var body = $("#newBody").val();
    var id = $("#hiddenid").html();
    console.log(id);

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "PUT",
        data: { title, body },
        success: function() {
            $("#newTitle").val("");
            $("#newBody").val("");
            $("#hiddenid").html("");
            $("#updatebtn").hide();

            loadReceipe();
        },
    });
}

function handleUpdate() {
    var btn = $(this);
    var id = btn.attr("data-id");

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "GET",
        // data: { title: t, body: b },
        success: function(response) {
            console.log(response);
            $("#newTitle").val(response.title);
            $("#newBody").val(response.body);
            $("#hiddenid").append(response._id);
            $("#updatebtn").show();
        },
    });
}

function handleAdd() {
    // var t = $("#newTitle").val();
    // var b = $("#newBody").val();
    var title = $("#newTitle").val();
    var body = $("#newBody").val();

    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        // data: { title: t, body: b },
        data: { title, body },
        success: function() {
            $("#newTitle").val("");
            $("#newBody").val("");
            loadReceipe();
        },
        error: handleError,
    });
}

function handleDelete() {
    var btn = $(this);

    var id = btn.attr("data-id");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: loadReceipe,
    });
}

function loadReceipe() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        success: getRequestData,
        error: handleError,
    });
}

function handleError() {
    $("#receipediv").empty();
    $("#receipediv").html("Error on server");
}

function getRequestData(response) {
    $("#receipediv").empty();
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        $("#receipediv").append(
            `<div class = "receipe col-sm-1 col-md-3 col-lg-6">

            <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
    
    </div>
    <div class="col-md-12 bg-dark text-light">
      <div class="card-body">
        <h5 class="card-title">${response[i].title}</h5>
        <p class="card-text">${response[i].body}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <button class="btn btn-success updatebutton " data-id=${response[i]._id}>Update</button>
        <button class="btn btn-danger deletebutton " data-id=${response[i]._id}>Delete</button>
      </div>
    </div>
  </div>
</div>`
            // "<div class = receipe><h3>" +float-right
            //   response[i].title +
            //   "</h3><p>" +
            //   response[i].body +
            //   "</p></div>"
        );
    }
}