class Helper {
    static isDev() {
        return process.cwd().indexOf('app.asar') === -1;
    }
}

module.exports = Helper;
