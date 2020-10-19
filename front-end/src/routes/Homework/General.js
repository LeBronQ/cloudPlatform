import React from 'react'
import {
  Card,
  Spin,
  Button,
  Radio,
  List,
  Switch,
  Avatar,
  BackTop,
  Anchor,
  Affix,
  Icon,
  Pagination,
  Col,
  Statistic, Progress, Row
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import CommitTable from './CommitTable'
import ChangeHomework from './ChangeHomework'

const deadHomework = {
  title: '作业123',
  homeworkid:'11',

};
class ListDemo extends React.Component {
  state = {
    homework:deadHomework,
    studentHomework:deadHomework,
    userInfo:null,
    role:null
  };

  getUserInfo = async (username)=>{
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

  getData2 = () => {
    let storage = window.localStorage;
    let username = storage.getItem("username");
    this.getUserInfo(username);
  };


  getHomeworkOfStudents=async (homeworkId)=>{
    let config = {
      method: 'post',
      url: 'http://localhost:8080/getHomeworkOfStudents',
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
      studentHomework:hw,
    })
  };

  componentWillMount() {
    this.getData2()
  }

  render() {
    return (
      <div>
        <CustomBreadcrumb arr={['作业', '提交情况']}/>
        <Card bordered={false} title='作业内容' style={{marginBottom: 15}} id='verticalStyle'>
          <ChangeHomework homeworkId ={this.state.homework.homeworkid}/>
        </Card>
        <Card bordered={false} title='提交情况' style={{marginBottom: 15}} id='verticalStyle'>
          <Col span={24}>
            <Card style={{height:'130px'}}>
              <Statistic style={{marginTop:'10px',float:"left"}} title="总人数" value={'15'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已提交作业数" value={12} suffix="/ 15"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={3} suffix="/ 15"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已批改作业数" value={3} suffix="/ 12"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={84.25} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="适用人群" value={'一年级三班'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="开始时间" value={'2020.10.1 00:00'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="结束时间" value={'2020.10.3 23:59'} />
            </Card>
          </Col>
          <Col span = {24}>
            <CommitTable homeworkId ={this.state.studentHomework.homeworkid}/>
          </Col>
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
  listStyle:{
    width:'100%'
  },
}

export default ListDemo