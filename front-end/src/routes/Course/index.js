import React from 'react'
import {BackTop, Button, Card, Col, Dropdown, Form, Icon, List, Menu, Row, Spin, message} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import Search from "antd/es/input/Search";
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class CourseDemo extends React.Component {
    state = {
        role: 'student',
        courses: [],
        gradeCourses: [],
        typeCourses: [],
        displayCourses: [],
        type: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        deleteCourses: false,
    };
    changeSubject = (subject) => {
        let modifiedList = [];
        let courseButton = document.getElementById("courseButton");
        if (subject === "所有") {
            this.setState({
                displayCourses: this.state.courses,
            });
            courseButton.innerText = "学科";
            return null;
        } else {
            for (let course of this.state.courses) {
                if (course.course.type === subject) {
                    modifiedList.push(course);
                }
            }
        }
        courseButton.innerText = subject;
        this.setState({
            displayCourses: modifiedList,
        });
    };
    componentWillMount() {
        this.setState({
            loading: true,
        });
        let storage = window.localStorage;
        let role = storage.getItem("type");
        this.setState({
            role: role
        });
        let type;
        if (this.props.location.pathname === "/home/course/overall") {
            type = 0;
            this.setState({type: 0});
        }
        if (this.props.location.pathname === "/home/course/ongoing") {
            type = 1;
            this.setState({type: 1});
        }
        if (this.props.location.pathname === "/home/course/end") {
            type = 2;
            this.setState({type: 2});
        }
        this.getCourses(type);
        this.setState({
            loading: false
        });

    }
    add0 = (m) => {
        return m < 10 ? '0' + m : m
    };
    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };
    getCourses = (type) => {
        /*    console.log(this.state.displayCourses);*/

        switch (type){
            case 0:{
                this.getAllCourses(0).then((res)=>{
                    if (res === null) {
                        message.error("failure loading courses!");
                        return;
                    }
                    for (let i = 0; i < res.length; ++i) {
                        res[i].course.startDate = this.format(res[i].course.startDate);
                        res[i].course.endDate = this.format(res[i].course.endDate);
                        this.getUserInfo(res[i].course.userId).then(
                            (username) => {
                                res[i].course.nickname = username;
                                this.setState({
                                    courses: res,
                                    displayCourses: res
                                });
                            }
                        )
                    }
                    this.setState({
                        courses: res,
                        displayCourses: res
                    });
                });
            }
            case 1:{
                if(this.state.role==='teacher'){
                    let storage = window.localStorage;
                    let username = storage.getItem("username");
                    this.getCoursesInfo(username).then((res) => {
                        if (res === null) {
                            message.error("failure loading courses!");
                            return;
                        }
                        for (let i = 0; i < res.length; ++i) {
                            res[i].course.startDate = this.format(res[i].course.startDate);
                            res[i].course.endDate = this.format(res[i].course.endDate);
                            this.getUserInfo(res[i].course.userId).then(
                                (username) => {
                                    res[i].course.nickname = username;
                                    this.setState({
                                        courses: res,
                                        displayCourses: res
                                    });
                                }
                            )
                        }
                        this.setState({
                            courses: res,
                            displayCourses: res
                        });
                        /*   console.log(this.state.displayCourses);*/
                    });
                }
            }
            case 2:{

            }
        }
    };
    getUserInfo = async (username) => {

        let config = {
            method: 'post',
            data: {
                'username': username
            },
            url: 'http://106.13.209.140:8000/getUserMessage',
            headers: {
                withCredentials: true,
            }
        };
        const user = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        return user.nickname;
    };
    handleSubmit = (e) => {
        e.preventDefault();
        /* console.log(123);*/
    };
    getCoursesInfo = async (username) => {
        const that = this;
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8787/course/getCoursesByTeacher?userId=' + username,
            headers: {
                withCredentials: true,
            }
        };
        // console.log(this.state.displayCourses,courseList)
        return await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                /*   console.log(error);*/
            });
    };
    getAllCourses = async (page) => {
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8787/course/getCourses?page=' + page + '&size=3',
            headers: {
                withCredentials: true,
            }
        };
        // console.log(this.state.displayCourses,courseList)
        return await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                /*   console.log(error);*/
            });
    };
    render() {
        const menu1 = (
            <Menu onClick={(e) => {
                this.changeSubject(e.item.props.children)
            }}>
                <Menu.SubMenu title="所有">
                    <Menu.Item>所有</Menu.Item>
                    <Menu.Item>语文</Menu.Item>
                    <Menu.Item>数学</Menu.Item>
                    <Menu.Item>英语</Menu.Item>
                    <Menu.Item>物理</Menu.Item>
                    <Menu.Item>化学</Menu.Item>
                    <Menu.Item>生物</Menu.Item>
                    <Menu.Item>历史</Menu.Item>
                    <Menu.Item>地理</Menu.Item>
                    <Menu.Item>政治</Menu.Item>
                    <Menu.Item>体育</Menu.Item>
                    <Menu.Item>心理</Menu.Item>
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
        );
        const menu2 = (
            <Menu>
                <Menu.Item title="所有">所有</Menu.Item>
                <Menu.SubMenu title="一年级">
                    <Menu.Item>一年级上</Menu.Item>
                    <Menu.Item>一年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="二年级">
                    <Menu.Item>二年级上</Menu.Item>
                    <Menu.Item>二年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="三年级">
                    <Menu.Item>三年级上</Menu.Item>
                    <Menu.Item>三年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="四年级">
                    <Menu.Item>四年级上</Menu.Item>
                    <Menu.Item>四年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="五年级">
                    <Menu.Item>五年级上</Menu.Item>
                    <Menu.Item>五年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="六年级">
                    <Menu.Item>六年级上</Menu.Item>
                    <Menu.Item>六年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="七年级">
                    <Menu.Item>七年级上</Menu.Item>
                    <Menu.Item>七年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="八年级">
                    <Menu.Item>八年级上</Menu.Item>
                    <Menu.Item>八年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="九年级">
                    <Menu.Item>九年级上</Menu.Item>
                    <Menu.Item>九年级下</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
        const {loadingMore} = this.state
        return (
            <div>
                <CustomBreadcrumb
                    arr={['课程', this.state.type === 0 ? "所有课程" : this.state.type === 1 ? "正在进行" : "已结束"]}/>

                <Card bordered={false} style={{marginBottom: 10}} id="howUse">

                    <Form layout='horizontal' style={{width: '70%', float: 'left'}} onSubmit={this.handleSubmit}>
                        <Form.Item label='搜索'>
                            {
                                (
                                    <Search
                                        placeholder="输入课程名称"
                                        enterButton="搜索"
                                        size="default"
                                        onSearch={value => {
                                            this.searchFun(value)
                                        }}
                                    />
                                )
                            }
                        </Form.Item>
                    </Form>
                    <Dropdown overlay={menu1} trigger={['click']} style={{marginTop: '30px'}}>
                        <Button style={{width: "10%", marginLeft: '30px'}}><span id="courseButton">学科</span> <Icon
                            type="down"/></Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft: '30px'}}>
                        <Button style={{width: "10%", marginTop: '42.5px', marginLeft: '30px'}}>年级<Icon
                            type="down"/></Button>
                    </Dropdown>
                </Card>
                {
                    this.state.role === 'student' ? null :
                        <Card bordered={false} style={{marginBottom: 10, height: '90px'}} id="howUse">
                            <Row/>
                            <Button style={{float: 'left'}} type="primary" icon="up-circle-o" size='large'
                                    onClick={() => {
                                        this.props.history.push('/home/course/addCourse');
                                    }}>创建一门新的课程</Button>

                            <p style={{
                                float: 'left',
                                color: 'grey',
                                marginLeft: '40px',
                                height: '90px'
                            }}>各位老师，若要修改具体课程内容，请从下方进入课程主页!</p>
                        </Card>
                }
                <Card>
                    <span style={{float: 'left'}}>课程列表</span>
                </Card>
                <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.displayCourses}
                          itemLayout='vertical'
                          pagination={{pageSize: 3,total:this.state.page*3}}
                          style={styles.listStyle}
                          renderItem={item => {
                              return (
                                  <List.Item style={{height: "210px"}}>
                                      <Row>
                                          <Col span={3} style={{fontSize: '15px'}}>
                                              <img width={120} height={120} alt="logo"
                                                   src={require('../../pic/teacher2.jpg')}
                                                   style={{marginBottom: '6px'}}/>
                                              <p style={{marginTop: '25px'}}><Icon type={"user"}/><span style={{
                                                  fontWeight: 'bold',
                                                  fontSize: 20,
                                                  marginLeft: '10px',
                                              }}>教师 ：</span><span style={{fontSize: 20}}>{item.course.nickname}</span>
                                              </p>
                                          </Col>
                                          <Col span={17}>
                                              <a style={{
                                                  color: 'darkslategray',
                                                  fontSize: '25px',
                                                  fontWeight: 'bold',
                                                  display: 'block'
                                              }}
                                                 href={"/home/course/class=" + item.course.id}>{item.course.courseName}</a>
                                              <p style={{
                                                  marginTop: '10px',
                                                  height: '90px'
                                              }}>{item.courseInfo.introduction}</p>
                                              <p style={{height: '20px'}}>
                                                  <span
                                                      style={{marginRight: '30px', fontSize: 20}}><span
                                                      style={{fontWeight: 'bold'}}>类型：</span> {item.course.type}</span>
                                                  <span style={{
                                                      marginRight: '30px',
                                                      fontSize: 20
                                                  }}><span
                                                      style={{fontWeight: 'bold'}}>年级： </span>{item.course.grade}</span>
                                                  <span style={{
                                                      marginRight: '30px',
                                                      fontSize: 20
                                                  }}><span
                                                      style={{fontWeight: 'bold'}}>上课班级： </span>{item.course.classes}</span>
                                              </p>
                                          </Col>
                                          <Col span={4}>
                                              <p ><IconText type={'calendar'}
                                                            text={'开始时间：'}/>
                                                  <span
                                                      style={{marginRight: '30px'}}>{item.course.startDate}</span>
                                              </p><p><IconText type={'calendar'}
                                                               style={{marginLeft: '30px'}}
                                                               text={'结束时间：'}/>
                                              {item.course.endDate}</p>
                                          </Col>
                                      </Row>

                                  </List.Item>
                              )
                          }}
                    />
                </Card>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
                {/*<Affix style={styles.affixBox}>*/}
                {/*  <Anchor offsetTop={200} affix={false}>*/}
                {/*    <Anchor.Link href='#howUse' title='课程搜索'/>*/}
                {/*    <Anchor.Link href='#basicUsage' title='课程列表'/>*/}
                {/*    <Anchor.Link href='#remoteLoading' title='公开课'/>*/}
                {/*  </Anchor>*/}
                {/*</Affix>*/}
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width: '80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width: '80%',
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
    listStyle: {
        width: '100%'
    },
    affixBox: {
        position: 'absolute',
        top: 200,
        right: 50,
        with: 170
    }
};

export default CourseDemo