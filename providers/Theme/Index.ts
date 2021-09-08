export default class Theme {
  public static getThemeColor(theme: string) {
    let result = {
      background: '',
      text: ''
    }
    switch (theme) {
      case 'orange':
        result = {
          background: '#ff470f',
          text: '#fff'
        }
        break
      case 'yellow':
        result = {
          background: '#ffe08a',
          text: '#000000'
        }
        break
      case 'cyan':
        result = {
          background: '#3e8ed0',
          text: '#ffffff'
        }
        break
      case 'purple':
        result = {
          background: '#b86bff',
          text: '#ffffff'
        }
        break
      case 'black':
        result = {
          background: '#000000',
          text: '#ffffff'
        }
        break
      default:
        result = {
          background: '#ffffff',
          text: '#000000'
        }
        break
    }

    return result
  }
}
