import '../styles/globals.css'
import 'antd/dist/antd.css';
import { EwaRoot } from '../ewa/index.js';
import { Components } from '../config/antd'

import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <EwaRoot components={Components}>
                <Component {...pageProps} />
            </EwaRoot>
        </RecoilRoot>
    )
}

export default MyApp