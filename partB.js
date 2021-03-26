window.addEventListener("load", initializeForm, false);

function initializeForm() {
  // Load in the Selectors.html
  LoadHTMLFile("cakeSelectionRadioButtions", "selectors.html");

  // load the Credits.html
  LoadHTMLFile("cakeChoiceForm", "cakeChoices.html");

  LoadHTMLFile("additionalToppings", "additionaltoppings.html");

  LoadHTMLFile("invoice", "invoice.html");
}

function LoadHTMLFile(id, url) {
  var ajaxCall = new XMLHttpRequest();
  // Setup the callback function
  ajaxCall.onreadystatechange = function () {
    if (ajaxCall.readyState == 4) {
      switch (ajaxCall.status) {
        case 200:
          var element = document.getElementById(id);
          if (element && element.innerHTML !== undefined) {
            element.innerHTML = ajaxCall.responseText;
          }
          else {
            console.log(`Could not find element '${id}' so I could not set .innerHTML`);
          }
          break;
        case 404:
          console.log(`Could not find url '${url}' so I could not set .innerHTML`);
          break;
        case 500:
          console.log(`Server reported a 500 error, please try again later`);
          break;
        default:
          console.log(`Could not handle AJAX status 'ajaxCall.status' so I could not set .innerHTML`);
          break;
      }

    }
  };

  // Indicate the URL to the form we want to load
  ajaxCall.open("GET", url, true);
  ajaxCall.send();
}

//#region function ParseTextAsXML(rawXML, id)
// Given some text that represents XML, load it as XML, then extract the elements that are
// the child nodes of a specific node the XML as a string
function ParseTextAsXML(rawXML, id) {
  // debugger;
  var returnString = "";
  // see https://www.w3schools.com/xml/xml_parser.asp 
  var parser = new DOMParser();
  if (parser) {
      var xmlDoc = parser.parseFromString(rawXML, "text/xml");
      if (xmlDoc && id !== undefined) {
          var XMLFragment = xmlDoc.getElementsByTagName(id);
          if (XMLFragment && XMLFragment.length > 0) {
              returnString = XMLFragment[0].innerHTML;
          }
      }
  }
  else {
      console.log(`Cannot parse fragment as XML`);
      console.log(rawXML);
  }
  return returnString;
}
//#endregion

const replacementAreaId = "replaceable-formcontent";

