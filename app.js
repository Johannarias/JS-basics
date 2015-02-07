var itemTemplate = $('#templates .item')
var list         = $('#list')

var addItemToPage = function(itemData) {
	//{id:5, description: 'hello', completed: false}
  var item = itemTemplate.clone()
  item.attr('data-id',itemData.id)
  item.find('.description').text(itemData.description)
  if(itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
}

var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/JAAC/"
})

loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})

$('#add-form').on('submit', function(event) {
  //debbuger;
  event.preventDefault() 
  var itemDescription = event.target.itemDescription.value
  var creationRequest = $.ajax({
	  type: 'POST',
	  url: "http://listalous.herokuapp.com/lists/JAAC/items",
	  data: { description: itemDescription, completed: false }
  })
  
  creationRequest.done(function(itemDataFromServer) {
    addItemToPage(itemDataFromServer)
	  event.target.itemDescription.value = null; //delete the value from the field
  })
  //alert('trying to create a new item with a description ' + itemDescription)
})

$('#list').on('click', '.complete-button', function(event) {
  //alert('trying to complete an item!')
  var item = $(event.target).parent()
  isItemCompleted = item.hasClass('completed') // does the class I am looking at has the class 'completed'? boolean
  var itemId = item.attr('data-id')
	//alert('clicked item ' + itemId + ', which has completed currently set to ' + isItemCompleted)
  var updateRequest = $.ajax({
	  type: 'PUT',
	  url: "https://listalous.herokuapp.com/lists/YOUR-LIST-NAME-HERE/items/" + itemId,
	  data: { completed: !isItemCompleted }
	})
	
  updateRequest.done(function(itemData) {
	  if (itemData.completed) {
	    item.addClass('completed')
	  } else {
	    item.removeClass('completed')
	  }
	})
})




