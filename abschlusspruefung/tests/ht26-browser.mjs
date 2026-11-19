import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';

const base = process.env.TEST_URL || 'http://127.0.0.1:8765/';
const paths = [
  ['abschlusspruefung/2026/haupttermin/', ['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'index']],
  ['mathematik-10/abschlusspruefungsaufgaben/2026/', ['a1', 'a4', 'b1', 'b2', 'b3', 'b4']],
];
const browser = await chromium.launch({args:['--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try {
  for (const device of [{ name:'Desktop', viewport:{width:1350,height:880} }, { ...devices['iPhone 13'], name:'Mobil' }]) {
    const {name, ...profile} = device;
    const context = await browser.newContext({...profile, ignoreHTTPSErrors:true});
    const page = await context.newPage();
    const problems = [];
    page.on('pageerror', error => problems.push(error.message));
    const button = (within, text) => page.locator(within).getByRole('button', {name:text, exact:true});
    const step = async times => { for (let i=0;i<times;i++) await page.locator('#next').click(); };
    for (const [directory, files] of paths) {
      for (const file of files) {
        await page.goto(new URL(directory+file+'.html', base).href, {waitUntil:'domcontentloaded'});
        const click = id => page.locator('#'+id).click();
        const label = id => page.locator('#'+id).innerText();
        const visible = id => page.locator('#'+id).isVisible();
        if (file==='a1') {
          assert.equal(await visible('bc'),false);
          await step(2);
          assert.equal(await visible('bc'),true);
          await click('prev');
          assert.equal(await visible('bc'),false);
          await click('reveal');
          assert.equal(await visible('bc'),true);
          await click('reset');
          assert.equal(await visible('bc'),false);
        } else if (file==='b1') {
          assert.doesNotMatch(await label('measure'), /6 FE/);
          assert.equal(await page.locator('#fixed').isChecked(),false);
          await button('#parts','B 1.3').click();
          await step(2);
          assert.equal(await page.locator('#fixed').isChecked(),true);
          await button('#parts','B 1.4').click();
          await step(2);
          assert.match(await label('measure'), /6 FE/);
          await click('prev');
          assert.doesNotMatch(await label('measure'), /6 FE/);
        } else if (file==='b2') {
          await click('view3');
          await page.locator('#threecanvas[data-view="resetcam"]').waitFor();
          assert.equal(await label('sweepValue'),'360°');
          if (device.hasTouch) await page.locator('#bottomcam').tap();
          else await click('bottomcam');
          assert.equal(await page.locator('#threecanvas').getAttribute('data-view'),'bottomcam');
          await click('topcam');
          assert.equal(await page.locator('#topcam').getAttribute('aria-pressed'),'true');
          await click('cutaway');
          assert.equal(await label('sweepValue'),'270°');
          await click('cutaway');
          assert.equal(await label('sweepValue'),'360°');
          await page.locator('#sweep').fill('0');
          assert.equal(await label('sweepValue'),'0°');
          await click('reset');
          assert.equal(await label('sweepValue'),'360°');
          assert.equal(await page.locator('#threecanvas').getAttribute('data-view'),'resetcam');
          await button('#parts','B 2.3').click();
          assert.equal(await visible('p34'),false);
          await step(3);
          assert.equal(await label('angleval'),'34,23°');
          assert.match(await label('measure'), /201,26 cm³/);
          await click('prev');
          assert.equal(await visible('p34'),false);
          assert.doesNotMatch(await label('measure'), /cm³/);
        } else if (file==='b3') {
          assert.equal(await page.locator('#square').isChecked(),false);
          assert.equal(await page.locator('#circle').isChecked(),false);
          await button('#tasks','B 3.2').click();
          await step(1);
          assert.equal(await page.locator('#fixed1').isChecked(),true);
          assert.equal(await page.locator('#fixed2').isChecked(),false);
          await step(1);
          assert.equal(await page.locator('#fixed2').isChecked(),true);
          await button('#tasks','B 3.6').click();
          assert.doesNotMatch(await label('presets'), /−1,83/);
          await step(3);
          assert.match(await label('xvalue'), /−1,83/);
          assert.equal(await page.locator('#circle').isChecked(),true);
          await page.locator('#xslider').fill('-4');
          assert.equal(await page.locator('#plot text').filter({hasText:/^B₄$/}).count(),0);
          await click('prev');
          assert.equal(await page.locator('#circle').isChecked(),false);
        } else if (file==='index'||file==='b4') {
          const figure = page.locator('#graph');
          assert.doesNotMatch(await figure.textContent(), /C[₁₂ₙ]/);
          await step(2);
          assert.match(await figure.textContent(), /C₁/);
          await step(3);
          assert.match(await figure.textContent(), /C₂/);
          await button('#parts','B 4.2').click();
          assert.doesNotMatch(await label('presets'),/98,21/);
          await step(4);
          assert.equal(await label('anglevalue'),'98,21°');
          assert.equal(await page.locator('#graph circle[fill="#d28a28"]').count(),1);
          await click('prev');
          assert.equal(await page.locator('#graph circle[fill="#d28a28"]').count(),0);
          await button('#parts','B 4.4').click();
          assert.doesNotMatch(await label('presets'),/120/);
          await step(2);
          assert.equal(await label('anglevalue'),'120,00°');
          await page.locator('#lengths').check();
          assert.equal(await page.locator('#graph text > tspan[text-decoration="overline"]').count(),2);
          assert.match(await page.locator('#graph').textContent(),/\|AC₄\| = /);
        } else {
          assert.notEqual(await label('solution'),'');
        }
        assert.equal(await page.locator('a[href$=".pdf"]').count(),0);
        assert.equal(problems.length,0,problems.join('\n'));
        console.log(name+': '+directory+file);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
