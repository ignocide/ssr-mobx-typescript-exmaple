import { Component } from 'react'
import { Provider } from 'mobx-react'
import { stackStore, genereateStores, getStoreStackMap, initialInstance } from '../../store/index'

interface IState {
    stores: any
}

function withStore(...stores: { new(...args: any[]) }[]) {
    return function (WrappedComponent) {
        class _withStore extends Component<any, IState> {

            static async getInitialProps(ctx) {
                let appProps = {}
                if (WrappedComponent.getInitialProps) {
                    const appProps = await WrappedComponent.getInitialProps(ctx)
                }
                genereateStores(stores);
                const storeMap = getStoreStackMap();
                return {
                    ...appProps,
                    storeMap: storeMap
                }
            }

            constructor(props) {
                super(props);
                const isServer = typeof window === 'undefined'
                let storeMap = props.storeMap
                if (!isServer) {
                    genereateStores(stores);
                    storeMap = getStoreStackMap();
                }
                this.state = {
                    stores: storeMap
                }
            }


            render() {
                // ... and renders the wrapped component with the fresh data!
                // Notice that we pass through any additional props
                const { stores } = this.state;
                const { storeMap, ...props } = this.props;
                return <Provider {...stores}>
                    <WrappedComponent  {...this.props} />
                </Provider>
            }
        };

        return _withStore

    }
}

export default withStore