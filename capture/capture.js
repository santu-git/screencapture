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
  <div id="formDialog" style="width: 100%; display: none;top:100;position:absolute;z-index:9999">\
    <div style="margin:auto;border: 1px solid black;padding: 10px;background-color: #e9e9e9;">\
      <button id="close-capture-window" style="float:right">Close</button>\
      <h4 style="padding:5px;text-align:center;margin-bottom:20px;">Create Ticket for Application </h4>\
      <div style="display:inline-flex;"> \
        <div style="padding:10px;width: 600">\
          <p>Captured</p>\
          <div class="row">\
            <div class="card col-6" style="height:150px;overflow:hidden;">\
              <button class="btn btn-clear btn-sm" style="color:red;position:absolute;"> \
                <i class="fa fa-trash"></i>\
              </button>\
              <img id="img-1" src="" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="card col-6" style="height:150px;overflow:hidden;">\
              <button class="btn btn-clear btn-sm" style="color:red;position:absolute;"> \
                <i class="fa fa-trash"></i>\
              </button>\
              <img id="img-2" src="" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="card col-6" style="height:150px;overflow:hidden;">\
              <button class="btn btn-clear btn-sm" style="color:red;position:absolute;"> \
                <i class="fa fa-trash"></i>\
              </button>\
              <img id="img-3" src="" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="card col-6" style="height:150px;overflow:hidden;">\
              <button class="btn btn-clear btn-sm" style="color:red;position:absolute;"> \
                <i class="fa fa-trash"></i>\
              </button>\
              <img id="img-4" src="" style="height:100%;object-fit:contain"/>\
            </div>\
            <div class="card col-6" style="height:150px;overflow:hidden;">\
              <button class="btn btn-clear btn-sm" style="color:red;position:absolute;"> \
                <i class="fa fa-trash"></i>\
              </button>\
              <img id="img-5" src="" style="height:100%;object-fit:contain"/>\
            </div>\
          </div>\
        </div>\
        <div style="padding:10px; ">\
          <p>Click+Drag on image to crop</p>\
          <div style="overflow:auto; height: 500px; width: 500px;">\
            <img id="issueImage" src="" width="500"/>\
          </div>\
        </div>\
    </div>\
  </div>';
  $(document).ready(function () {
    $("head").append(
      '<script src="http://html2canvas.hertzen.com/dist/html2canvas.min.js" ></script>'
    );
    $("head").append(
      '<script src="<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">" ></script>'
    );
    $("head").append('<script src="capture/jquery.Jcrop.min.js" ></script>');
    var captureButton = $("<button></button>")
      .text("Capture")
      .attr("id", "capture-me");

    $("body").prepend(captureButton);
    $("body").append(modal);
    $("#capture-me").click(function () {
      captureScreen();
    });
    $("#close-capture-window").click(function () {
      $("#formDialog").css("display", "none");
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
    renderFromLocalstorage();
    html2canvas(document.body).then(function (canvas) {
      var canvasUrl = canvas.toDataURL();
      $("#formDialog").css("display", "flex");
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
