const assert = require('chai').assert;

describe('Check if clone repo and get it commits', function () {
    it('fulfill settings form', async function () {
        await this.browser.url('http://localhost:3001/settings')
            .waitForExist('#repo', 5000)
            .pause(1000)
            .setValue('#repo', 'RuslanGerasimov/async')
            .pause(1000)
            .setValue('#command', 'npm start')
            .pause(1000)
            .setValue('#mainBranch','master')
            .pause(1000)
            .setValue('#interval', '10')
            .pause(1000)
            .click('.Form button[type="submit"]')
            .waitForExist('.Form-Result', 12000)
            .getText('.Form-Result')
            .then((status) => {
                assert.equal(status, 'Репозитроий клонирован успешно');
            })
            .catch((err) => {
                throw new Error('some strange error');
            });
    });
});