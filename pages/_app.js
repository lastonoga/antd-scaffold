import '../styles/globals.css'
import 'antd/dist/antd.css';
import { EwaRoot } from '../ewa/index.js';

import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot config={{ mutators: [] }}>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
