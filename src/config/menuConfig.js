const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/Admin/home', // 对应的path
    icon: 'home', // 图标名称
    public: true, // 公开的
  },
  {
    title: '商品',
    key: '/Admin/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/Admin/category',
        icon: 'bars'
      },
      {
        title: '商品管理',
        key: '/Admin/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/Admin/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/Admin/role',
    icon: 'safety',
  },

  {
    title: '图形图表',
    key: '/Admin/chart',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/Admin/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/Admin/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/Admin/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },
]

export default menuList