module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: [
        '@flyacts/eslint-config',
    ],
    ignorePatterns: [
        '.eslintrc.js',
        '*.html',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    rules: {
        'no-extra-parens': ['off'],
        'import/no-internal-modules': [
            'error',
            {
                allow: [
                    '@angular/**',
                    '@nestjs-modules/mailer/dist/adapters/pug.adapter',
                    'rxjs/operators',
                    'typeorm/driver/postgres/PostgresConnectionOptions',
                    'typeorm/schema-builder/view/View'
                ]
            }
        ],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    memberTypes: [
                        // Static fields
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',

                        // Instance fields
                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',

                         // Constructors
                        'public-constructor',
                        'protected-constructor',
                        'private-constructor',

                        // Static methods
                        'public-static-method',
                        'protected-static-method',
                        'private-static-method',

                        // Static getters
                        'public-static-get',
                        'protected-static-get',
                        'private-static-get',

                        // Instance methods
                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method',

                        // Instance getters
                        'public-instance-get',
                        'protected-instance-get',
                        'private-instance-get',
                    ],
                },
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
    root: true,
};
