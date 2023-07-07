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
    const openKeys = this.handleFindOpenMenu(currentPath)
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
    this.state = {
      collapsed: false,
      title: '管理系统',
      selectedKeys: [currentPath],
      defaultOpenKeys: [openKeys.menuKey],
      breadcrumb: openKeys.breadcrumb,
      userInfo
    }
  }
  splitPath = () => {
    // 默认路由
    const { location } = this.props
    return location.pathname.substr(1)
  }
    //隐藏系统名字
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      title: this.state.collapsed ? '管理系统' : ''
    })
  }
    //选定默认跳转路由
  handleFindOpenMenu = (selectedKeys) => {
    const findMenu = mapMenu.find(subMenu => subMenu.key === selectedKeys)
    let breadcrumb = []
    breadcrumb.push(findMenu.parentName, findMenu.name)
    breadcrumb = breadcrumb.filter(v => v)
    return {
      menuKey: findMenu && findMenu.parentKey,
      subMenu: findMenu && findMenu.key,
      breadcrumb
    }
  }
     //头像事件
  handleMenuClick = (item) => {
    const { history } = this.props
    const { key } = item
    if (key === 'logout') {
      $http.get('logout').then(() => {
        sessionStorage.clear()
        history.push('/login')
      })
    } else {
      this.setState({
        selectedKeys: [item.key]
      }, () => {
        history.push(item.key)
      })
    }
  }
  //菜单路由点击
  handleRouter = (item) => {
    const { history } = this.props
    const findMenu = mapMenu.find(subMenu => subMenu.key === item.key)
    let breadcrumb = []
    breadcrumb.push(findMenu.parentName, findMenu.name)
    breadcrumb = breadcrumb.filter(v => v)
    //点击跳转路由
    this.setState({
      selectedKeys: [item.key],
      breadcrumb
    }, () => {
      history.push(item.key)
    })
    console.log(this.props,'路由改变',item);
  }



//对React中的setState的理解？
//setState这个方法在调用的时候是同步的，但是引起React的状态更新是异步的 【React状态更新是异步的】
//setState第一个参数可以是一个对象，或者是一个函数，而第二个参数是一个回调函数


//setState第二个参数的作用？
//因为setState是一个异步的过程，所以说执行完setState之后不能立刻更改state里面的值。如果需要对state数据更改监听，setState提供第二个参数，就是用来监听state里面数据的更改，当数据更改完成，调用回调函数，用于可以实时的获取到更新之后的数据


//为什么setState设计为异步的？
//setState设计为异步，可以显著的提升性能：如果每次调用setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
//如果同步更新了state，但是还没有执行render函数，而且peops依赖于state中的数据，那么state和props不能保持同步；pstate和props不能保持一致性，会在开发中产生很多的问题；

//      当你调用setState的时候，发生了什么事？
//将传递给 setState 的对象合并到组件的当前状态，触发所谓的调和过程（Reconciliation）
//然后生成新的DOM树并和旧的DOM树使用Diff算法对比
//根据对比差异对界面进行最小化重渲染



  render() {
    const { route } = this.props
    const { collapsed, title, selectedKeys, userInfo, defaultOpenKeys, breadcrumb } = this.state
    const userDropdownMenu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="basic-info">基本资料</Menu.Item>
        <Menu.Item key="modify-password">修改密码</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    )
    return (
      <HashRouter>
        <Layout className={style['layout-container']}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={style['logo']}>
                <CodepenCircleOutlined className={style['icon']} />
                <span>{title}</span>
              </div>
              <Menu theme="dark" mode="inline"
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                onClick={this.handleRouter}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  首页
                </Menu.Item>
                <Menu.SubMenu
                  key="user-menu"
                  title={
                    <span>
                      <UserOutlined />
                      <span>用户管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="user">用户列表</Menu.Item>
                  <Menu.Item key="roles">角色管理</Menu.Item>
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
                <Menu.SubMenu
                  key="community"
                  title={
                    <span>
                      <ReadOutlined />
                      <span>社区管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="message">消息中心</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  key="setting-menu"
                  title={
                    <span>
                      <SettingOutlined />
                      <span>设置管理</span>
                    </span>
                  }
                >
                  <Menu.ItemGroup key="system-setting" title="系统设置">
                    <Menu.Item key="website-setting">网站设置</Menu.Item>
                    <Menu.Item key="email-service">邮件服务</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup key="user-setting" title="我的设置">
                    <Menu.Item key="basic-info">基本资料</Menu.Item>
                    <Menu.Item key="modify-password">修改密码</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </Sider>
            <Layout className={style['site-layout']}>
              <Header className={`${style['layout-header']} bg-white`}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: style['trigger'],
                  onClick: this.toggle,
                })}
                <div className={style['header-right']}>
                  <div className="info mr-20">
                    <Avatar src={userInfo.avatar} />
                    <Dropdown overlay={userDropdownMenu}
                      trigger="['click']"
                      getPopupContainer={() => document.getElementsByClassName('info')[0]}>
                      <Button type="link" className={style['btn-user']}>
                        {userInfo.username}<DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </Header>
              <Content className={style['layout-content']}>
                <Breadcrumb className={style['layout-nav']}>
                  {breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div className={`${style['layout-content--info']}`}>
                {renderRoutes(route.routes)}
                </div>
              </Content>
            </Layout>
        </Layout>
      </HashRouter>
    )
  }
}

export default LayoutContainer
