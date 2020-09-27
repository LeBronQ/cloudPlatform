import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar, Menu,BackTop, Input,Anchor,Form, Affix, Icon, Dropdown, Row, Col} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import TypingCard from '../../components/TypingCard'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { View } from '@antv/data-set'

const data = [
    {date: '9/1', value: '3%'},
    {date: '9/2', value: '4%'},
    {date: '9/3', value: '3.5%'},
    {date: '9/4', value: '5%'},
    {date: '9/5', value: '4.9%'},
    {date: '9/6', value: '5%'},
    {date: '9/7', value: '6%'},
    {date: '9/8', value: '3%'},
    {date: '9/9', value: '4%'}
];

const cols = {
    'value': {min: 0},
    'date': {range: [0, 1]}
}

const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        id:1,
        title: `数学${i}`,
        avatar: '../../assets/img/mistakes.png',
        description: '已知：如图，P是正方形ABCD内点，∠PAD=∠PDA=15° 求证：△PBC是正三角形',
        contexts:[["证明："],[<br/>],["∵∠PAD=∠PDA"],[<br/>],["∴AP=PD"],[<br/>],["∴PB=PC"],[<br/>],["∴得证"],],
        time: `2020/9/27`,
/*        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',*/
    })
}
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Mistakes extends React.Component {
    state = {
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        this.getData2();
        this.setState({
            loading: false
        })
    }

    getData2 = () => {
        this.setState({
            loadingMore: true
        })
        axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
            this.setState({
                data2: this.state.data2.concat(res.data.results),
                loadingMore: false
            })
        })
    }

    render() {
        const menu1 = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">语文</Menu.Item>
                <Menu.Item key="2">数学</Menu.Item>
                <Menu.Item key="3">英语</Menu.Item>
                <Menu.Item key="4">历史</Menu.Item>
                <Menu.Item key="5">物理</Menu.Item>
                <Menu.Item key="6">政治</Menu.Item>
                <Menu.Item key="7">化学</Menu.Item>
                <Menu.Item key="8">生物</Menu.Item>
                <Menu.Item key="9">地理</Menu.Item>
            </Menu>
        )
        const { SubMenu } = Menu;
        const menu2 = (
            <Menu onClick={this.handleMenuClick}>
                <SubMenu title="一年级">
                <Menu.Item key="10">一年级上</Menu.Item>
                <Menu.Item key="11">一年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="二年级">
                <Menu.Item key="12">二年级上</Menu.Item>
                <Menu.Item key="13">二年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="三年级">
                <Menu.Item key="14">三年级上</Menu.Item>
                <Menu.Item key="15">三年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="四年级">
                <Menu.Item key="16">四年级上</Menu.Item>
                <Menu.Item key="17">四年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="五年级">
                <Menu.Item key="18">五年级上</Menu.Item>
                <Menu.Item key="19">五年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="六年级">
                <Menu.Item key="20">六年级上</Menu.Item>
                <Menu.Item key="21">六年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="七年级">
                <Menu.Item ke y="22">七年级上</Menu.Item>
                <Menu.Item key="23">七年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="八年级">
                <Menu.Item key="24">八年级上</Menu.Item>
                <Menu.Item key="25">八年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="九年级">
                <Menu.Item key="26">九年级上</Menu.Item>
                <Menu.Item key="27">九年级下</Menu.Item>
                </SubMenu>
            </Menu>
        )
        const {size, bordered, loading, data2, loadingMore} = this.state
        const loadMore = (
            <div style={styles.loadMore}>
                {/*不知道为什么这种写法有问题，会报错*/}
                {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
                <Spin style={loadingMore?{}:{display:'none'}}/>
                <Button style={!loadingMore?{}:{display:'none'}} onClick={() => this.getData2()}>加载更多</Button>
            </div>
        )
        return (
            <div>
                <CustomBreadcrumb arr={['错题']}/>

                <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                            <Form layout='horizontal' style={{width: '70%',float:'left'}} onSubmit={this.handleSubmit}>
                                <Form.Item label='搜索' >
                                    {
                                        (
                                            <Input/>
                                        )
                                    }
                                </Form.Item>
                            </Form>
                            <Dropdown overlay={menu1} trigger={['click']} style={{ marginTop: '30px'}}>
                                <Button  style={{width:"10%",marginLeft:'30px'}}>学科 <Icon type="down"/></Button>
                            </Dropdown>
                            <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                                <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}>年级<Icon type="down"/></Button>
                            </Dropdown>
                </Card>
                <Card title='错误率' bordered={false} className='card-item'>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="date"/>
                    <Axis name="value"/>
                    <Tooltip crosshairs={{type: 'y'}}/>
                    <Geom type="line" position="date*value" size={2}/>
                    <Geom type='point' position="date*value" size={4} shape={'circle'}
                          style={{stroke: '#fff', lineWidth: 1}}/>
                </Chart>
            </Card>
                <Card bordered={false} title='题目' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={data3}
                          itemLayout='vertical'
                          pagination={{pageSize: 2}}
                          style={styles.listStyle}
                          renderItem={item=>{
                              return (
                                  <List.Item
                                      /*actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}*/
                                      extra={<img /*width={275}*/ alt="logo" src={require("../../assets/img/mistakes.png" )}/>}>
                                      {/*<List.Item.Meta
                                          avatar={<Avatar src={item.avatar} />}
                                          title={<a>{item.title}</a>}
                                          description={item.description}>*/}
                                          <row>
                                      <p style={{fontSize:'20px',fontWeight:'bold'}}>{item.title}</p>
                                              <p style={{fontSize:'5px',fontWeight:'bold',display:'block'}}>{item.time}</p>
                                      <p style={{marginTop:'10px'}}>{item.description}</p>
                                      <p style={{marginTop:'10px'}}>{item.contexts}</p>
                                          </row>
                                      {/*{item.content}*/}
                                  </List.Item>
                              )
                          }}
                    />
                </Card>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width:'80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width:'80%',
        padding: '0 24px',
        boxSizing: 'border-box',
        border: '1px solid #fff'
    },
    loadMore: {
        height: 32,
        marginTop: 16,
        lineHeight: '32px',
        textAlign: 'center',
    },
    listStyle:{
        width:'100%'
    },
    affixBox:{
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default Mistakes