export default class InputValidator {

  static validateEmail(email) {
    let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;  
    return emailRegex.test(email);
  }

}