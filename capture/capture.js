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
  var jcrop_api;
  var modal =
    '\
  <div id="selectionDialog" style="width: 100%; display: none;top:100;position:absolute;z-index:9999;top:0px">\
    <div style="margin:auto;border: 1px solid black;padding: 10px;background-color: #e9e9e9;">\
      <button class="close-capture-window btn btn-danger" style="float:right">Close</button>\
      <button class="report-issue btn btn-primary" style="float:right;margin-right: 10px;">Report</button>\
      <h4 style="padding:5px;text-align:center;margin-bottom:20px;">Create Ticket for Application </h4>\
      <div style="display:inline-flex;"> \
        <div style="padding:10px;width: 600">\
          <div style="display:inline-flex;margin-bottom: 10px;"> \
          <h4>Captured Images</h4>\
          &nbsp;&nbsp;&nbsp;&nbsp;\
          <button id="clear-captured" type="button" class="btn btn-danger btn-sm">Clear All</button>\
          </div>\
          <div class="row">\
            <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;display:flex">\
              <img id="img-1" class="col-md-12" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;display:flex">\
              <img id="img-2" class="col-md-12" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;display:flex">\
              <img id="img-3" class="col-md-12" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;display:flex">\
              <img id="img-4" class="col-md-12" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;display:flex">\
              <img id="img-5" class="col-md-12" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
            </div>\
          </div>\
        </div>\
        <div style="padding:10px; ">\
          <p>Click+Drag on image to crop</p>\
          <div style="overflow:auto; height: 500px; width: 500px;">\
            <img id="issueImage" src="https://via.placeholder.com/400x170?text=No%20Image" width="500"/>\
          </div>\
        </div>\
    </div>\
  </div>';
  $(document).ready(function () {
   
  
    $("head").append(
      "<style> \
      .card{\
        position: relative;\
        display: -webkit-box;\
        display: -ms-flexbox;\
        display: flex;\
        -webkit-box-orient: vertical;\
        -webkit-box-direction: normal;\
        -ms-flex-direction: column;\
        flex-direction: column;\
        min-width: 0;\
        word-wrap: break-word;\
        background-color: #fff;\
        background-clip: border-box;\
        border: 1px solid rgba(0,0,0,.125);\
        border-radius: .25rem;\
      }\
      .float-button{\
        width:50px;\
        height:50px;\
        border-radius: 50% !important;\
        z-index:9999;\
        position:fixed;\
        bottom:70px;\
        right:10px;\
        font-size: 2.3rem !important;\
        box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.4) !important;\
      }\
      </style>"
    );
    // var btnContainer = $(
    //   "<div style='z-index:9999;position:fixed'></div>"
    // ).attr("id", "btn-container");

    var captureButton = $("<button></button>")
      .html('<i class="fa fa-camera" aria-hidden="true"></i>')
      .attr("id", "capture-me")
      .attr("class", "btn btn-primary float-button");

    var reportButton = $("<button style='bottom:10px;'></button>")
      .html('<i class="fa fa-bug" aria-hidden="true"></i>')
      .attr("class", "btn btn-danger report-issue float-button");

    //$("body").prepend(btnContainer);

    $("body").prepend(captureButton);
    $("body").prepend(reportButton);
    $("body").append(modal);
    $("#capture-me").click(function () {
        debugger;
        captureScreen();
        $("html, body").animate({
            scrollTop: 0
        }, "fast");
    });
    $(".close-capture-window").click(function () {
      $("#selectionDialog").css("display", "none");
      $("#formDialog").css("display", "none");
    });
    $("#clear-captured").click(function () {
      localStorage.setItem("captured", JSON.stringify([]));
      $(".img-thumb")
        .find("img")
        .each(function () {
          console.log($(this).attr("id"));
          $(this).attr(
            "src",
            "https://via.placeholder.com/400x170?text=No%20Image"
          );
        });
    });
  });
  function pushImage(img) {
    var capturedImages = JSON.parse(localStorage.getItem("captured"));
    if (capturedImages === null) {
      capturedImages = [img];
    } else {
      if (capturedImages.length == 5) {
        capturedImages.pop();
      }
      capturedImages.unshift(img);
    }
    localStorage.setItem("captured", JSON.stringify(capturedImages));
  }
  function renderFromLocalstorage() {
    var capturedImages = JSON.parse(localStorage.getItem("captured"));
    if (capturedImages) {
      capturedImages.forEach((data, idx) => {
        $("#img-" + (idx + 1)).attr("src", data);
      });
    }
  }
  function captureScreen() {
      debugger
    renderFromLocalstorage();
    html2canvas(document.body).then(function (canvas) {
      var canvasUrl = canvas.toDataURL();
      $("#selectionDialog").css("display", "flex");
      $("#formDialog").css("display", "none");
      $("#issueImage").attr("src", canvasUrl);
      $("#issueImageData").val(canvasUrl);
      var orgImg = $("#issueImage").get(0);
      $("#issueImage").Jcrop(
        {
          onSelect: showCoords,
        },
        function () {
          jcrop_api = this;
        }
      );

      function showCoords(c) {
        // Scale crop params
        var aspectRatio = orgImg.naturalWidth / orgImg.width;
        var startX = c.x * aspectRatio;
        var startY = c.y * aspectRatio;
        var cropWidth = c.w * aspectRatio;
        var cropHeight = c.h * aspectRatio;

        var newCanv = document.createElement("canvas");
        newCanv.width = orgImg.naturalWidth;
        newCanv.height = orgImg.naturalHeight;
        var ctx = newCanv.getContext("2d");
        ctx.drawImage(orgImg, 0, 0, orgImg.naturalWidth, orgImg.naturalHeight);
        var imageData = ctx.getImageData(startX, startY, cropWidth, cropHeight);
        var orginalImage = newCanv.toDataURL();
        var canvas1 = document.createElement("canvas");
        canvas1.width = cropWidth;
        canvas1.height = cropHeight;
        var ctx1 = canvas1.getContext("2d");
        ctx1.rect(0, 0, cropWidth, cropHeight);
        ctx1.fillStyle = "white";
        ctx1.fill();
        ctx1.putImageData(imageData, 0, 0);
        var croppedImage = canvas1.toDataURL();
        //$("#img-1").attr("src", croppedImage);
        pushImage(croppedImage);
        renderFromLocalstorage();
      }
    });
  }
})();
