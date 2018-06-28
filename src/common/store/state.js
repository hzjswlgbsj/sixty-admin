export default {
  vueIns: null,
  shrinkStretchTopBar: false,
  recentServiceKeyList: [],
  functions: null, //接口中缓存 function.all 的数据
  curfunctionsPage: 1, //模块列表的当前页
  recentFunctionIDList: [],
  lastFuncAppIDlist: [],
  lastFunctionID: '',
  IsChange_LastFunctionID_UserID: '',
  curTaskKey: '',
  curNormTaskKey: 'task_demand_intro',
  curMyTaskKey: '',
  activename: 0,
  oldNormTaskKey: '',
  oldMyTaskKey: '',
  oldTask: '',
  sideBarWantShow: false, // sidebar查看更多模块
  curPageName: '',
  admin: null,
  is_channel_admin: undefined, //机构管理员
  usecase: null,
  usecase_strs: null,
  // access
  function_access: 0, // 0 普通 1 负责人 2 创建者
  user_acl: null, // 用户权限 1. 管理员可以创建应用和进入应用开发空间 2. 应用开发者可以进入有权限应用的开发空间  3. 普通管理员只能查看应用列表
  acl: {},
  roles_app: null,
  roles_function: null,
  // ----------------------- 全局url参数 -----------------------
  channel: 0,
  service_key: '',
  users: null,
  task_cur_type: 'demand_intro',
  apis: null,
  // ------------------------ app ----------------------------
  platform_key: '',
  appkey: '',
  app: {},
  app_service: null,
  service_publish_form: {
    introduction: {
      images: [],
      description: '',
      backend_url: '',
      android_url: '',
      ios_url: '',
      h5_url: '',
      weex_url: '',
      frontend_url: ''
    },
    structure: {
      title: '',
      content: [
        {
          title: '',
          show: true,
          content: [{ title: '', content: [] }]
        },
        {
          title: '',
          show: true,
          content: [{ title: '', content: [] }, { title: '', content: [] }]
        }
      ]
    },
    access: {
      documentDesc: '',
      explain: {
        items: []
      },
      scenariosIntro: {
        scenariosSteps: [{ value: '' }],
        scenariosImgList: []
      },
      accessPrepare: [{ value: '' }],
      accessRule: {
        apiUseRule: '',
        signMatchRule: '',
        paramUseRule: ''
      },
      accessFlow: {
        accessFlowImgList: [],
        accessSteps: [{ value: '' }]
      }
    },
    sdk: {
      sdkList: [
        {
          name: '',
          version: '',
          platform: '',
          desc: '',
          url: ''
        }
      ],
      sdkDescription: ''
    },
    api: {}
  },
  app_show_edit: false,
  current_app_type: 'app',
  // ------------------------ ui -----------------------------
  ui_components: [],
  ui_datas: [],
  ui_back_datas: [],
  ui_cur_root: -1,
  ui_cur_id: -1,
  ui_cur_hover: -1,
  ui_cur_logic: null,
  ui_cur_code: '',
  ui_cur_data_idx: -1,
  ui_filter_comps: [], //tabpane 当前展示的组件
  ui_database_all_templates: [], //数据库中 表templates的所有记录缓存
  ui_display_pages: null, //ui/display页面对page做的缓存
  ui_display_save_type: '', //保存类型
  ui_cur_comp_type: '', // CompType.vue 抛出的选中的组件类型
  ui_cur_display_comp_type: '', //display的tabpane
  ui_back_cur_data_idx: -1,
  ui_step: '',
  ui_mode: 'template',
  ui_tree_drag_from: -1,
  ui_tree_drag_to: -1,
  drag_number: -1,
  ui_component_drag_from: -1,
  ui_component_drag_to: -1,
  ui_component_drag_tag: '',
  // 当前选中page 的id
  currentUICompPageID: null,
  // 实现路由效果时暂存的page_id
  backUpUICompPageID: null,
  lang: '',
  showUi_templateMenu: false,
  // 保存控件设计的  附加方法的数据
  ui_controlDesign_functions_clickEvent: [],
  ui_cur_editComp: {}, // tree 点击时获取node
  treeComponentsToCode: {}, // 深拷贝treecomponent服务code.vue
  ui_controlDesign_functions_tableFetch: [], // 保存所有 tableFetch 的数据
  ui_controlDesign_functions_tableRenderStateTag: [], // 保存所有  渲染状态列 的数据
  TableRenderButtons: [],
  phpui_code: [], // 用来暂存 php blockly中保存的代码
  ui_treeExpandIDs: [], //用来暂存logiccomponents中的tree的id集合
  php_ui_type: 'api', // API设计中点击选中的类型，不同的类型对应不同的编辑框
  currentApi: {},
  currentApiObject: {
    //当前API设计填写的所有内容
    varList: [], //变量列表
    blockData: [], //本API设计的数据
    phpCode: '' //本API拼接的php代码
  },
  pageOpenedList: [
    {
      // 已打开标签集合dislike
      title: '我的任务',
      path: '/mytask',
      name: 'mytask'
    }
  ],
  currentPageName: '', // 当前打开页名字，例如“我的任务”
  currentPath: [
    // 当前打开页path
    {
      title: '我的任务',
      path: '/mytask',
      name: 'mytask'
    }
  ],
  ui_bind_methods: [], //vue文件中 methods对应的部分
  // ------------------------ git -----------------------------
  gitRepositoryType: {},
  gitRepositoryList: [],
  gitProject: {},
  gitRepository: {},
  gitProjectID: '',
  branchWantToMerge: 0,
  branchWantToCheckCode: 0,
  wantToCheckBranch: '',
  fileDirectory: [],
  // ------------------------ ui -----------------------------
  ui_bind_createdMethod_ids: [], //vue文件中 created() 对应的部分
  ui_cur_bind_method_id: 0,
  ui_apis: null,
  ui_syntax: null,
  ui_cur_syntax_node: null,
  ui_code: '', //保存生成的vue代码   用于下载
  ui_roots: [],
  ui_design_publish: [], // 用于临时存储publish的内容
  ui_design_children: [], //临时存储某个组件下面的所有后代id,
  php_api_logic: [],
  ui_method_impl_idx: 0,
  ui_method_impl_character_idx: -1,
  ui_back_method_impl_idx: 0,
  ui_back_method_impl_character_idx: -1,
  ui_back_methods: [],
  ui_back_cur_method_id: 0,
  ui_back_createdMethod_ids: [],
  isShowChat: false, //存储聊天界面的状态
  easemobToken: '', //im需要的token
  sessionList: [],
  chat_id: '', //环信账户用户名
  easemob_pwd: '', //环信账户密码
  chat_connent: false,
  newMessage: null,
  ui_back_character_drag_to_idx: -1,
  ui_back_character_drag_from_idx: -1,
  ui_back_impl_drag_to_idx: -1,
  ui_back_impl_drag_from_idx: -1,
  ui_pages: [], //当前所有的page
  ui_cur_page: [], //当前选中的page
  // ------------------------ projectmodel -----------------------------
  //-------------------------newDocData-------------------------------
  cur_newdoc_key: '',
  cur_newdoc_data: {},
  cur_login_user: {}, // 当前登录账户的用户信息
  cur_appinfo: {}
}
