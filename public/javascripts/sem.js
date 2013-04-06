var serverAddress = "http://firstapp-semaphore.ph/message"; //"http://mojzis.apiary.dev:8000/message";
$(window).ready( function() {
// check location.hash, in case it contains an id, request the stuff on server and paint it blue
if(location.hash) {
  $(window).on("cmx:launched",null,event,function() {
    var messId = location.hash.substr(1);
    getMessage(messId, false);
  });
}
$('#sendmess').click(function(){
  var mess = $('#mess').val();
  var request = $.ajax({
    url: serverAddress,
    type: "post",
    data: { "text": mess },
    complete: function(event) {
      var response = $.parseJSON(event.responseText);
      // TODO: write down the link
      var url = location.origin + '#' + response.id;
      $('#notif').html('share: <a href="' + url + '">' + mess + '</a><a href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>');

      // TODO: add a tweet this button :)
      $('.twitter-share-button').attr('data-url', url).attr('data-text','#CMXore');
      !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
      drawSemaphore(response.actorPoses);
      }
    });
  });
});

function getMessage(messId, help ) { //= false
    var request = $.ajax({
      url: serverAddress + '/'+ messId,
      type: "get",
      complete: function(event) {
        $('#teaser').html('send a reply :');
        var response = $.parseJSON(event.responseText);
        messText = help ? response.messageText : null;
        drawSemaphore(response.actorPoses, messText);
        $('#putithere').append('no comprendo ? <a id="gethelp" href="#">Get help</a>');
        $('#gethelp').click( function()  {
          var messId = location.hash.substr(1);
          getMessage(messId, true);
          return false;
        });
      }
    });
}

function drawSemaphore(poses, messText) { // = null
  console.log(messText);

  var sceneStart = "<scene id='scene1'>";
  var sceneEnd = "</scene>";
  var actorTemplate = $("<actor></actor>");
  var bubbleTemplate = $("<bubble>");
  var bubOptions = [
    "-12,-4|-11,16|-37,46|15,52|-21,88|-31,95",
    "31,7|16,14|0,22|9,49|39,50|42,56",
    "25,2|17,14|-5,59|56,34|38,73|32,79",
    "-4,5|-11,16|1,32|-20,30|-9,42|-6,45"
  ];
  var colorOptions = ['red','green','blue','brown'];
  var spanTemplate = $('<tspan x="0" y="0em"></tspan>');
  var actors = [];
  var actorWidth = 125;
  var bub = $('');
  for (j = 0; j < poses.length; j++) {
    if (messText) {
      bub = bubbleTemplate.attr('pose', randAI(bubOptions)).html(spanTemplate.attr('fill',randAI(colorOptions)).html(messText[j])); // translate ?
    }
    actors.push(actorTemplate.attr('pose',poses[j]).attr('t','translate(' + (65 +(j) * actorWidth) + ',150)').html(bub).clone());
  }
  //console.log(actors);
  sceneHtml = sceneStart;
  for (j = 0; j < actors.length; j++) {
    sceneHtml += actors[j].prop('outerHTML');
  }
  sceneHtml += sceneEnd;
  scene = $(sceneHtml);
  scene.attr('width', (actorWidth + 3) * actors.length );
  $('#putithere').html(scene.prop('outerHTML'));
  parser = new cmx.Parser(cmx);
  sceneModels = parser.parseDoc($("body"));
  //console.log(sceneModels);
  for (_i = 0, _len = sceneModels.length; _i < _len; _i++) {
    sceneModel = sceneModels[_i];
    sceneModel.props.frame = false;
    //console.log(sceneModel);
    $scene = $(sceneModel.source);
    //sceneModel.debugReport(2);
    sceneModel.materialize($scene);
  }

  }

function randAI(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
