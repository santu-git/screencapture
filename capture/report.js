//http://deepliquid.com/content/Jcrop_API.html
//https://codepen.io/rijii49/pen/Jopwmz?editors=101
// https://ourcodeworld.com/articles/read/281/top-7-best-image-cropping-javascript-and-jquery-plugins
(function(){
  if(window.jQuery) {
    console.log("jQuet Loaded");
  }else{
    console.log("jQuery required for reporting plugin")
    return;
  }
  var jcrop_api;
  var modal ='\
  <div id="formDialog" style="width: 100%; display: none;top:100;position:absolute;z-index:9999">\
  <div style="margin:auto;border: 1px solid black;padding: 10px;background-color: #e9e9e9;">\
  <h4 style="padding:5px;text-align:center;margin-bottom:20px;">Create Ticket for Application </h4>\
  <div style="display:inline-flex;"> \
  <div style="padding:10px;">\
    <label for="issueTitle">Issue Summary:</label>\
    <br>\
    <input type="text" id="issueTitle" />\
    <br>\
    <br>\
    <label for="issueDescription">Issue Description:</label>\
    <br>\
    <textarea id="issueDescription" rows="4" cols="50"> </textarea>\
    <input id="issueImageData" type="hidden" >\
    <br>\
    <br>\
    <button id="submitIssue">+ Create Ticket</button>\
    <button id="closeForm">Cancel</button>\
  </div>\
      <div style="padding:10px; ">\
        <p>Click+Drag on image to crop</p>\
        <div style="overflow:auto; height: 500px; width: 500px;">\
        <img id="issueImage" src="" width="500"/>\
        </div>\
      </div>\
  </div>'
  $(document).ready(function(){
    $("head").append('<script src="http://html2canvas.hertzen.com/dist/html2canvas.min.js" ></script>')
    $("head").append('<script src="capture/jquery.Jcrop.min.js" ></script>')
    var captureButton = $("<button></button>").text("Capture").attr('id','capture-me');

    $("body").prepend(captureButton);
    $("body").append(modal);
    $('#capture-me').click(function(){
      captureScreen();
      //$( "#formDialog" ).css('display','block');
    })
    $('#closeForm').click(function(){
      $("#issueTitle").val('');
      $("#issueDescription").val(''),
      $("#issueImageData").val(''),
      $("#issueImage").attr("src",'')
      $( "#formDialog" ).css('display','none');
    })
    $("#submitIssue").click(function(){
      var posting = $.post("http://dca-qa-242:8000/Help/_SendAccessEmail",
        {
          txtSummary: $("#issueTitle").val(),
          txtDescr: $("#issueDescription").val(),
          Attachment: $("#issueImageData").val()
        });
      posting.done(function(data){
        // if(jcrop_api){
        //   jcrop_api.release();
        // }
        console.log(jcrop_api);
        alert("Issue Successfully created");
        $("#issueTitle").val('');
        $("#issueDescription").val('');
      });
      posting.fail(function(error){
        alert("Could not create issue");
        console.log(error);
      });
    })
  })

  function captureScreen(){
    html2canvas(document.body).then(function(canvas) {
      var canvasUrl = canvas.toDataURL();
      $( "#formDialog" ).css('display','flex');
      $("#issueImage").attr("src",canvasUrl)
      $("#issueImageData").val(canvasUrl)
      var orgImg = $('#issueImage').get(0);
      $('#issueImage').Jcrop({
        onSelect: showCoords,
      },function(){
        jcrop_api = this;
      });
      function showCoords(c)
      {

        // Scale crop params
        var aspectRatio = orgImg.naturalWidth/orgImg.width;
        var startX = c.x * aspectRatio
        var startY= c.y * aspectRatio;
        var cropWidth = c.w * aspectRatio;
        var cropHeight = c.h * aspectRatio;

        var newCanv = document.createElement("canvas");
        newCanv.width = orgImg.naturalWidth;
        newCanv.height = orgImg.naturalHeight;
        var ctx = newCanv.getContext("2d");
        ctx.drawImage(orgImg, 0, 0,orgImg.naturalWidth,orgImg.naturalHeight);
        var imageData = ctx.getImageData(startX, startY, cropWidth,cropHeight);
        var orginalImage = newCanv.toDataURL();
        var canvas1 = document.createElement("canvas");
        canvas1.width = cropWidth;
        canvas1.height = cropHeight;
        var ctx1 = canvas1.getContext("2d");
        ctx1.rect(0, 0,cropWidth , cropHeight);
        ctx1.fillStyle = 'white';
        ctx1.fill();
        ctx1.putImageData(imageData, 0, 0);
        var croppedImage = canvas1.toDataURL();
        $("#issueImageData").val(croppedImage)
      };
    });
  }

})();
