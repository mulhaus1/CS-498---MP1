/**
 * @author Mike
 */

// Create object array for lists

storageKey = "My_Data"

var listList = [];
var itemUL;
//var tempList;

var temp = localStorage.getItem(storageKey);

if (temp !== null) {
	listList = JSON.parse(temp);
	console.log(listList)
	generateHTML();
}


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
	generateHTML();
	saveData();
	// Clear value of text input box
	$('input[name="inputText"]').val('');
});

// This function is used when removing list button is clicked
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

// This function is used when removing item button is clicked
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
			   
	//console.log(item)
	
	var listText = item.closest("ul").closest("li").clone();
	listText = listText.children().remove().end().text();
	var listIndex;
	
	for (var i = 0;i<listList.length; i++) {
		if (listList[i].title === listText) {
			listIndex = i;
		}
	}
	
	listList[listIndex]["items"] = $.grep(listList[listIndex]["items"], function(e) {
		console.log(e["task"]);
		console.log(text);
		if (e["task"] !== text) {
			return e;
		}
	});
	saveData();
	
});

// This function is used when the Add Items button is clicked
$('#myList').on("click", ".AddItem", function() {
	//tempList = ($(this).closest("li"));
	itemUL = $(this).siblings(".itemList");
	$("#modal-form").dialog("open");
});

$(function() {
	var newText = $("#newText");
	//all-fields = $( [] ).add( newText );

	$("#modal-form").dialog({
		autoOpen : false,
		height : 300,
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

function addItem(newTask) {
	//console.log(itemUL.parent());
	var parentLI = itemUL.parent();
	var parentTitle = parentLI
						.clone()
						.children()
						.remove()
						.end()
						.text();
						
	//console.log(parentLI)
	var listIndex;
	
	for (var i = 0;i<listList.length; i++) {
		if (listList[i].title === parentTitle) {
			listIndex = i;
		}
	}
	//console.log(listIndex)
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
	
	listList[listIndex].items.push({
		"task" : newTask
	});
	
	generateHTML();
	saveData();
}

function generateHTML() {
	//console.log(listList);
	$("#myList").empty();
	var i = 0;
	$.each(listList, function() {
		$("#myList").append('<li class = "list">' + this["title"] + '<ul class="itemList"></ul></li>');
		var childUL = $("#myList").children(".list").children(".itemList").eq(i);
		//console.log(childUL);
		$.each(this["items"], function(){
			childUL.append('<li class = "item">' + this["task"] + '</li>');
		})
		i++;
	});
	
	$('li[class="list"]').append('<input type="button" class="RemoveList" value="Remove List">');
	$('li[class="list"]').append('<input type="button" class="AddItem" value="Add Item">');
	$('li[class="item"]').append('<input type="button" class="RemoveItem" value="Remove Item">');
}

function saveData() {
	localStorage.setItem(storageKey, JSON.stringify(listList));
}
