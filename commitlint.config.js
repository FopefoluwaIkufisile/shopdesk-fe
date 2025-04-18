module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': () => [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'docs',
        'style',
        'ci',
        'revert',
        'update',
        'add',
      ],
    ],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'never'],
    'subject-case': [2, 'never'],
  },
};
