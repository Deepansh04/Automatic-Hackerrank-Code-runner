const puppeteer = require('puppeteer');
const loginLink ='https://www.hackerrank.com/auth/login';
const email= 'webprojectig@gmail.com';
const password= 'webprojectig';
const codeobj = require('./codes');
(async function(){
    try{
    let browseropen = await puppeteer.launch({
    headless:false,
    args:['--start-maximized'],
    defaultViewport:null

    });
    let page= await browseropen.newPage();
    await page.goto(loginLink);
    await page.type("input[id='input-1']",email,{delay:50});
    await page.type("input[id='input-2']",password,{delay:50});
    await page.click("button[data-analytics='LoginPassword']",{delay:50});
    await waitAndClick('.topic-card a[data-attr1="algorithms"]',page);
    await  waitAndClick('input[value="warmup"]',page);
    await page.waitForTimeout(3000);
    let questionsArr= await  page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-styled');
    await questionSolver(page,questionsArr[0],codeobj.answer[0]);
}
catch(err){
    console.log(err);
}


})();
 async function waitAndClick(selector, cPage){
     await  cPage.waitForSelector(selector);
     let clickModal = await cPage.click(selector);
     return clickModal;
}


async function questionSolver(page, question, answer){
    try{
        await question.click();
        await  waitAndClick('.view-lines',page);
        await waitAndClick('.checkbox-input',page);
        await page.waitForSelector('textarea.custominput');
        await page.type('textarea.custominput',answer,{delay:10});
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:100});
        await page.keyboard.press('X',{delay:100});
        await page.keyboard.up('Control');
        await waitAndClick('.view-lines',page);
        await page.keyboard.down('Control');
        await page.keyboard.press('A',{delay:100});
        await page.keyboard.press('V',{delay:100});
        await page.keyboard.up('Control');
        await page.click('.hr-monaco__run-code',{delay:10});

    }
    catch(error){
        console.log(error);
    }
    
    
}
