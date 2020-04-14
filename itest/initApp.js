const assert = require('chai').assert;

describe('check if app is avaliable', function() {
    it('should open app and find app name', function() {
        return this.browser
            .url('http://localhost:3001/')
            .getText('.Header-Title')
            .then(function(title) {
                assert.equal(!!title, true);
            });
    });

    it('should open settings from start page', async function() {
       const settingsButtonSelector = await this.browser
           .url('http://localhost:3001/')
           .getText('.Header-Title')
           .then(function (title) {
                if(title !== 'School CI Sercer') {
                    return '.Button-Icon_type_settings'
                } else {
                    return 'a[href="settings"]';
                }
           });

       const settingsButton = this.browser.$(settingsButtonSelector);

       if(!settingsButton.isExisting()) {
           throw new Error('No button to get settings');
       }
       this.browser
           .click(settingsButtonSelector)
           .waitForExist('.Form-HeaderItem_title')
           .getText('.Form-HeaderItem_title')
           .then((text) => {
               assert.equal(text, 'Settings');
           })
    });
});