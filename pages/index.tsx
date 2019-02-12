import { Component } from 'react';
import withStore from '../components/hoc/withStore';
import MessageStore from '../store/message';
import { inject, observer } from 'mobx-react'

import '../style/index.scss'
import '../style/header.scss'

interface IProps {
  messageStore: MessageStore,
}

//withStore is upper then inject and observer
//can be use many arguments
@withStore(MessageStore)
@inject('message')
@observer
class Index extends Component<IProps, null> {

  componentWillMount() {
    const { message } = this.props
    message.setMessage('hello world')
  }
  render() {
    const { message: messageStore } = this.props;

    return (
      <div className="main">
        <nav id={'gnb'}>
          <div className="gnb-main">
            <div className="gnb-main-wrapper container">
              <div className="gnb-main-left">
                <a>{"ssr"}</a>
              </div>
              <div className="gnb-main-center">

              </div>
              <div className="gnb-main-right">
                <a>{"with mobx"}</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container" style={{ textAlign: 'center' }}>
          {messageStore.message}
        </div>
      </div>)
  }

}
export default Index