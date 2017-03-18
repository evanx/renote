const crypto = require('crypto');
const h = require('render-html-rpf');
const fetch = require('node-fetch');
const mapProperties = require('map-properties');

module.exports = async (api) => {
    api.get('/analytics', async ctx => {
        const [reqCountRes] = await multiExecAsync(client, multi => {
            multi.hgetall([config.redisNamespace, 'req:count:h'].join(':'));
        });
        const reqCount = mapProperties(reqCountRes || {}, value => parseInt(value));
        const analytics = {reqCount};
        if (/(Mobile)/.test(ctx.get('user-agent'))) {
            ctx.body = h.page({
                title: 'renote',
                heading: 'Analytics',
                content: [{
                    name: 'pre',
                    content: JSON.stringify(analytics, null, 2)}
                ],
                footerLink: 'https://github.com/evanx/renote'
            });
        } else {
            ctx.body = analytics;
        }
    });
}
