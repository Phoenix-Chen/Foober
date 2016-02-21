var curObj;
var pastObj;
function setCookName(cId) {
    myJsRoutes.controllers.Application.getCookNameById(cId).ajax({
        success : function(cookName) {
            $('#cookName').html(cookName);
        }
    });
}

function setProfilePic(cId) {
    myJsRoutes.controllers.Application.getImageById(cId).ajax({
        success : function(imgName) {
            $('#cookImg').attr('src',"/assets/images/"+imgName);
        }
    });
}

function setCurPosts(cId) {
    myJsRoutes.controllers.Application.getPostsByCook(cId,"fresh").ajax({
        success : function(curPostData) {
            //alert(curPostData);
            curObj = JSON.parse(curPostData);
            var cardDeck = document.createElement('div');
            cardDeck.className="card-deck";

            for(var i=0;i<curObj.length;i++){
                //cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><a href="#" data-toggle="modal" data-target="#foodModal"><img class="card-img-top img-responsive" src="http://placehold.it/150x80?text=IMAGE" style="width:100%" alt="Food pic"></a><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">Food Name</div><div class="short-div foodDesc">This is a very long description for the food that is shown above.</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$10.00</div></div>								<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-success-outline">Order now</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
                cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><a href="#" onclick=\'setModals(\"'+i+'\")\' data-toggle="modal" data-target="#foodModal"><img class="card-img-top img-responsive" src=\"/assets/images/'+curObj[i].image_file+'\" style="width:100%" alt="Food pic"></a><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">'+curObj[i].title+'</div><div class="short-div foodDesc">'+curObj[i].description+'</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$'+curObj[i].price+'.00</div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-success-outline" onclick="triggerOrderModal('+i+')">Order now</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
                if (i%3==2) {
                    $('#cur-card-wrapper').append(cardDeck);
                    $('#cur-card-wrapper').append('<br></br>')
                    var cardDeck = document.createElement('div');
                    cardDeck.className="card-deck";
                }
            }

        }
    });
}

function setPastPosts(cId) {
    myJsRoutes.controllers.Application.getPostsByCook(cId,"unfresh").ajax({
        success : function(pastPostData) {


            pastObj = JSON.parse(pastPostData);
            var cardDeck = document.createElement('div');
            cardDeck.className="card-deck";

            for(var i=0;i<pastObj.length;i++){
                cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><img class="card-img-top img-responsive" src=\"/assets/images/'+pastObj[i].image_file+'\"" style="width:100%" alt="Food pic"><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">'+pastObj[i].title+'</div><div class="short-div foodDesc">'+pastObj[i].description+'</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$'+pastObj[i].price+'.00</div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-danger-outline" disabled>Sold out</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
                //cardDeck.innerHTML=cardDeck.innerHTML+'<div class="card"><a href="#" onclick=\'setModals(\"'+i+'\")\' data-toggle="modal" data-target="#foodModal"><img class="card-img-top img-responsive" src=\"/assets/images/'+pastObj[i].image_file+'\" style="width:100%" alt="Food pic"></a><div class="card-block"><div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><div class="short-div foodName">'+pastObj[i].title+'</div><div class="short-div foodDesc">'+pastObj[i].description+'</div></div><div class="col-lg-4 col-md-4 col-sm-6 col-xs-4 price">$'+pastObj[i].price+'.00</div></div><div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="pull-right"><button type="button" class="btn btn-success-outline" onclick="triggerOrderModal('+i+')">Order now</button></div></div></div><br><div class="row"><p class="card-text"><small class="text-muted pull-right">*May contain peanuts and dairy products.</small></p></div></div></div>';
                if (i%3==2) {
                    $('#past-card-wrapper').append(cardDeck);
                    $('#past-card-wrapper').append('<br></br>')
                    var cardDeck = document.createElement('div');
                    cardDeck.className="card-deck";
                }
            }

        }
    });
}

function decrementDishes() {
    var numPlates = parseInt(document.getElementById("numberOfDishes").innerHTML);
    numPlates = numPlates - 1;
    if(numPlates <= 0){
        numPlates = 1;
    }
    document.getElementById("numberOfDishes").innerHTML = numPlates;
}

function incrementDishes() {
    var numPlates = parseInt(document.getElementById("numberOfDishes").innerHTML);
    numPlates = numPlates + 1;
    document.getElementById("numberOfDishes").innerHTML = numPlates;
}

