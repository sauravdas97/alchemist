// IDEA: checkoff clicked TODO
$("ul").on("click","li",function(){
  if($(this).css("color")=="rgb(0, 0, 0)"){
    $(this).css("text-decoration","line-through");
    $(this).css("color","gray");
  }else{
    $(this).css("text-decoration","none");
    $(this).css("color","black");
  }
})


// IDEA: deleting a todo
$("ul").on("click","span",function(){
  $(this).parent().fadeOut(function(){
    $(this).remove();
  });
  event.stopPropagation();
})


// IDEA: adding a new TODO
$("input[type='text']").keypress(function(event){
  if(event.which==13){
    var todoText = $(this).val();
    $(this).val("");
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> "+todoText+"</li>");
  }
})

// IDEA: for the angle icon
$(".fa-angle-down").on("click", function(){
  $("input").fadeToggle();
})
