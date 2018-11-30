//This file will be used when the default language is Amharic

function AcceptAlphabetsOnly(event, allowSpaces) {
  var keyCode = event.which ? event.which : event.keyCode;

  if ((keyCode >= 97 && keyCode <= 122) ||
    (keyCode >= 65 && keyCode <= 90) ||
    ((allowSpaces == true) && (keyCode == 32))
  ) {
    return true;
  }

  return false;
};

function AcceptAlphabetsOnlyEx(event, allowSpaces) {
  if (allowSpaces == true) {
    return AcceptRegExOnly(event, /^[a-zA-Z ]$/);
  }
  return AcceptRegExOnly(event, /^[a-zA-Z]$/);
};

function AcceptNumericOnly(event, allowPeriod) {
  var keyCode = event.which ? event.which : event.keyCode;

  if ((keyCode >= 48 && keyCode <= 57) ||         //lets allow only numerics
    ((allowPeriod == true) && (keyCode == 45))  //allow period conditionally based on the control's choice
  ) {
    return true;
  }

  return false;
};

function AcceptNumericOnlyEx(event, allowPeriod) {
  if (allowPeriod == true) {
    return AcceptRegExOnly(event, /^[0-9 .]$/);
  }
  return AcceptRegExOnly(event, /^[0-9 -]$/);
};

function AcceptAlphaNumericOnly(event, allowSpaces, allowPeriod) {
  if ((AcceptAlphabetsOnly(event, allowSpaces) == true) ||    //Create alphabetic text box
    (AcceptNumericOnly(event, allowPeriod) == true)         //Create numeric text box
  ) {
    return true;
  }

  return false;
};

function AcceptEthiopicOnly(event, allowSpaces, allowPeriod) {
  if (allowSpaces == true && allowPeriod == false) {
    return AcceptRegExOnly(event, /^([ \u1200-\u137F])+$/);
  }
  if (allowPeriod == true && allowSpaces == false) {
    return AcceptRegExOnly(event, /^([ \u1200-\u137F])+$/);
  }
  if (allowPeriod == true && allowSpaces == true) {
    return AcceptRegExOnly(event, /^([ \u1200-\u137F .])+$/);
  }

  return AcceptRegExOnly(event, /^([ \u1200-\u137F \u0008])+$/);
};
function AcceptAlphaNumericOnlyEx(event, allowSpaces, allowPeriod) {
  if (allowSpaces == true && allowPeriod == false) {
    return AcceptRegExOnly(event, /^[a-zA-Z0-9 ]$/);
  }
  if (allowPeriod == true && allowSpaces == false) {
    return AcceptRegExOnly(event, /^[a-zA-Z0-9.]$/);
  }
  if (allowPeriod == true && allowSpaces == true) {
    return AcceptRegExOnly(event, /^[a-zA-Z0-9 .]$/);
  }

  return AcceptRegExOnly(event, /^[a-zA-Z0-9]$/);
};

function AcceptDateCharacters(event, separator) {
  if (separator.length != 1)  //only pass single character separators here
  {
    return false;
  }
  //lets allow digits
  var expression = "^[0-9";

  //lets allow the separator character
  expression += separator;

  //lets complete the expression
  expression += "]$";

  var regex = new RegExp(expression);
  return AcceptRegExOnly(event, regex)
};

function AcceptRegExOnly(event, regex) {
  var keyCode = event.which ? event.which : event.keyCode;

  var keyPressed = String.fromCharCode(keyCode);
  return regex.test(keyPressed);
};