function postDish(cId) {
    var dishName = $('#nameOfDish').val();
    var dishNum = document.getElementById("numberOfDishes").innerHTML;
    var dishDescription = $('#descriptionOfDish').val();
    var ingredients = "";
    if(document.getElementById("peanuts").innerHTML.checked === true){
        ingredients = "peanuts";
    }
    if(document.getElementById("treeNuts").checked){
        if(ingredients === ""){
            ingredients = "tree nuts";
        }
        else{
            ingredients = ingredients + ",tree nuts";
        }
    }
    if(document.getElementById("chocolate").checked){
        if(ingredients === ""){
            ingredients = "chocolate";
        }
        else{
            ingredients = ingredients + ",chocolate";
        }
    }
    if(document.getElementById("seafood").checked){
        if(ingredients === ""){
            ingredients = "seafood";
        }
        else{
            ingredients = ingredients + ",seafood";
        }
    }
    if(document.getElementById("gluten").checked){
        if(ingredients === ""){
            ingredients = "gluten";
        }
        else{
            ingredients = ingredients + ",gluten";
        }
    }
    if(document.getElementById("soy").checked){
        if(ingredients === ""){
            ingredients = "soy";
        }
        else{
            ingredients = ingredients + ",soy";
        }
    }
    if(document.getElementById("dairy").checked){
        if(ingredients === ""){
            ingredients = "dairy";
        }
        else{
            ingredients = ingredients + ",dairy";
        }
    }
    if(document.getElementById("eggs").checked){
        if(ingredients === ""){
            ingredients = "eggs";
        }
        else{
            ingredients = ingredients + ",eggs";
        }
    }

    var finalString = "{\"title\":\""+dishName+"\",\"serving\":"+dishNum+",\"description\":\""+dishDescription+"\",\"ingradient\":\""+ingredients+"\",\"cook_id\":\""+cId+"\"}";
    
    myJsRoutes.controllers.Application.newPost(cId,finalString).ajax({
        success : function(success) {

            //alert(finalString);
            $('#addFoodModal').modal('hide');
            $('#loadingStatus').html('Processing...');
            $('#loadingModal').modal('show');

            setTimeout(function(){
                $('#loadingStatus').text('Dish posted! You will be notified when a customer orders your dish.');
                setTimeout(function() {
                  $('#loadingModal').modal('hide');
              }, 3000);
            }, 3000);
        }
    });
}

function setModals(i) {
    //alert(title);
    $('#modal-top-img').attr("src","/assets/images/"+curObj[i].image_file);
    $('#modal-low-img').attr("src","/assets/images/"+curObj[i].image_file);
    $('#modal-title').html(curObj[i].title);
    setCookName(curObj[i].cook_id);
    $('#modal-price').html("$"+curObj[i].price+".00");
    $('#modal-description').html(curObj[i].description);
    $('#modal-ingradients').html(curObj[i].ingradient);
    $('#orderBtn').click(function() {
        $('#order-img').attr("src","/assets/images/"+curObj[i].image_file);
        $('#foodModal').modal('hide');
        setTimeout(function(){
          $('#orderModal').modal('show');
        }, 400);
    });
}

function triggerOrderModal(i) {
    $('#order-img').attr("src","/assets/images/"+curObj[i].image_file);
    $('#foodModal').modal('hide');
    $('#orderModal').modal('show');
}

function placeOrder() {
  $('#orderModal').modal('hide');
  $('#loadingStatus').html('Requesting an Uber driver from UberRush...');
  $('#loadingModal').modal('show');

  setTimeout(function(){
    $('#loadingStatus').html('Uber request sent! Your delivery will arrive within 30 minutes.');
    setTimeout(function() {
      $('#loadingModal').modal('hide');
    }, 3000);
  }, 3000)
}
function dismissOrderModal() {
  $('#orderModal').modal('hide');
}

function decrementTip() {
    var numPlates = parseInt(document.getElementById("tipAmount").innerHTML);
    numPlates = numPlates - 1;
    if(numPlates <= 0){
        numPlates = 0;
    }
    document.getElementById("tipAmount").innerHTML = numPlates;
}

function incrementTip() {
    var numPlates = parseInt(document.getElementById("tipAmount").innerHTML);
    numPlates = numPlates + 1;
    document.getElementById("tipAmount").innerHTML = numPlates;
}