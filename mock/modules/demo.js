import Mock from 'mockjs'
import { pagination, resultError, resultSuccess } from '../util'

// 角色列表
// const roleListData = Mock.mock({
//   'list|10': [
//     {
//       'id|+1': 1,
//       // 列出5个权限级别
//       'name|1': ['超级管理员', '管理员', '普通用户', '测试人员', '开发人员'],
//       'description|1': ['拥有所有权限', '拥有部分权限'],
//       'status|1': [0, 1],
//       'createTime|1': new Array(10).fill('').map(() => {
//         return Mock.Random.datetime()
//       }),
//       'updateTime|1': new Array(10).fill('').map(() => {
//         return Mock.Random.datetime()
//       }),
//     },
//   ],
// })

// 成员列表
const memberListData = Mock.mock({
  'list|120': [
    {
      'id|+1': 1,
      'name|1': new Array(120).fill('').map(() => {
        return Mock.Random.cname()
      }),
      'userId|+1': 1,
      'departmentId|1': [1, 2, 3, 4, 5],
      'roleId|1': [1, 2, 3, 4, 5],
      'age|1': new Array(10).fill('').map(() => {
        return Mock.Random.integer(18, 60)
      }),
      'sex|1': [1, 2],
      'address|1': new Array(10)
        .fill('')
        .map(() => {
          return Mock.Random.county(true)
        })
        .concat(new Array(5).fill('')),
      'phone|1': new Array(10).fill('').map(() => {
        return Mock.Random.integer(13000000000, 19999999999)
      }),
      'email|1': new Array(10).fill('').map(() => {
        return Mock.Random.email()
      }),
      'dateTime|1': new Array(10).fill('').map(() => {
        return Mock.Random.datetime()
      })
    }
  ]
})

// 部门列表
const departmentListData = Mock.mock({
  'list|5': [
    {
      'id|+1': 1,
      name() {
        return ['技术部', '产品部', '运营部', '市场部', '财务部'][this.id - 1]
      },
      members() {
        return memberListData.list.filter((item) => {
          return item.departmentId === this.id
        })
      }
    }
  ]
})

// 任务阶段
// const taskStatusData = Mock.mock({
//   'list|4': [
//     {
//       'id|+1': 1,
//       // 定义任务阶段
//       'name|1': ['待处理', '进行中', '已完成', '已取消'],
//     },
//   ],
// })

// 任务类型
// const taskTypeListData = Mock.mock({
//   'list|7': [
//     {
//       'id|+1': 1,
//       // 定义任务类型
//       'name|1': [
//         '需求',
//         '测试',
//         '开发',
//         '维护',
//         '运营',
//         '市场',
//         '财务',
//         '其他',
//       ],
//     },
//   ],
// })

// 任务列表
const taskListData = Mock.mock({
  'list|120': [
    {
      'id|+1': 1,
      'name|1': new Array(100).fill('').map(() => {
        return Mock.Random.ctitle()
      }),
      'type|1': [1, 2, 3, 4, 5, 6, 7],
      'status|1': [1, 2, 3, 4],
      'progress|1': new Array(10).fill('').map(() => {
        return Mock.Random.integer(0, 100)
      }),
      'priority|1': [1, 2, 3],
      'leaderId|1': [1, 2, 3, 4],
      leaderName() {
        return memberListData.list.find((item) => {
          return item.id === this.leaderId
        }).name
      },
      memberIds() {
        return Mock.Random.shuffle(memberListData.list)
          .slice(0, 3)
          .map((item) => {
            return item.id
          })
      },
      'description|1': new Array(10).fill('').map(() => {
        return Mock.Random.cparagraph()
      }),
      'startTime|1': new Array(10).fill('').map(() => {
        const year = Mock.Random.integer(2019, 2020)
        const month = Mock.Random.integer(1, 12)
        const day = Mock.Random.integer(1, 28)
        return new Date(year, month, day).getTime()
      }),
      'endTime|1': new Array(10).fill('').map(() => {
        const year = Mock.Random.integer(2021, 2022)
        const month = Mock.Random.integer(1, 12)
        const day = Mock.Random.integer(1, 28)
        return new Date(year, month, day).getTime()
      }),
      'createTime|1': new Array(10).fill('').map(() => {
        const year = Mock.Random.integer(2019, 2022)
        const month = Mock.Random.integer(1, 12)
        const day = Mock.Random.integer(1, 28)
        return new Date(year, month, day).getTime()
      })
    }
  ]
})

