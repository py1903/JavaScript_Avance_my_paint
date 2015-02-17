'use strict'

var x, y, x1, y1;
var context = document.getElementById('canvas1').getContext("2d");
var color = "#FFFFFF";
var painting = false;
var started = false;
var width_brush = 5;
var canvas = document.getElementById('canvas1');
var cursorX, cursorY;

canvas.onmousedown = function(e) {
  painting = true;

  cursorX = (e.pageX - this.offsetLeft);
  cursorY = (e.pageY - this.offsetTop);
};

canvas.onmouseup = function() {
  painting = false;
  started = false;
};

canvas.onmousemove = function(e) {
  if (painting) {
    cursorX = (e.pageX - this.offsetLeft) - 10;
    cursorY = (e.pageY - this.offsetTop) - 10;
    
    drawLine();
  }
};

function drawLine() {
  // Si c'est le début, j'initialise
  if (!started) {
    // Je place mon curseur pour la première fois :
    context.beginPath();
    context.moveTo(cursorX, cursorY);
    started = true;
  } 
  // Sinon je dessine
  else {
    context.lineTo(cursorX, cursorY);
    context.strokeStyle = color;
    context.lineWidth = width_brush;
    context.stroke();
  }
}
  function draw(x1, y1, x2, y2)
  {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  var x1 = 0;
  var y1 = 0;
  var firstClick = true;
  $("#canvas1").on("click", function(event){
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    console.log(x1, x, y1, y);
    if(firstClick){
      x1 = x;
      y1 = y;
      firstClick = false;
    }
    else
    {
      if ($('#selection').val() == 'ligne') {
        console.log(x1, x, y1, y);
        draw(x1, y1, x, y);
        firstClick = true;
      }
      else if ($('#selection').val() == 'rectangle')
      {
        drawRect(x1, y1, x, y);
        firstClick = true;
      }
      else if ($('#selection').val() == 'cercle')
      {
        drawCircle(x1, y1, x, y);
        firstClick = true;
      }
      else if ($('#selection').val() == 'crayon')
      {
        draw();
      }
      // drawLine(x1, y1, x, y);
      // firstClick = true;
    }
    
  });

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
}

$("#largeurs_pinceau input").change(function() {
    if (!isNaN($(this).val())) {
      width_brush = $(this).val();
      $("#output").html($(this).val() + " pixels");
    }
  });

$("#couleurs a").each(function() {
    // Je lui attribut une couleur de fond :
    $(this).css("background", $(this).attr("data-couleur"));
    
    // Et au click :
    $(this).click(function() {
      // Je change la couleur du pinceau :
      color = $(this).attr("data-couleur");
      
      // Et les classes CSS :
      $("#couleurs a").removeAttr("class", "");
      $(this).attr("class", "actif");
      
      return false;
    });
  });
