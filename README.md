## 简介
**本项目是赛尔计划攻略项目网页端的开源储存库，需配套的服务端程序结合使用**

若有疑问则提出issue等待他人作答或前往[作者B站](https://space.bilibili.com/589465087)进行付费答疑，作者原则上不解决任何问题。
## 启动项目
> 提前准备nodejs环境。

在vite.config.js文件中server.proxy.'/api'.target中填入后端API的url，示例：http://localhost:8080

使用npm加载依赖包

> npm install

开发环境调试

> npm run dev

项目打包

> npm run build

打包后预览

> npm run preview
