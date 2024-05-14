export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(?<type>.*\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  },
  rules: {
    'type-enum': [
      2, // 表示必须输入的
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 依赖相关的修改
        'ci', // CI 相关的修改
        'wip', // 工作中 还没完成
        'release', // 发版
        'deps', // 依赖相关的修改
        'workflow', // 工作流
        // 支持VSCode [git-commit-plugin](https://marketplace.visualstudio.com/items?itemName=redjue.git-commit-plugin)插件
        '🎉 init',
        '✨ feat',
        '🐞 fix',
        '📃 docs',
        '🌈 style',
        '🦄 refactor',
        '🎈 perf',
        '🧪 test',
        '🔧 build',
        '🐎 ci',
        '🐳 chore',
        '↩ revert'
      ]
    ],
    'type-case': [0], // 不区分大小写
    'type-empty': [0], // 不检查type是否为空
    'scope-empty': [0], // 不检查scope是否为空
    'scope-case': [0], // 不区分大小写
    'subject-full-stop': [0, 'never'], // 不检查subject是否以.结尾
    'subject-case': [0, 'never'], // 不区分大小写
    'subject-exclamation-mark': [0], // 不检查subject是否以!结尾
    'header-max-length': [2, 'always', 72] // header最大长度
  }
}
