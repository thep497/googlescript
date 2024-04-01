function generateMessage(e)
{
  var form = FormApp.openById('GG FORM ID'); //Replace your form id 
  var itemResponses = e.response.getItemResponses();
  var text_data = 'มีลูกค้าประเมินความพึงพอใจเข้ามาใหม่';
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];

    var item = itemResponse.getItem();
    var tt = item.getType();
    var responseData = '';
    if (tt == FormApp.ItemType.GRID) {
      var gridItmRows = item.asGridItem().getRows();
      var gridResponse = itemResponse.getResponse();
      for (var k = 0; k < gridResponse.length; k++){
        //row's value +  column's value
        responseData += '\n'+gridItmRows[k]+': '+gridResponse[k];
      }
    }
    else 
      responseData = itemResponse.getResponse();

    text_data += '\n\n'+itemResponse.getItem().getTitle()+': '+responseData;
  }
  // text_data += '\n\n'+JSON.stringify(e);
  sendNotification(text_data);
}

function sendNotification(text)
{
  var formData = {
    'message': text,
  };
  var token = 'LINE NOTIFY TOKEN'; //Replace your LINE token id here
  var options = {
    'method' : 'post',
    'headers' : {'Authorization': "Bearer "+token},
    'contentType': 'application/x-www-form-urlencoded',
    'payload' : formData
  };
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', options);
}
