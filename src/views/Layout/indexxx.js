import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  CodepenCircleOutlined,
  DownOutlined,
  ReadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { log } from '@craco/craco/lib/logger';
const { Header, Sider, Content } = Layout
const { $http } = React
const style = require('./index.module.scss')
const mapMenu = [
  { key: 'home', name: '首页' },
  { key: 'user', name: '用户列表', parentName: '用户管理', parentKey: 'user-menu' },
  { key: 'roles', name: '角色管理', parentName: '用户管理', parentKey: 'user-menu' },
  { key: 'articles', name: '文章列表', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'category', name: '文章分类', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'comments', name: '文章评论', parentName: '文章管理', parentKey: 'article-menu' },
  { key: 'message', name: '消息中心', parentName: '社区管理', parentKey: 'community' },
  { key: 'website-setting', name: '网站设置', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'email-service', name: '邮件服务', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'basic-info', name: '基本资料', parentName: '设置管理', parentKey: 'setting-menu' },
  { key: 'modify-password', name: '修改密码', parentName: '设置管理', parentKey: 'setting-menu' },
]

class LayoutContainer extends React.Component {
  constructor(props) {
    super(props)
    const currentPath = this.splitPath()
    const openKeys = '/user'
    const userInfo = '小明'
    this.state = {
      title:"管理系统",
      collapsed:false, //侧边栏状态显示
      selectedKeys:[openKeys,menuKey],
      breadcrumb:openKeys.breadcrumb,
      userInfo

    }
  }
  splitPath=()=>{
    //默认路由
    const { location} =this.props
    console.log(location,pathname.substr(1));
     return location,pathname.substr(1)

  }
  handleRouter=(item)=>{
    console.log(this.props,item);
    const { history} = this.props
    // console.log(item);
  }


  render() {
    // const {route} = this.props
    // const {} =this.state



    return (
      <HashRouter>
        <Layout className={style['layout-container']}>
          <Sider rigger={null} collapsible  collapsed={false}>
            <div className={style['logo']}>
              <CodepenCircleOutlined className={style['icon']} />
              {/* <span>{title}</span> */}
            </div>
            {/*      菜单列表一列 theme="dark" mode="inline"    */}
            <Menu theme="dark" mode="inline" onClick={this.handleRouter} >
              <Menu.Item key='home' ican={<HomeOutlined />}>
                首页
              </Menu.Item>
              <Menu.SubMenu
                key='user-menu'
                title={
                  <span>
                    <UserOutlined />
                    <span>用户管理</span>
                  </span>
                }
              >
                <Menu.Item key="user"> 用户列表 </Menu.Item>
                <Menu.Item key="roles"> 角色管理 </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                  key="article-menu"
                  title={
                    <span>
                      <FileTextOutlined />
                      <span>文章管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="articles">文章列表</Menu.Item>
                  <Menu.Item key="category">文章分类</Menu.Item>
                  <Menu.Item key="comments">文章评论</Menu.Item>
                </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout>
            内容
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}
export default LayoutContainer