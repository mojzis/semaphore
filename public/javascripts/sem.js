$(window).ready( function() {
var serverAddress = "http://mojzis.apiary.dev:8000/message";
// check location.hash, in case it contains an id, request the stuff on server and paint it blue
if(location.hash) {
  var messId = location.hash.substr(1);
  var request = $.ajax({
    url: serverAddress + '/'+ messId,
    type: "get",
    complete: function(event) {
      $('#teaser').html('send a reply :');
      var response = $.parseJSON(event.responseText);
      drawSemaphore(response.actorPoses);
    }
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

function drawSemaphore(poses) {
  // TODO : check if empty, otherwise cleanup
  var sceneStart = "<scene id='scene1'>";
  var sceneEnd = "</scene>";
  var actorTemplate = $("<actor></actor>");
  var actors = [];
  var actorWidth = 125;
  for (j = 0; j < poses.length; j++) {
    actors.push(actorTemplate.attr('pose',poses[j]).attr('t','translate(' + (65 +(j) * actorWidth) + ',150)').clone());
  }
  console.log(actors);
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
  console.log(sceneModels);
  for (_i = 0, _len = sceneModels.length; _i < _len; _i++) {
    sceneModel = sceneModels[_i];
    sceneModel.props.frame = false;
    console.log(sceneModel);
    $scene = $(sceneModel.source);
    sceneModel.debugReport(2);
    sceneModel.materialize($scene);
  }

  }


