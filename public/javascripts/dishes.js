$(document).ready(function(){
    myJsRoutes.controllers.Application.getPosts().ajax({
        success : function(data) {
            //alert(data);
            var obj = JSON.parse(data);
            var cardDeck = document.createElement('div');
            cardDeck.className="card-deck";
            for(var i=0;i<obj.length;i++){
                cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><a href="#" onclick=\'setModals(\"'+obj[i].title+'\",\"'+obj[i].cook_id+'\",\"'+obj[i].price+'\",\"'+obj[i].description+'\",\"'+obj[i].ingradient+'\")\' data-toggle="modal" data-target="#foodModal"><img class="card-img-top img-responsive" src="http://placehold.it/150x80?text=IMAGE" style="width:100%" alt="Food pic"></a><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">'+obj[i].title+'</div><div class="short-div foodDesc">'+obj[i].description+'</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$'+obj[i].price+'.00</div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-success-outline" onclick="triggerOrderModal()">Order now</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
                if (i%3==2) {
                    $('#card-wrapper').append(cardDeck);
                    $('#card-wrapper').append('<br></br>')
                    var cardDeck = document.createElement('div');
                    cardDeck.className="card-deck";
                }
            }
        }
    });
});

function setModals(title, cId,price,description,ingradients) {
    $('#modal-title').html(title);
    myJsRoutes.controllers.Application.getCookNameById(cId).ajax({
        success : function(cookName) {
            $('#modal-provider').html("Prepared by:"+cookName);
        }
        });
    $('#modal-price').html("$"+price+".00");
    $('#modal-description').html(description);
    $('#modal-ingradients').html(ingradients);
    $('#orderBtn').click(function() {
      console.log("clicked!");
        $('#foodModal').modal('hide');
        $('#orderModal').modal('show');
    });
}

function triggerOrderModal() {
    $('#foodModal').modal('hide');
    $('#orderModal').modal('show');
}
