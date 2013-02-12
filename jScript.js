/**
 * @author Mike
 */

// Create object array for lists
var listList = [];

// This function is called when Add List button is clicked
$('input[name="button"]').click(function() {
	
	// Check to see if list already exists with inputed title
	var inText = $('input[name="inputText"]').val();
	var titleTest;
	$.each(listList, function() {
		if (this["title"] === inText) {
			alert("list already exists!");
			titleTest = false;
			return false;
		}
	});
	if (titleTest === false) {
		return;	
	}
	
	// Otherwise, push title and add item array
	listList.push({
		"title" : inText,
		"items" : []
	});
	
	// Generate new list and add html dynmically
	$("#myList").empty();
	$.each(listList, function() {
		$("#myList").append('<li class = "list">' + this["title"] + '</li>');
	});
	$('li[class="list"]').append('<input type="button" class="RemoveList" value="Remove">');
	$('li[class="list"]').append('<input type="button" class="AddItem" value="Add Item">');
	$('li[class="list"]').append('<ul class="itemList"></ul>');
	
	// Clear value of text input box
	$('input[name="inputText"]').val('');
});

// This function is used when removing list button is clicked
$('#myList').on("click", ".RemoveList", function() {
	// Grab parent <li> element
	var item = ($(this).closest("li"));
	
	// Use hide for animation and remove <li> element
	item.hide(100, 'swing', function(){
		item.remove();
	});
	
	// Remove list from list array
	text = item.text();
	listList = $.grep(listList, function (e) {
		if (e["title"] !== text) {
			return e;
		}
	});
});

// This function is used when the Add Items button is clicked
$('#myList').on("click", ".AddItem", function() {
	var itemList = $(this).siblings(".itemList");
	itemList.append('<li>YAAAAAAAAAAA BUDDYYYYYYYYYY</li>');
});
