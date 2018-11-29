export default class ResponseMessage {
  private status: string
  private message: string
  constructor(status: string, message: string) {
      this.status = status
      this.message = message
  }
}
