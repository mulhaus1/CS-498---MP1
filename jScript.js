/**
 * @author Mike
 */

// i = 0;
//
// function addItem (form) {
// var textval = form.inputText.value;
// var buttonId = "btn" + i;
// var listId = "item" + i;
// i++;
//
// $("#myList").append('<li id="' + listId + '">' + textval + '</li>');
// var test = $('<input />', {
// type: 'button',
// name: buttonId,
// value: 'delete',
// onclick: 'deleteItem()'
// });
// $("#myList").append(test);
// $('input[name="inputText"]').val('');
// }

var itemList = [];
$('input[name="button"]').click(function() {
	itemList.push($('input[name="inputText"]').val())
	$("#myList").empty();
	$.each(itemList, function() {
		$("#myList").append('<li name = "listItem">' + this + '</li>');
	});
	$('li[name="listItem"]').append('<input type="button" name="btnRemove" class="Remove" value="Remove">');
	$('li[name="listItem"]').append('<input type="button" name="btnAdd" class="Add" value="Add Item">');

	$('input[name="inputText"]').val('');
});

$('#myList').on("click", ".Remove", function() {
	var item = ($(this).closest("li"));
	item.hide(100, 'swing', function(){
		item.remove();
		//console.log($("#myList"));
	});
	text = item.text();
	//console.log(text);
	itemList = $.grep(itemList, function (e) {
		return e !== text;
	});
	//console.log(newList);
});

$('#myList').on("click", ".Add", function() {
	
	console.log("adding list item");
});
