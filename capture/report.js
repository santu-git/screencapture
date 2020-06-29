//http://deepliquid.com/content/Jcrop_API.html
//https://codepen.io/rijii49/pen/Jopwmz?editors=101
// https://ourcodeworld.com/articles/read/281/top-7-best-image-cropping-javascript-and-jquery-plugins
(function () {
  if (window.jQuery) {
    console.log("jQuet Loaded");
  } else {
    console.log("jQuery required for reporting plugin");
    return;
  }
  var modal =
    '\
  <div id="formDialog" style="width: 100%; display: none;top:100;position:absolute;z-index:9999">\
    <div style="margin:auto;border: 1px solid black;padding: 10px;background-color: #e9e9e9;">\
    <h4 style="padding:5px;text-align:center;margin-bottom:20px;">Create Ticket for Application </h4>\
    <div style="display:inline-flex;"> \
      <div style="padding:10px;">\
        <div class="form-group">\
          <label for="issueTitle">Issue Summary:</label>\
          <input type="text" id="issueTitle" class="form-control" />\
        </div>\
        <div class="form-group">\
          <label for="issueDescription">Issue Description:</label>\
          <textarea id="issueDescription" rows="4" cols="50" class="form-control"> </textarea>\
        </div>\
        <input id="issueImageData" type="hidden" >\
        <button id="submitIssue" class="btn btn-success">+ Create Ticket</button>\
        <button id="closeForm" class="btn btn-danger">Cancel</button>\
      </div>\
      <div style="padding:10px; ">\
        <p>Click on image to select & attach to issue</p>\
        <div style="overflow:auto; height: 500px; width: 600px;">\
          <div id="captured-images" class="row">\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>';
  $(document).ready(function () {
    $("body").append(modal);
    $(".report-issue").click(function () {
      reportIssue();
      //$( "#formDialog" ).css('display','block');
    });
    $("#closeForm").click(function () {
      $("#issueTitle").val("");
      $("#issueDescription").val(""),
        $("#issueImageData").val(""),
        $("#issueImage").attr("src", "");
      $("#formDialog").css("display", "none");
    });
    
  });

  function renderCapturedImages() {
    capturedImages = JSON.parse(localStorage.getItem("captured"));
    $("#captured-images").html("");
    if (capturedImages) {
      capturedImages.forEach((data, idx) => {
        var imageThumb = $(
          '<div data-selected="no" data-index=' +
            idx +
            ' class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;cursor:pointer;">\
            <i class="fa fa-check-circle" aria-hidden="true" style="color:green;display:none;position:absolute"></i>\
            <img src="' +
            data +
            '" style="height:100%;object-fit:contain"/>\
          </div>'
        );
        $("#captured-images").append(imageThumb);
        //$("#img-" + (idx + 1)).attr("src", data);
      });
    }
    $(".img-thumb").click(function () {
      if ($(this).attr("data-selected") == "no") {
        $(this).attr("data-selected", "yes");
        $(this).find("i").css("display", "block");
      } else {
        $(this).attr("data-selected", "no");
        $(this).find("i").css("display", "none");
      }
    });
  }

  function reportIssue() {
    $("#selectionDialog").css("display", "none");
    $("#formDialog").css("display", "flex");
    renderCapturedImages();
  }
})();
