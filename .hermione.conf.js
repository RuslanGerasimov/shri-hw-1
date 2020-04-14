module.exports = {
    sets: {
        desktop: {
            files: 'itest'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome' // this browser should be installed on your OS
            }
        }
    }
};