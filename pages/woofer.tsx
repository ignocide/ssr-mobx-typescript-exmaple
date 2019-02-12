import Link from 'next/link'
import axios from 'axios'
import { Component } from 'react';
import '../style/index.scss'
import '../style/header.scss'
import Playlists from "../components/woofer/playlists";
import { Col, Row } from "../components/layout/grid";
import Player from "../components/woofer/player";
import * as authApi from '../api/client/auth'
import Head from "next/head";
import withAuth from '../components/hoc/withAuth'
import withStore from '../components/hoc/withStore';
import { inject, observer } from 'mobx-react'
interface PI {
  user: any
}

@withStore()
@withAuth
@inject('auth')
@observer
class WooferPage extends Component<PI, null> {
  static getInitialProps = async function ({ req, res, ...etc }) {
    return {
    }
  }

  render() {
    // console.log(this.props, this.props.store.auth.start, 'in woofer main')
    const { user } = this.props

    return (
      <div className="main">
        <nav id={'gnb'}>
          <div className="gnb-main">
            <div className="gnb-main-wrapper container">
              <div className="gnb-main-left">
                <Link href={'/'}>{"WOOFER"}</Link>
              </div>
              <div className="gnb-main-center">

              </div>
              <div className="gnb-main-right">
                <Link href={'/'}>{"로그인"}</Link>
              </div>
            </div>
          </div>
          <div className="gnb-sub">
            <div className="gnb-sub-wrapper container">
              <div className="gnb-sub-left">
                <Link href={'/'}>{'재생목록'}</Link>
                <Link href={'/'}>{'검색'}</Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <Row style={{ paddingTop: 50 }}>
            <Col size={6}>
              <Player player={{}} />
            </Col>
            <Col size={6}>
              <Playlists />
            </Col>
          </Row>
        </div>
      </div>
    )
  }

}

export default inject()(observer(WooferPage));