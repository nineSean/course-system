## 项目地址

[线上地址](http://8.130.24.49/)

[前端源码](https://github.com/nineSean/course-system-client)

[后端源码](https://github.com/nineSean/course-system-server)

## 项目简介

### 用例图

![](https://cdn.nlark.com/yuque/0/2021/png/291560/1619873717364-2d8e09c5-a542-4151-a5c2-1e98f80e4962.png#align=left&display=inline&height=784&margin=%5Bobject%20Object%5D&originHeight=784&originWidth=755&size=0&status=done&style=none&width=755)

### 活动图

#### 注册与登录

![](https://cdn.nlark.com/yuque/0/2021/png/291560/1619873717488-ce835b0f-763f-4a62-9277-5fdda5611870.png#align=left&display=inline&height=861&margin=%5Bobject%20Object%5D&originHeight=861&originWidth=776&size=0&status=done&style=none&width=776)

#### 购买课程

![course purchase.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619873821142-06887197-bd7d-48d3-a07c-885ef998ebb3.png#align=left&display=inline&height=1111&margin=%5Bobject%20Object%5D&name=course%20purchase.png&originHeight=1111&originWidth=279&size=53177&status=done&style=none&width=279)

## 技术栈

React Hooks + React Redux + React Router Dom + TypeScript 

### 难点
稍微麻烦点的功能有：上拉加载、下拉刷新、虚拟列表。

## 工程化

### 规范制度

#### 代码规范

编码遵循总结的[JS 编码原则](https://www.yuque.com/ninesean/blog/po3dul)。
通过 eslint 配置代码检查规则，可以统一格式化的代码风格，无法修复则报错。

#### commit 规范

通过 commitlint 配置 git commit 规则，遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)；不熟悉此规约可以安装 commitizen ，使用 git cz 代替 git commit 来引导规范 commit（本项目已配置，由于太过繁琐我是直接按照规约 git commit）。
通过 husky 管理 commit 生命周期，在 commit 前执行 eslint 与 commitlint 检查代码与 commit 的是否符合要求（其中 eslint 可以使用 lint-staged 进行增量检查提高效率）。

#### 变更日志

通过安装 conventional-changelog-cli ，可使用 `conventional-changelog -p angular -i CHANGELOG.md -s` 命令生成变更日志（前提是遵循 commit 规约）。

### 项目构建

项目使用 webpack5 构建打包。webpack 的核心理念是一切皆模块，各种类型的资源都可以导入，这是通过配置各种资源的 loader 转换成 js 代码实现的。而插件机制则提供了代码构建过程中各个生命周期的钩子，这让 webpack 的能力通过插件得到了无限扩展。
webpack 优化的原则主要是从两个方面入手：时间与空间

- 时间
  - 开发阶段的构建速度提升（由于开发就是编写、修改代码，所以构建是频繁发生的）

  - 完成开发后打包时间（频度比较低）

  - 缩短时间的关键一个是有效利用计算机资源（如利用多核并行构建等），另一个是减小构建的代码量（如利用缓存、不变的三方包不纳入 webpack 构建、不变的代码打包成静态资源等）

- 空间
  - 主要是最后打包时要尽量减少代码体积（如移除注释、多余代码、简化代码，使用 tree-shaking 移除永远不执行的代码，使用 code-splitting 分割代码按需加载，提取公开代码等）

### Mock 数据

由于本项目是全栈项目，所以不存在前后端并行开发对 mock 数据的需求。
但是我们的工作基本是前后端分离开发，mock 数据是不可或缺的，对比过很多方案，推荐 [JSON Server](https://github.com/typicode/json-server)，十分快速、便捷：自带 restful 风格接口，还能通过 express 自行拓展。

### 封装 axios 

考虑兼容性选择 axios，使用 axios 自带的拦截器对请求与响应进行预处理。
在路由切换的时候取消掉未完成请求。

### 状态管理

使用 Redux 进行状态管理，刚开始觉得非常的繁琐，但在使用 Node.js 写接口后，了解到服务端通用的分层结构如下：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619875994445-54dbf744-6840-4a80-832b-e058517685bd.png#align=left&display=inline&height=797&margin=%5Bobject%20Object%5D&name=image.png&originHeight=797&originWidth=1177&size=228820&status=done&style=none&width=1177)

这才恍然大悟：前端的数据流转也得分层，复杂问题不都是通过分层来处理么？不管是使用 Redux、Mobx、 Context，亦或者其它的状态管理方案都得通过分层来设计良好的数据流转结构，终将利大于弊（易维护、易拓展）。
项目中前端数据变更过程：

![state flow in redux (1).png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619881876635-1ddabb3b-2a90-48bf-9542-952ae9a40dff.png#align=left&display=inline&height=672&margin=%5Bobject%20Object%5D&name=state%20flow%20in%20redux%20%281%29.png&originHeight=672&originWidth=703&size=71412&status=done&style=none&width=703)

举个首页获取课程列表的例子：

`props.getCourses() -> getCourses(currentCategory, offset, limit) -> case types.SET_COURSES` 

```javascript
// src/routes/Home/components/CourseList/index.tsx
...
const CourseList: FC<IProps> = (props: IProps) => {
  useEffect(() => {
    props.initCourses()
    props.getCourses()
  }, [])
...

// src/store/actions/home.tsx
...
getCourses(){
    return async function(dispatch: Dispatch, getState: () => RootState){
      try {
        const {currentCategory, course: {hasMore, offset, limit, loading}} = getState().home
        if (hasMore && !loading) {
          dispatch({
            type: types.SET_COURSES_LOADING,
            payload: true
          })
          const response = await getCourses(currentCategory, offset, limit)
          dispatch({
            type: types.SET_COURSES,
            payload: response.data
          })
        }
      } catch (error) {
        message.error(error.message)
      }
    }
  },
...

// src/store/reducers/home.tsx
...
case types.SET_COURSES:
return {
  ...state,
  course: {
    ...state.course,
    loading: false,
    hasMore: action.payload.hasMore,
    list: [...state.course.list, ...action.payload.list],
    offset: state.course.offset + action.payload.list.length
  }
}
...
```

### CSS 方案

常用的 CSS 模块化方案有 BEM、scoped、CSS Modules、CSS in JS，React 一般从 CSS Modules 与 CSS in JS 中二选一，前者配置好几乎零基础上手，后者稍微要上手适应下。
本项目使用 CSS Modules + Less 。使用后感受：相比较于 CSS in JS 集成 HTML 与 CSS 于一体，CSS Modules 必须要单独建立 CSS 文件，一定程度上造成了目录层级的冗余（比如 components 文件夹中一个组件要建立一个文件夹放置 `tsx` 文件与样式文件，若是采用 CSS in JS 只需要一个 `tsx` 文件则不需要文件夹从而更扁平）。
另外 CSS in JS 则可以在 CSS 中使用 JS 语言特性，不再需要搭配 CSS 预处理器。之后项目推荐使用。

### 移动端适配

使用淘宝的 flexibale 移动端自适应方案，不过大漠已经推荐使用 vw 方案，之后待改进。

### UI 组件库

React 搭配 Ant Design，犹如 Vue 搭配 ElementUI。

## 发布上线

使用阿里云的 ECS ，计划的部署方案如下：

![image.png](https://cdn.nlark.com/yuque/0/2021/png/291560/1619883463312-c67e1545-fff1-4fb9-92ed-1c1891a1d402.png#align=left&display=inline&height=443&margin=%5Bobject%20Object%5D&name=image.png&originHeight=443&originWidth=752&size=26597&status=done&style=none&width=752)

在使用自动部署脚本的过程中，在本地执行云服务器的 `yarn build` 会卡死服务器，可能是配置太低？试了几次无果，只能选择登录云服务器上执行相关脚本了（无法完全自动部署）。

## 待改进

- [ ] 使用 CSS in JS 方案
- [ ] 使用 vw 方案适配移动端
- [ ] 完成第三方支付
- [ ] 使用第三方登录
- [ ] 使用单元测试
- [ ] 沉淀出一套模板代码
- [ ] 沉淀出一套自己的 UI 库
- [ ] 前端埋点
- [ ] 实践性能优化