$(window).ready( function() {
$('#sendmess').click(function(){
    var mess = $('#mess').val();
    var request = $.ajax({
      url:"http://mojzis.apiary.dev:8000/message",
      type: "post",
      data: { "text": mess },
      complete: function(event) {
        var response = $.parseJSON(event.responseText);
        var sceneStart = "<scene id='scene1'>";
        var sceneEnd = "</scene>";
        var actorTemplate = $("<actor></actor>");
        var actors = [];
        var poses = response.actorPoses;
        var actorWidth = 100;
        for (j = 0; j < poses.length; j++) {
          actors.push(actorTemplate.attr('pose',poses[j]).attr('t','translate(' + ((j+1) * actorWidth) + ',150)').clone());
        }
        console.log(actors);
/* */
        //console.log(event.responseText);
        sceneHtml = sceneStart;
        for (j = 0; j < actors.length; j++) {
          sceneHtml += actors[j].prop('outerHTML');
        }
        sceneHtml += sceneEnd;
        $('#putithere').html(sceneHtml);
        parser = new cmx.Parser(cmx);
        //sceneModels = parser.parseMarkup(board);
        sceneModels = parser.parseDoc($("body"));
        //$('.cmx-user-scene1').remove();
        console.log(sceneModels);
      for (_i = 0, _len = sceneModels.length; _i < _len; _i++) {
        sceneModel = sceneModels[_i];
        sceneModel.props.frame = false;
        console.log(sceneModel);
        $scene = $(sceneModel.source);
        //console.log("model for #" + ($scene.attr("id")) + ":", this);
        sceneModel.debugReport(2);
        sceneModel.materialize($scene);
      }
// */
        }
      });
  });
});
