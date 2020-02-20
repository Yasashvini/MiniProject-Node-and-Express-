var elements = document.getElementsByClassName("column");


var i;

// List View
function listView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "100%";
  }
}
function nextPage(val)
{
    window.location = '/course/register?coursename='+val;
}
function nextPage1(val)
{
    window.location = '/course/display?coursename='+val;
}
listView();
function myFunction() {
    var input, filter, div1, div, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div1 = document.getElementById("f");
    div = div1.getElementsByTagName("div");
    for (i = 0; i < div.length; i++) {
        a = div[i].getElementsByTagName("h2")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
}

