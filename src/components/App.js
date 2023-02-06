import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import SignUp from './Page/SignUp';
import TestJejuBlock1District1 from './Page/Test_jeju_block1_district1';
import WebT01 from './Page/WebT_01';
import WebT02 from './Page/WebT_02';
import WebT03 from './Page/WebT_03';
import DDhtsLineA from './Page/DDhts_Line_A';
import GeoMap from './Page/GeoMap';
import PopUp from './popup/Popup';
import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('userId') != null) {
      setIsLogin(true)
    }
  }, [])

  // const menu = [
  //   {
  //     path: "/SignUp",
  //     name: '회원가입',
  //     Component: () => <GeoMap />
  //   },
  //   {
  //     path: "/test_gangneung",
  //     name: '강릉',
  //     Component: () => <Map />
  //   },
  //   {
  //     path: "/test_yangsan",
  //     name: '양산',
  //     Component: () => <DDhtsMap />
  //   },
  //   {
  //     path: "/test_jeju",
  //     name: '제주',
  //     Component: () => <JejuFactoryMap />
  //   },
  //   {
  //     path: "/VirtualFactory1",
  //     name: '공장',
  //     Component: () => <Main />
  //   },
  //   {
  //     path: "/WebT_01",
  //     name: '공장01',
  //     Component: () => <WebT01 />
  //   },
  //   {
  //     path: "/WebT_02",
  //     name: '공장02',
  //     Component: () => <WebT02 />
  //   },
  //   {
  //     path: "/DDhts_Line_A",
  //     name: '공장A',
  //     Component: () => <DDhtsLineA />
  //   },
  // ];

  const exceptList = [
    '/SignUp',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac1',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac2',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac3',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac4',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac5',
    '/test_jeju_block1_district1/test_jeju_block1_district1_mac6',
  ];

  const queryClient = new QueryClient();

  return (
    <Router>
      <Switch>
        {/* 로그인 상태에 따라 다른 페이지로 이동 */}
        <QueryClientProvider client={queryClient}>
          <Login isLogin={isLogin} except={exceptList} >
            <Layout except={exceptList}>
              <Route exact path="/" render={() => <GeoMap />} />
              <Route exact path="/SignUp" component={SignUp} />
              {/* <Route exact path="/test_gangneung_block1" render={() => <TestGangneungBlock1Map />} /> */}
              {/* <Route exact path="/test_changwon_block1" render={() => <TestChangwonBlock1Map />} /> */}
              {/* <Route exact path="/ddhts_yangsan_block1" render={() => <DdhtsYangsanBlock1 />} /> */}
              {/* <Route exact path="/test_jeju_block1" render={() => <TestJejuBlock1Map />} /> */}
              <Route exact path="/test_gangneung_block1_district1" render={() => <WebT01 />} />
              <Route exact path="/test_gangneung_block1_district2" render={() => <WebT02 />} />
              <Route exact path="/test_gangneung_block1_district3" render={() => <WebT03 />} />
              <Route exact path="/test_changwon_block1_district1" render={() => <WebT01 />} />
              <Route exact path="/test_changwon_block1_district2" render={() => <WebT02 />} />
              <Route exact path="/test_changwon_block1_district3" render={() => <WebT03 />} />
              <Route exact path="/ddhts_yangsan_block1_district1" render={() => <DDhtsLineA />} />
              <Route exact path="/test_jeju_block1_district1" render={() => <TestJejuBlock1District1 />} />
              <Route exact path="/test_jeju_block1_district1/:id" render={() => <PopUp />} />
            </Layout>
          </Login>
        </QueryClientProvider>
      </Switch>
    </Router>
  );
}

export default App;