import axios from 'axios';
import 'antd/dist/antd.min.css';
import { GlobalOutlined, EditOutlined, PieChartOutlined, ExperimentOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Button, Col, Row, Dropdown, Space } from 'antd';
import '../../css/NavBar.css';


function NavigateBar() {
  const { Header } = Layout;
  const sessionUserName = sessionStorage.getItem('userName')

  const onLogout = () => {
    axios.post('/User/onLogout', null, {
      params: {
        'user_id': sessionStorage.getItem('userId')
      }
    })
      .finally(sessionStorage.clear())

    // App 으로 이동(새로고침)
    document.location.href = '/'
  }

  const Navbaritems = [
    {
      label: <a href='/'>World Map</a>,
      key: 'worldMap',
      icon: <GlobalOutlined />,
    },
    {
      label: 'Test Menu1',
      key: 'test1',
      icon: <EditOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],

    },
    {
      label: 'Test Menu2',
      key: 'test2',
      icon: <PieChartOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:5',
            },
            {
              label: 'Option 2',
              key: 'setting:6',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:7',
            },
            {
              label: 'Option 4',
              key: 'setting:8',
            },
          ],
        },
      ],
    },
    {
      label: 'Test Menu3',
      key: 'test3',
      icon: <ExperimentOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:9',
            },
            {
              label: 'Option 2',
              key: 'setting:10',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:11',
            },
            {
              label: 'Option 4',
              key: 'setting:12',
            },
          ],
        },
      ],
    },
  ];

  const dropDownItems = (
    <Menu id='dropDownItems'>
      <Menu.Item>회원정보</Menu.Item>
      <Menu.Item onClick={onLogout}>로그아웃</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout>
        <Row>
          <Col span={24}>
            <Header fixed='true'>
              <a href="/">
                <div className='logo' />
              </a>
              <Row>
                <Col span={8}>
                  <Menu theme="dark" mode="horizontal" items={Navbaritems} ></Menu>
                </Col>
                <Col span={16} style={{ textAlign: 'end' }}>
                  <Space style={{ minWidth: '210px', height: '65px' }}>
                    <span id='userName'>{sessionUserName} 님</span>
                    <Dropdown overlay={dropDownItems}>
                      <Button shape='circle' icon={<UserOutlined />} />
                    </Dropdown>
                  </Space>
                </Col>
              </Row>
            </Header>
          </Col>

        </Row>
      </Layout>
    </div>
  )
}
export default NavigateBar;