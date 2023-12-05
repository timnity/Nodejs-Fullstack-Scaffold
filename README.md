# Nodejs-Fullstack-Scaffold

#### 1. 项目结构
项目结构采用 monorepo 方式, 不同的子项目放在不同的目录下

如 api 一般用于提供接口服务, web 一般用于提供前端页面服务


#### 2. 配置文件
```
在各子项目下新建两个配置文件:
    1. .env.devlopment
    2. .env.production

项目中一般有空白的 .env.example 文件作为配置文件模板

tip: 以.号开头的文件在linux系统中是隐藏文件, 请使用ls -al命令查看

.env.* 文件不允许通过Git提交到代码仓库中(已在.gitignore中配置)
```

#### 3. 工具文件
```
前后端项目中都会有一些自定义的工具文件,如提供日志功能的commonTools, 提供短信功能的smsTools等

工具文件一般放在 src/utils 目录下

打包时,会排除掉这些工具文件,打包后记得把工具文件放到 dist/ 目录下, 跟打包完毕的bundle文件放到同级目录下
```
