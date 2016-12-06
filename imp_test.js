/**
 * Created by xin on 2016/12/6.
 *
 * // You can write tests either using traditional promises.
 * it('works with promises', function() {
 *     return driver.get('http://cn.bing.com/')
 *         .then(_ => driver.findElement(By.name('q')).sendKeys('webdriver'))
 *         .then(_ => driver.findElement(By.name('go')).click())
 *         .then(_ => driver.wait(until.titleIs('webdriver - 必应'), 3000));
 * });
 *
 * // Or you can define the test as a generator function. The test will wait for
 * // any yielded promises to resolve before invoking the next step in the
 * // generator.
 * test.it('works with generators', function*() {
 *     yield driver.get('http://cn.bing.com/');
 *     yield driver.findElement(By.name('q')).sendKeys('webdriver');
 *     yield driver.findElement(By.name('go')).click();
 *     yield driver.wait(until.titleIs('webdriver - 必应'), 3000);
 * });
 *
 */

const {Builder, By, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('IMP端到端测试', function() {
    let driver;

    test.before(function *() {
        driver = yield new Builder().forBrowser('chrome').build();
    });

    it('登录', function() {
        return driver.get('http://192.168.212.38/loginManage/login.shtml')
            .then(_ => driver.findElement(By.name('userName')).sendKeys('admin'))
            .then(_ => driver.findElement(By.name('password')).click())
            .then(_ => driver.findElement(By.name('password')).sendKeys('admin'))
            .then(_ => driver.findElement(By.className('btn')).click())
            .then(_ => driver.wait(until.urlIs('http://192.168.212.38/index/index.shtml'), 5000));
    });

    it('用户管理-新增用户', function() {
        return driver.get('http://192.168.212.38/systemManage/architecture.shtml')
            .then(_ => driver.wait(until.elementLocated(By.id('userAdd')), 3000))
            .then(_ => driver.findElement(By.id('userAdd')).click())
            .then(_ => driver.wait(until.elementLocated(By.name('realName')), 3000))
            .then(_ => driver.findElement(By.name('realName')).sendKeys('test_imp'))
            .then(_ => driver.findElement(By.name('userName')).sendKeys('test_imp'))
            .then(_ => driver.findElement(By.name('userPwd')).sendKeys('imp123'))
            .then(_ => driver.findElement(By.id('confirm')).sendKeys('imp123'))
            .then(_ => driver.findElement(By.name('companyName')).sendKeys('suninfo'))
            .then(_ => driver.findElement(By.id('usergroupinput')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('usergroupinputTree_1_check')), 3000))
            .then(_ => driver.findElement(By.id('usergroupinputTree_1_check')).click())
            .then(_ => driver.findElement(By.name('realName')).click())
            .then(_ => driver.findElement(By.name('email')).sendKeys('mail@mail.com'))
            .then(_ => driver.findElement(By.name('cellphone')).sendKeys('15966668888'))
            .then(_ => driver.findElement(By.id('userRoleButton')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('architectureRightuserRole')), 3000))
            .then(_ => driver.findElement(By.name('userRoleRelList[0].roleUuid')).click())
            .then(_ => driver.findElement(By.className('aui_state_highlight')).click())
            .then(_ => driver.sleep(1000))
            .then(_ => driver.findElement(By.id('userSave')).click())
            .then(_ => driver.wait(until.elementLocated(By.id('userAdd')), 5000));
    });
    test.after(() => driver.quit());
});