export default [
  /* ========================= 内部成员数据 =================== */
  // 获取部门列表
  {
    url: '/mock-api/demo/department/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(departmentListData.list)
    }
  },
  // 获取成员列表
  {
    url: '/mock-api/demo/member/list',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      const pageNum = body?.pageNum
      const pageSize = body?.pageSize
      return resultSuccess({
        list: pagination(pageNum, pageSize, memberListData.list),
        total: memberListData.list.length
      })
    }
  },

  // 获取一条成员数据
  {
    url: '/mock-api/demo/member/detail',
    timeout: 1000,
    method: 'get',
    response: (data) => {
      const id = data.query.id
      const user = memberListData.list.find((item) => {
        return item.id === Number(id)
      })
      return resultSuccess(user)
    }
  },
  // 新增一条用户数据
  {
    url: '/mock-api/demo/member/add',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      // 定义必填字段数组
      const requiredFields = ['name']

      // 遍历必填字段数组，如果有一个字段为空，则返回错误信息
      for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!body[field]) {
          return resultError(`缺少必填字段：${field}`)
        }
      }

      // 返回成功信息
      return resultSuccess()
    }
  },
  // 编辑一条用户数据
  {
    url: '/mock-api/demo/member/edit',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      // 定义必填字段数组
      const requiredFields = ['id']

      // 遍历必填字段数组，如果有一个字段为空，则返回错误信息
      for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!body[field]) {
          return resultError(`缺少必填字段：${field}`)
        }
      }

      // 返回成功信息
      return resultSuccess()
    }
  },

  /* ========================= 任务数据 =================== */
  // 查找一条任务数据
  {
    url: '/mock-api/demo/task/detail',
    timeout: 1000,
    method: 'get',
    response: (data) => {
      const id = data.query.id
      const task = taskListData.list.find((item) => {
        return item.id === Number(id)
      })
      return resultSuccess(task)
    }
  },
  // 获取任务列表数据
  {
    url: '/mock-api/demo/task/list',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      const pageNum = body?.pageNum || 1
      const pageSize = body?.pageSize || 10
      return resultSuccess({
        list: pagination(pageNum, pageSize, taskListData.list),
        total: taskListData.list.length
      })
    }
  },
  // 新增一条任务数据
  {
    url: '/mock-api/demo/task/add',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      // 定义必填字段数组
      const requiredFields = ['name', 'type', 'status', 'progress', 'priority']
      // 遍历必填字段数组，如果有一个字段为空，则返回错误信息
      for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!body[field]) {
          return resultError(`缺少必填字段：${field}`)
        }
      }
      // 返回成功信息
      return resultSuccess()
    }
  },
  // 编辑一条任务数据
  {
    url: '/mock-api/demo/task/edit',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      const body = data.body
      // 定义必填字段数组
      const requiredFields = [
        'id',
        'name',
        'type',
        'status',
        'progress',
        'priority'
      ]
      // 遍历必填字段数组，如果有一个字段为空，则返回错误信息
      for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!body[field]) {
          return resultError(`缺少必填字段：${field}`)
        }
      }
      // 返回成功信息
      return resultSuccess()
    }
  },

  /* ========================= 用户数据 =================== */

  // 上传文件接口定义
  {
    url: '/mock-api/demo/upload',
    timeout: 1000,
    method: 'post',
    response: (data) => {
      // 检查是否是文件上传
      if (!data.files) {
        return resultError('上传文件失败!')
      }
      return resultSuccess()
    }
  }
]
