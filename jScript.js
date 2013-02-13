/**
 * @author Mike Mulhausen
 */

// Create object array for lists

storageKey = "My_Data"

var listList = [];
var itemUL;
var exportText;
var importText;

// Check for list in localStorage
var temp = localStorage.getItem(storageKey);

if (temp !== null) {
	listList = JSON.parse(temp);
	generateHTML();
}


$('input[name="button1"]').click(function() {

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
	generateHTML();
	saveData();
	
	// Clear value of text input box
	$('input[name="inputText"]').val('');
});

// This function is called when Mark Removed button is clicked
$('input[name="button2"]').click(function() {

	// // Check to see if list already exists with inputed title
	// var inText = $('input[name="inputText"]').val();
	// var titleTest;
	// $.each(listList, function() {
		// if (this["title"] === inText) {
			// alert("list already exists!");
			// titleTest = false;
			// return false;
		// }
	// });
	// if (titleTest === false) {
		// return;
	// }
// 
	// // Otherwise, push title and add item array
	// listList.push({
		// "title" : inText,
		// "items" : []
	// });
// 
	// // Generate new list and add html dynmically
	// generateHTML();
	// saveData();
	// // Clear value of text input box
	// $('input[name="inputText"]').val('');
});

// This function is called when Import List button is clicked
$('input[name="button3"]').click(function() {
	$("#import-form").dialog("open");
});

// This function is called when Export List button is clicked
$('input[name="button4"]').click(function() {

	exportText = JSON.stringify(listList);
	console.log(exportText);
	$("#ExportModal").empty();
	$("#ExportModal").append(exportText);
	$("#export-modal").dialog("open");
});

// This function is used when Remove List button is clicked
$('#myList').on("click", ".RemoveList", function() {
	// Grab parent <li> element
	var item  = ($(this).closest("li"));

	// Use hide for animation and remove <li> element
	item.hide(100, 'swing', function() {
		item.remove();
	});

	// Remove list from list array
	var text = item.clone()
			   .children()
			   .remove()
			   .end()
			   .text();
	listList = $.grep(listList, function(e) {
		if (e["title"] !== text) {
			return e;
		}
	});
	saveData();
});

// This function is used when Remove Item button is clicked
$('#myList').on("click", ".RemoveItem", function() {
	// Grab parent <li> element
	var item = ($(this).closest("li"));

	// Use hide for animation and remove <li> element
	item.hide(100, 'swing', function() {
		item.remove();
	});

	// Remove list from list array
	text = item.clone()
			   .children()
			   .remove()
			   .end()
			   .text();
	
	// Grab the parent list's text
	var listText = item.closest("ul").closest("li").clone();
	listText = listText.children().remove().end().text();
	var listIndex;
	
	// Find index of listList that this item is in
	for (var i = 0;i<listList.length; i++) {
		if (listList[i].title === listText) {
			listIndex = i;
		}
	}
	
	// Remove item from the parent list
	listList[listIndex]["items"] = $.grep(listList[listIndex]["items"], function(e) {
		if (e["task"] !== text) {
			return e;
		}
	});
	
	// Save list to localStorage
	saveData();
	
});

// This function is used when the Add Items button is clicked
$('#myList').on("click", ".AddItem", function() {
	
	// Grab <UL> holding this list item
	itemUL = $(this).siblings(".itemList");
	$("#modal-form").dialog("open");
});

// This function creates the modal pop-up used to add items to a list
$(function() {
	var newText = $("#newText");
	
	// Set up modal fields
	$("#modal-form").dialog({
		autoOpen : false,
		show: {
			effect: "fade",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		},
		height : 200,
		width : 350,
		modal : true,
		buttons : {
			"Add this Item" : function() {
				addItem(newText.val());
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			newText.val("").removeClass("ui-state-error");
		}
	});
	
});

// This function creates the modal pop-up to import JSON
$(function() {
	var newList = $("#newList");
	
	// Set up modal fields
	$("#import-form").dialog({
		autoOpen : false,
		show: {
			effect: "fade",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		},
		height : 200,
		width : 350,
		modal : true,
		buttons : {
			"Add new List" : function() {
				
				// Parse string and create list object, then save list
				listList = JSON.parse(newList.val());
				generateHTML();
				saveData();
				$(this).dialog("close");
			},
			Cancel : function() {
				$(this).dialog("close");
			}
		},
		close : function() {
			newList.val("").removeClass("ui-state-error");
		}
	});
	
});


// This function creates the modal pop-up to export JSON
$(function() {
	// Set up modal fields
	$("#export-modal").dialog({
		autoOpen : false,
		show: {
			effect: "fade",
			duration: 1000
		},
		hide: {
			effect: "explode",
			duration: 1000
		},
		height : 300,
		width : 400,
		modal : true,
	});
	
});

// This funtion is called to add an item to a list
function addItem(newTask) {
	
	// Grab parent <li> its title
	var parentLI = itemUL.parent();
	var parentTitle = parentLI
						.clone()
						.children()
						.remove()
						.end()
						.text();
	// Find the index of the list that this item is in
	var listIndex;
	for (var i = 0;i<listList.length; i++) {
		if (listList[i].title === parentTitle) {
			listIndex = i;
		}
	}
	
	// Make sure the item is unique to this list
	var taskTest;
	$.each(listList[listIndex].items, function() {
		if (this["task"] === newTask) {
			alert("Task item already exists!");
			taskTest = false;
			return false;
		}
	});
	
	if (taskTest === false) {
		return;
	}
	
	// If unique, add to this item list
	listList[listIndex].items.push({
		"task" : newTask
	});
	
	// Generate new list and save list to localStorage
	generateHTML();
	saveData();
}

// This function is used to dynamically generate HTML for the lists
function generateHTML() {
	
	// Clear the current list to regenerate
	$("#myList").empty();
	var i = 0;
	
	// iterate through parent list and item list to add HTML
	$.each(listList, function() {
		$("#myList").append('<li class = "list">' + this["title"] + '<ul class="itemList"></ul></li>');
		var childUL = $("#myList").children(".list").children(".itemList").eq(i);
		$.each(this["items"], function(){
			childUL.append('<li class = "item">' + this["task"] + '</li>');
		})
		i++;
	});
	
	// Append various buttons to newly generated HTML for add/remove purposes
	$('li[class="list"]').append('<input type="button" class="RemoveList" value="Remove List">');
	$('li[class="list"]').append('<input type="button" class="AddItem" value="Add Item">');
	$('li[class="item"]').append('<input type="button" class="RemoveItem" value="Remove Item">');
}

// This function is used to save the list to localStorage
function saveData() {
	localStorage.setItem( storageKey, JSON.stringify(listList) );
}
