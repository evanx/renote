module.exports = pkg => ({
    description: pkg.description,
    env: {
        httpPort: {
            description: 'the HTTP port',
            default: 8031
        },
        httpLocation: {
            description: 'the HTTP location',
            default: ''
        },
        redisHost: {
            description: 'the Redis host',
            default: 'localhost'
        },
        redisPort: {
            description: 'the Redis port',
            default: 6379
        },
        redisNamespace: {
            description: 'the Redis namespace',
            default: 'analytics-proxy'
        },
        errorExpire: {
            description: 'the TTL expiry for error details',
            unit: 's',
            default: 366611
        },
        slackChannel: {
            description: 'Slack channel',
            default: '#ops'
        },
        slackUsername: {
            description: 'Slack username',
            default: 'RenoteBot'
        },
        slackIcon: {
            description: 'Slack icon emoji',
            default: 'monkey'
        },
        loggerLevel: {
            description: 'the logging level',
            options: ['debug', 'info', 'warn', 'error'],
            default: 'info',
            defaults: {
                test: 'debug',
                development: 'debug'
            }
        }
    },
    redisK: config => ({
        reqC: {
            key: `:req:count:h`
        },
        errorC: {
            key: `:error:count:h`
        },
        errorH: {
            key: `:error:h`
        }
    })
});
