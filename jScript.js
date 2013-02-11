/**
 * @author Mike
 */

i = 0;

function addItem (form) {
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
	//$('input[name="inputText"]').val('');
}

$(document).ready(function() {
	var itemList = [];
	$('input[name="button"]').click(function() {
		itemList.push($('input[name="inputText"]').val())
		$("#myList").empty();
		$.each(itemList, function() {
			$("#myList").append('<li name = "listItem"><p>' + this + '</p></li>');
		});
		$('li[name="listItem"]').append('<input type="button" name="btnRemove" value="Remove Item">');
		$('li[name="listItem"]').append('<input type="button" name="btnAdd" value="Add Item">');
		
		$('input[name="inputText"]').val('');
	});
	$('img[name="imgClose"]').click(function() {
		
	});
});