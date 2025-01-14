import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar, Menu,BackTop, Input,Anchor,Form, Affix, Icon, Dropdown} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import TypingCard from '../../components/TypingCard'

/*const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        id:1,
        title: `数学${i}`,
        avatar: '../../assets/img/mistakes.png',
        description: '已知：如图，P是正方形ABCD内点，∠PAD=∠PDA=15° 求证：△PBC是正三角形',
        contexts:[["证明："],[<br/>],["∵∠PAD=∠PDA"],[<br/>],["∴AP=PD"],[<br/>],["∴PB=PC"],[<br/>],["∴得证"],],
        /!*        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',*!/
    })
}*/

const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        type:"数学",
        id:1,
        title: `【通知】七年级数学作业`,
        avatar: '../../pic/math1.png',
        description: '10/1的作业已发布，截止到第二天晚上',
        time: `2020/9/27`,
        /*        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',*/
    })
}

for (let i = 0; i < 6; i++) {
    data3.push({
        type: '语文',
        title: `【通知】七年级语文作业`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        id: 1,
        description: "10/1的作业已发布，截止到第二天晚上"
    })
}

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Notification extends React.Component {
    state = {
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        read:false,
        courses:data3,
        displayCourses:null,
        nrnum:0,
    }

    changeSubject=(subject)=>{
        let modifiedList=[];
        let courseButton=document.getElementById("courseButton");
        if(subject==="所有"){
            this.setState({
                displayCourses:this.state.courses,
            });
            courseButton.innerText="学科";
            return null;
        }else{
            for(let course of this.state.courses){
                if(course.type===subject){
                    modifiedList.push(course);
                }
            }
        }
        courseButton.innerText=subject;
        this.setState({
            displayCourses:modifiedList,
        });
    };

    componentWillMount() {
        //TODO:get role from local storage
        this.setState({
            loading: true,
        });
        this.getData2();
        this.setState({
            displayCourses:this.state.courses,
            loading: false
        });
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
            <Menu onClick={(e)=>{this.changeSubject(e.item.props.children)}}>
                <Menu.SubMenu title="所有">
                    <Menu.Item>所有</Menu.Item>
                    <Menu.Item>语文</Menu.Item>
                    <Menu.Item >数学</Menu.Item>
                    <Menu.Item>英语</Menu.Item>
                    <Menu.Item >物理</Menu.Item>
                    <Menu.Item >化学</Menu.Item>
                    <Menu.Item>生物</Menu.Item>
                    <Menu.Item >历史</Menu.Item>
                    <Menu.Item >地理</Menu.Item>
                    <Menu.Item>政治</Menu.Item>
                    <Menu.Item >体育</Menu.Item>
                    <Menu.Item >心理</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="文科类">
                    <Menu.Item onClick={() => {
                    }}>语文</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>英语</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>历史</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>地理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>政治</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="理科类">
                    <Menu.Item onClick={() => {
                    }}>数学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>物理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>化学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>生物</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>其它</Menu.Item>
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
                <CustomBreadcrumb arr={['通知']}/>
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
                        <Button id="courseButton" style={{width:"10%",marginLeft:'30px'}}>学科 <Icon type="down"/></Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                        <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}>年级<Icon type="down"/></Button>
                    </Dropdown>
                </Card>

                <Card bordered={false} title='通知' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.displayCourses}
                          /*itemLayout='vertical'*/
                          pagination={{pageSize: 10}}
                          style={styles.listStyle}
                          renderItem={item=>{
                              return (
                                  <List.Item  actions={this.state.read===false?[<p>未读</p>]:[<p>已读</p>]}
                                      /*actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}*/
                                       >
                                      <List.Item.Meta
                                          avatar={<Avatar src={require("../../pic/math1.png")} />}
                                          title={<a onClick={()=>{this.setState({read:true})}} href={"/home/notification/page"}>{item.title}</a>}
                                          description={item.description}>
                                      <row>
                                          <p style={{fontSize:'20px',fontWeight:'bold'}}>{item.title}</p>
                                          <p style={{fontSize:'5px',fontWeight:'bold',display:'block'}}>{item.time}</p>
                                          <p style={{marginTop:'10px'}}>{item.description}</p>
                                      </row>
                                      </List.Item.Meta>
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

export default Notification