  $(document).ready(function(){

    Array.prototype.remove = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };


// ______________slider ____________________
var timer;
var b = 1;
var c = ($('.slider-main img').length);
function SliderAuto (){ 
  if(b == c){
   $('.slider-main').animate({ "margin-left": "0" }, "slow" );
   b = 1;

   return(b);
 } else{

  $('.slider-main').animate({ "margin-left": "-=300px" }, "slow" );
  b++;
  return(b);
}
};
$('.next').click(function() {

 if(b == c) {
   $('.slider-main').animate({ "margin-left": "0" }, "slow" );
   b = 1;

   return(b);
 } else {

  $('.slider-main').animate({ "margin-left": "-=300px" }, "slow" );
  b+=1;

  return(b);
}

})
$('.prev').click(function() {
 if(b == 1) {
  $('.slider-main').animate({ "margin-left": "0" }, "slow" );
} else {
  $('.slider-main').animate({ "margin-left": "+=300px" }, "slow" );
  b-=1;

  return(b);
}

})

$('.dot').click(function(){
  c = $(this).index();
  b = c;
  $('.slider-main').animate({ "margin-left": "-" + c * 300 + "px" }, "slow" );
  return(b);
})
$('.slider-main').mouseenter(function(){
 clearInterval(timer);  
});
$('.slider-main').mouseleave(function(){
 timer = setInterval(SliderAuto,2000);
});

// ______________slider ____________________

// ______________filter ____________________


var currentColor = '';
var currentType = '';

function filterProducts(color, type) {

  var item = $('.item');

  item.hide();

  var filterShowItems = item;

  if(color != '') {
    filterShowItems = filterShowItems.filter('.' + color);
  }

  if(type != '') {
    filterShowItems = filterShowItems.filter('.' + type);
  }

  filterShowItems.slideDown();


}



$(".colors-list-item").click(function() {
  currentColor = $(this).data('color');

  filterProducts(currentColor, currentType);
});

$(".type-list-item").click(function() {
  currentType = $(this).data('type');

  filterProducts(currentColor, currentType);
});


$('#clearFilter').click(function(){
  $('.item').slideDown();
});


// ______________filter ____________________


// ______________cart ____________________

$('#cart').mouseenter(function(){
  stop();
  $('#cart-dropdown').slideDown('slow');
});
$('#cart').mouseleave(function(){
  stop();
  $('#cart-dropdown').slideUp('slow');
});

var cart = $( "#cart" );
var cartUl = cart.find('ul');

function getProducts() {
  productStorage = localStorage;
  var products = localStorage.getItem('products');

  if(products) {
    products = JSON.parse(products);
  } else {
    products = [];
  }


  return products;
}



function addItemToCartList(name) {
  var li = $("<li></li>").text(name);
  li.prepend( "<p class='utka'>x</p>" );
  cartUl.append(li);

  li.find('.utka').click(function() {
    $(this).parent().remove();
    // var products = getProducts();

    // alert(name);

    // localStorage.setItem('products', products);
  });
}

function deleteProduct(name){
  localStorage.removeItem('name');

}

$(function() {
  $( ".item" ).draggable({
    appendTo: "body",
    helper: "clone"
  });



  var products = getProducts();

  for (var i = products.length - 1; i >= 0; i--) {
    var name = products[i];
    addItemToCartList(name);
  }

  cart.droppable({
    drop: function( event, ui ) {
      var item = ui.draggable;
      var name = item.find('p').text();

      var products = getProducts();


      if(products.indexOf(name) === -1) {
        products.push(name);
        products = JSON.stringify(products);

        localStorage.setItem('products', products);

        addItemToCartList(name);
      }

    }
  })
  .sortable({
    items: "li:not(.placeholder)",
    sort: function() {
      $( this ).removeClass( "ui-state-default" );
    }
  });
});


$('#add-cart').click(function(){
  var item = $(this).parent();
  var name = item.find('h6').text();

  var products = getProducts();


  if(products.indexOf(name) === -1) {
    products.push(name);
    products = JSON.stringify(products);

    localStorage.setItem('products', products);

    addItemToCartList(name);
    $('.window').fadeOut();
  }

});
$('#cart-dropdown ul li p').dblclick(function(){

}); 

$('.login').click(function() {
  $('.window-login').fadeIn();
});

$('.enter').click(function() {
  var login = $('#login').val();
  var password = $('#password').val();

  $.ajax({
    method: "GET",
    url: "login.php?login=" + login + "&password=" + password,
    success: function(data) {
      if(data) {
        alert('Вы успешно авторизированы');
        $('.window-login').fadeOut();
        $('.header p').slideDown();
      } else {
        alert('Неверный логин или пароль');
      }
    }
  });
});


// ______________cart ____________________

// ______________window ____________________

$('.item').click(function() {
  var name = $(this).find('p').text();

  $.ajax({
    method: "GET",
    url: '/backend.php?name=' + name,
    success: function(data) {
      var windowBlock = $('.window-product');

      windowBlock.find('p').text(data);
      windowBlock.find('h6').text(name);
      windowBlock.fadeIn();
    }
  });

});

$('.window-close').click(function(){
  $('.window-product').fadeOut();
  $('.window-login').fadeOut();
});
// ______________window ____________________

});