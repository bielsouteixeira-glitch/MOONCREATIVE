import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
const chrome=['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser'].find(existsSync);
if(!chrome) throw Error('Chrome não está disponível no runner');
const browser=await chromium.launch({executablePath:chrome,args:['--no-sandbox'],headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
let errors=[],responses=[];
page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>{if(r.url().includes('githubusercontent.com') && r.failure()?.errorText!=='net::ERR_ABORTED')errors.push('requestfailed '+r.url()+' '+r.failure()?.errorText)});
page.on('response',r=>{if(r.url().includes('githubusercontent.com'))responses.push({status:r.status(),type:r.headers()['content-type'],url:r.url()});});
const url='https://htmlpreview.github.io/?https://github.com/bielsouteixeira-glitch/MOONCREATIVE/blob/34a7212fd26a2094d3ac957179f605f3ae32fc63/preview-mobile.html';
try{
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:90000});await page.locator('#inicio').waitFor({state:'attached',timeout:90000});
 const skip=page.getByRole('button',{name:'Pular introdução'});if(await skip.isVisible().catch(()=>false))await skip.click();
 await page.locator('#ia .mc-noiz-photo').scrollIntoViewIfNeeded();await page.locator('#ia .mc-noiz-photo img').evaluate(i=>i.decode());
 const clients={};for(const name of ['Jah Burguer','La Barberia','Krodec','Suprimed']){await page.locator('#marcas').getByRole('button',{name,exact:true}).click();const v=page.locator('#marcas video');await v.scrollIntoViewIfNeeded();clients[name]=await v.evaluate(async x=>{try{await x.play();await new Promise(r=>setTimeout(r,1000));return {ok:x.currentTime>0,time:x.currentTime,src:x.currentSrc,error:x.error?.message}}catch(e){return {ok:false,error:String(e),src:x.currentSrc,mediaError:x.error?.message}}});}
 console.log(JSON.stringify({url,heading:await page.locator('#inicio h1').innerText(),widths:await page.evaluate(()=>[innerWidth,document.documentElement.scrollWidth]),clients,errors,responses},null,2));
 if(errors.length||Object.values(clients).some(x=>!x.ok)){console.log('::error::'+JSON.stringify({clients,errors,responses}).slice(0,6000));process.exitCode=1;}
}catch(e){console.error('TEST ERROR',e);console.log('::error::'+JSON.stringify({error:String(e),errors,responses}).slice(0,6000));process.exitCode=1}finally{await browser.close()}
