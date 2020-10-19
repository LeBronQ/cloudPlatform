import React from 'react'
import {Card, Button, List, Icon,} from 'antd'
import axios from 'axios'


const test = [
    {
        id:'1',
        handinTime:'2020-10-01 16:12:12'
    },
    {
        id:'2',
        handinTime:'2020-10-03 16:12:12'
    },
    {
        id:'3',
        handinTime:'2020-10-02 16:12:12'
    },
    {
        id:'4',
        handinTime:'2020-10-04 16:12:12'
    },

];

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class HomeworkList extends React.Component {
    state = {
        type:0,
        size: 'default',
        bordered: true,
        delete: true,
        role: 'teacher',
        homeworkList: test,
        allAmount: 40,
        t: test
    };

    componentWillMount() {
        this.setState({
            homeworkList:this.props.homeworkList,
            delete:this.props.delete
        });
        this.getData2();

    }
    getUserInfo=async (username)=>{
        let config = {
            method: 'post',
            data :{
                'username':username
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
        console.log(user);
        this.setState({
            userInfo:user,
            role:user.type
        })
    };

    deleteTeacherHomeworkOne=async (homeworkId)=>{
        let config = {
            method: 'post',
            url: 'http://localhost:8080/deleteTeacherHomeworkOne',
            data:{
                'homeworkId':homeworkId
            },
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        this.setState({
            homework:hw,
        })
    };

    getData2 = () => {
        this.setState({
            loadingMore: true
        });
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            homeworkList:nextProps.homeworkList,
            delete:nextProps.delete
        });
    }

    SetCon = (item) => {
        let nowDate = new Date();
        let endT = new Date(item.endTime);
        let startT = new Date(item.startTime);

        if (nowDate.getTime() < startT.getTime()){
            return "未开始";
        }
        else if (nowDate.getTime() < endT.getTime()){
            return "正在进行";
        }
        else return "已结束";
    }

    render() {
        return (
            <div>
                    <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                        <div>
                            <span style={{height:'15px'}}>所有作业</span>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.t.sort(function(a,b){
                                    return Date.parse(a.handinTime) - Date.parse(b.handinTime)
                                });
                            }}>按时间升序</Button>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.t.sort(function(a,b){
                                    return Date.parse(b.handinTime) - Date.parse(a.handinTime)
                                });
                            }}>按时间降序</Button>
                        </div>
                        <List dataSource={this.state.homeworkList}
                              itemLayout='vertical'
                              pagination={{pageSize: 3}}
                              style={styles.listStyle}
                              renderItem={item=>{
                                  let range="";
                                  for(let i of item.range){
                                      range=range+i+",";
                                  }
                                  return (
                                      <List.Item
                                          actions={this.state.role === 'student' ?
                                              [<IconText type="file-text" text= {item.score} />,
                                                  <IconText type="calendar" text={"截止："+item.endTime} />,
                                                  <IconText type="schedule" text ={ item.handinTime === null ? "未提交":"已提交"} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />,
                                                  <IconText type="profile" text={"布置范围："+range} />
                                                  ]
                                          : [<IconText type="file-text" text={item.score} />,
                                                  <IconText type="calendar" text={"截止："+item.endTime} />,
                                                  <IconText type="pie-chart" text = {this.state.homeworkList.length +"/" + this.state.allAmount} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />,
                                                  <IconText type="profile" text={"布置范围："+range} />
                                              ]}

                                          extra={(this.state.delete === false ? []:[<Button type="danger" onClick={()=>{
                                              //delete
                                          }}>删除</Button>])}
                                          >
                                          <List.Item.Meta
                                              title={this.state.role === 'student' ? <a href={"/home/homework/commit"}>{item.title}</a> : <a href={"/home/homework/General"}  style={{color:'darkslategray',fontWeight:'bold',fontSize:'18px'}}>{item.title}</a>}
                                              description={item.description}
                                          />
                                          {item.content}
                                      </List.Item>
                                  )
                              }}
                        />
                    </Card>
            </div>
        )
    }
}

const styles = {
    listStyle:{
        width:'100%',
        marginTop:'15px'
    }
}

export default HomeworkList