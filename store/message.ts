import { action, observable } from 'mobx'


class Message {
    @observable message: string = null;

    @action
    setMessage = (message) => {
        this.message = message
    }
}
export default Message;