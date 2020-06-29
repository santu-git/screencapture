//http://deepliquid.com/content/Jcrop_API.html
//https://codepen.io/rijii49/pen/Jopwmz?editors=101
// https://ourcodeworld.com/articles/read/281/top-7-best-image-cropping-javascript-and-jquery-plugins
(function () {
  if (window.jQuery) {
    var capturedImages = [];
    console.log("jQuet Loaded");
  } else {
    console.log("jQuery required for reporting plugin");
    return;
  }
  var jcrop_api;
  var modal =
    '\
  <div id="selectionDialog" style="width: 100%; display: none;top:100;position:absolute;z-index:9999">\
    <div style="margin:auto;background-color: #ffffff; width:85%;">\
      <div style="background: aliceblue;"">\
        <button type="button" class="close-capture-window close" style="float:right; margin:15px; display: block;" aria-label="Close">\
          <img id="close-btn" src="./assets/images-folder/close.png" style="height:100%;object-fit:contain"/>\
        </button>\
        <h4 style="font-weight: 600; text-align:left;margin-bottom:20px;margin-top:unset; padding:20px 15px;">Capture Image and create Ticket for ProDoc Application </h4>\
      </div>\
      <div style="padding:10px;"> \
        <div class="" style="margin: unset;width: 100%; display:inline-flex;">\
            <div class="num-bullet" style="background-color: #29add6; width:3%; height: 35px; position: relative;border: 1px solid  #29add6; border-radius: 100%; display:flex; justify-content: center; align-items: center;font-size: 16px; color:#ffffff; font-weight:600; margin-top: 10px;"> 1 </div>\
            <div class="first-image" style=" width: 90%;">\
              <div class ="capture-div" id="capture-div-background-image" style="font-size:16px; font-weight:bold; margin-left: 10px; background-repeat:no-repeat; cursor:pointer; padding: 25px; background-size: 100% 100%;">Capture Images </div>\
            </div>\
        </div>\
        <div class="inernal-modal" id ="capture-image" style=" display: flex; margin-left: 47px; margin-right: 90px; border: 1px solid #f2f2f2; border-radius: 4px; border-top: unset;" >\
          <div style="display:inline-flex;padding:10px;">\
            <div style="padding:10px;width: 600">\
              <div style="display:inline-flex;margin-bottom: 10px;"> \
              <h4>Captured Images</h4>\
              &nbsp;&nbsp;&nbsp;&nbsp;\
              <button id="clear-captured" type="button" class="btn btn-danger btn-sm">Clear All</button>\
              </div>\
              <div class="row">\
                <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;">\
                  <img id="img-1" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
                </div>\
                <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;">\
                  <img id="img-2" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
                </div>\
                <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;">\
                  <img id="img-3" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
                </div>\
                <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;">\
                  <img id="img-4" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
                </div>\
                <div class="img-thumb card col-sm-12 col-md-6" style="height:150px;overflow:hidden;">\
                  <img id="img-5" src="https://via.placeholder.com/400x170?text=No%20Image" style="height:100%;object-fit:contain"/>\
                </div>\
              </div>\
            </div>\
            <div style="padding:10px; ">\
              <p>Click+Drag on image to crop</p>\
              <div style="overflow:auto; height: 500px; width: 500px; overflow-x: hidden;">\
                <img id="issueImage" src="https://via.placeholder.com/400x170?text=No%20Image" width="500"/>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="" style="margin: unset;width: 100%; padding-top:10px; display:inline-flex;">\
          <div class="num-bullet" style="background-color: #29add6; width:3%; height: 35px; position: relative;border: 1px solid  #29add6; border-radius: 100%; display:flex; justify-content: center; align-items: center;font-size: 16px; color:#ffffff; font-weight:600; margin-top: 10px;"> 2 </div>\
          <div class="second-image" style=" width: 90%;">\
            <div class ="ticket-div" id="ticket-div-background-image" style="font-size: 16px; font-weight: bold;background-repeat:no-repeat; margin-left: 10px; padding: 20px 20px 30px; background-size: 100% 100%;  cursor:pointer;"> \
              <span style="">Create Ticket</span>\
              <span class="small-text"style="color: #374b87; font-weight: 400; float:right; margin-right:325px;margin-top:-10px;">We are</span>\
              <br>\
              <span class="happy" style=" width: 114px; font-weight: bold; text-align: center; float:right; margin-right:290px;margin-top:-10px; color: #374b87;font-size:16px;">Happy to Help</span>\
            </div>\
          </div>\
        </div>\
        <div class="issue-ticket" id="formDialog" style="display:none; margin-right:90px; margin-left:47px;border: 1px solid #f2f2f2; border-radius: 4px; border-top: unset; padding: 10px;">\
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
              <button id="closeForm" class="btn" style="border: 1px solid #29add6; color:#29add6;background-color: #ffffff;padding-left:30px;padding-right:30px;"> Previous</button>\
              <button id="submitIssue" class="btn" style="margin-left: 10px; background-color: #29add6; color: #ffffff; padding-left: 30px; padding-right:30px;"> Create </button>\
            </div>\
            <div style="padding:10px; ">\
              <p>Click on image to select & attach to issue</p>\
              <div style="overflow:auto; height: 500px; width: 600px;">\
                <div id="captured-images" class="row">\
                </div>\
              </div>\
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
        border-radius: 50%;\
        z-index:9999;\
        position:fixed;\
        bottom:70px;\
        right:10px;\
        font-size: 2.3rem;\
        box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.4);\
      }\
      </style>"
    );
    $("head").append('<script src="capture/jquery.Jcrop.min.js" ></script>');
    $("head").append('<script src="capture/report.js" ></script>');

    var captureButton = $("<button style='bottom:10px;'></button>")
      .html('<i class="fa fa-bug" aria-hidden="true"></i>')
      .attr("id", "capture-me")
      .attr("class", "btn btn-danger float-button");

    // var reportButton = $("<button style='bottom:10px;'></button>")
    //   .html('<i class="fa fa-bug" aria-hidden="true"></i>')
    //   .attr("class", "btn btn-danger report-issue float-button");

    //$("body").prepend(btnContainer);

    $("body").prepend(captureButton);
    // $("body").prepend(reportButton);
    $("body").append(modal);

    document.getElementById(
      "capture-div-background-image"
    ).style.backgroundImage = "url(assets/images-folder/bitmap@2x.png)";
    document.getElementById(
      "ticket-div-background-image"
    ).style.backgroundImage = "url(assets/images-folder/group-27@3x.png)";

    $(".capture-div").click(function () {
      console.log("clicked");
      var content = document.getElementById("capture-image");
      if (content.style.display == "flex") content.style.display = "none";
      else {
        content.style.display = "flex";
        captureScreen();
      }
    });

    $("#capture-me").click(function () {
      captureScreen();
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

    $(".ticket-div").click(function () {
      var element = document.getElementById("formDialog");
      if (element.style.display == "none") {
        element.style.display = "block";
        reportIssue();
      } else element.style.display = "none";
    });

    $("#closeForm").click(function () {
      $("#issueTitle").val("");
      $("#issueDescription").val(""),
        $("#issueImageData").val(""),
        $("#issueImage").attr("src", "");
      console.log("cancel");
    });

    $("#submitIssue").click(function () {
      var selectedIndex = [];
      $('.img-thumb[data-selected="yes"]').each(function () {
        selectedIndex.push(parseInt($(this).attr("data-index")));
      });

      // var indexes = $('.img-thumb[data-selected="yes"]').map(function () {
      //   return $(this).attr("data-index");
      // });
      // console.log(indexes);

      var formData = {
        txtSummary: $("#issueTitle").val(),
        txtDescr: $("#issueDescription").val(),
      };
      if (selectedIndex.length > 0 && capturedImages) {
        formData["attachements"] = capturedImages.filter(function (d, idx) {
          return selectedIndex.includes(idx);
        });
      }
      var posting = $.post(
        "http://dca-qa-242:8000/Help/_SendAccessEmail",
        formData
      );
      posting.done(function (data) {
        alert("Issue Successfully created");
        $("#issueTitle").val("");
        $("#issueDescription").val("");
      });
      posting.fail(function (error) {
        alert("Could not create issue");
        console.log(error);
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
    // $("#selectionDialog").css("display", "none");
    $("#formDialog").css("display", "flex");
    renderCapturedImages();
  }
})();
