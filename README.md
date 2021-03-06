# egg_manager_vue

> A management system project by Vue.js 



## 预览地址

http://47.99.160.215 

测试账号: SuperRoot

密码: 123456

## 简介(Intro)

##### 该项目为前后端分离。
​	>前端项目即当前项目:  
​    		git地址： https://github.com/lanlandetiankong/egg_manager_vue  
​    		主要框架： vue + antdesign vue + axios + quill  等    

​	>对应的后端项目:  
​    		git地址： https://github.com/lanlandetiankong/egg_manager  
​    		主要框架： springboot + mybatis + mybatis-plus+druid+swagger2+shiro 等  
## Build Setup

#### 一、导入 egg_manager_vue 到本地

	>​	导入项目到本地
	​		git clone https://github.com/lanlandetiankong/egg_manager_vue 
	​		cd 本地项目路径
	>​	安装依赖
	​		npm install 或 cnpm install

## 二、启动项目

### 1 、本地运行

​	npm run dev  

### 2、打包到服务器运行

​	1、使用Npm对项目进行打包编译(生成的内容在 项目路径/dist 文件夹下)

​		npm run build

​	2、由于vue-router 采用的模式是 history 模式，所以需要做一些修改。具体参考( https://router.vuejs.org/zh/guide/essentials/history-mode.html#html5-history-%E6%A8%A1%E5%BC%8F )

​			方式1=>  
​    			(1)、要求  
​    				node.js环境  
​    			(2)、将build生成的 dist文件夹放到服务器  
​    			(3)、将该项目的 /doc/buildAssets/app.js 复制到 dist/ 下(与index.html同一层)  
​    			(4)、可以通过修改复制后的app.js进行vue项目发布端口的修改  
​    			(5)、最后在dist目录下打开cmd，执行    node app.js

​			方式2=>  
​    			(1)、要求  
​    				http-server环境  
​    				  ->安装http-server:  
​        				npm install http-server -g  或  
​        				yarn -g http-server  
​    			(2)、启动http-server(在build生成的dist文件夹下启动cmd)  
​              		http-server -p 端口号

### 3、静态资源服务器
​			要求 =>  
​    				anywhere  
​    		安装anywhere =>  
​            		npm install anywhere -g  或  
​            		yarn -g anywhere  
​    		在静态资源目录下打开cmd,执行 =>  
​        			anywhere -p 端口号  
​        			(1)静态资源与该vue项目以及后端项目是分开的，可以放在任意位置，但是端口号需要与后端和前端进行配合修改)  
​        			(2)vue前端项目配置端口路径： src/config/constantParams.js 的  constantParams.props.upload.url.prefix  
​        			(3)后端项目端口配置路径在 egg-web/resource/props-upload.properties 文件的 props.upload.urlPrefix  

### 4、项目截图

​	1、登录界面  

![images](https://github.com/lanlandetiankong/egg_manager_vue/blob/master/md_images/image-20200307215347922.png)

2、主页面  

![image](https://github.com/lanlandetiankong/egg_manager_vue/blob/master/md_images/image-20200307215508375.png)

3、员工信息 Tag页面  

![image](https://github.com/lanlandetiankong/egg_manager_vue/blob/master/md_images/image-20200307215552430.png)

### 5、更多配置以及备注 在项目的 doc\ 目录下。



### 6、TODO

- 选择用户 组件
- ~~采用nginx部署~~
- ~~vue-router history 打包运行时，刷新页面会404~~
- 遇到异常返回logid，在前端添加一个  按钮[发送异常信息]到我的邮箱 或 我的消息。
- 笔记类 的功能；多文件夹方式。支持 多文件/文件夹 方式上传。
- ~~职务、部门、员工 的导出(已实现 员工信息导入与导出)~~
- ~~权限定义 创建后，可设置发布，发布后的按钮不可再修改。~~

- 修改密码 时需要去 移除 该用户 的redis缓存
- 首页、当前登录用户数量
