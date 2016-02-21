var obj;
$(document).ready(function(){
    myJsRoutes.controllers.Application.getPosts().ajax({
        success : function(data) {
            //alert(data);
            obj = JSON.parse(data);
            var cardDeck = document.createElement('div');
            cardDeck.className="card-deck";
            for(var i=0;i<obj.length;i++){
                cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><a href="#" onclick=\'setModals(\"'+i+'\")\' data-toggle="modal" data-target="#foodModal"><img class="card-img-top img-responsive" src=\"/assets/images/'+obj[i].image_file+'\" style="width:100%" alt="Food pic"></a><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">'+obj[i].title+'</div><div class="short-div foodDesc">'+obj[i].description+'</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$'+obj[i].price+'.00</div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-success-outline" onclick="triggerOrderModal('+i+')">Order now</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
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

function setModals(i) {
    //alert(title);
    $('#modal-top-img').attr("src","/assets/images/"+obj[i].image_file);
    $('#modal-low-img').attr("src","/assets/images/"+obj[i].image_file);
    $('#modal-title').html(obj[i].title);
    setCookName(obj[i].cook_id);
    $('#modal-price').html("$"+obj[i].price+".00");
    $('#modal-description').html(obj[i].description);
    $('#modal-ingradients').html(obj[i].ingradient);
    $('#orderBtn').click(function() {
        $('#order-img').attr("src","/assets/images/"+obj[i].image_file);
        $('#foodModal').modal('hide');
        $('#orderModal').modal('show');
    });
}

function setCookName(cId) {
    myJsRoutes.controllers.Application.getCookNameById(cId).ajax({
        success : function(cookName) {
            $('#modal-provider').html("<a onclick='goToProfile(\""+cId+"\")'>Prepared by: "+cookName+"</a>");
        }
        });
}

function goToProfile(cId) {
    var url = myJsRoutes.controllers.Application.profile(cId).url;
    window.location.href = url;    
}

function triggerOrderModal(i) {
    $('#order-img').attr("src","/assets/images/"+obj[i].image_file);
    $('#foodModal').modal('hide');
    $('#orderModal').modal('show');
}

function dismissOrderModal() {
  $('#orderModal').modal('hide');
}

function placeOrder() {
  $('#orderModal').modal('hide');
  $('#loadingModal').modal('show');

  setTimeout(function(){
    $('#loadingStatus').html('Uber request sent! Your delivery will arrive within 30 mins.');
    setTimeout(function() {
      $('#loadingModal').modal('hide');
      $('#loadingModal').html('Loading...');
    }, 3000);
  }, 3000)
}
