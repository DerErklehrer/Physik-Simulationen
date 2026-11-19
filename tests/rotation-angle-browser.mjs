import assert from 'node:assert/strict';
import {readdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const base = process.env.QA_BASE || 'http://127.0.0.1:8765';
const exam = 'abschlusspruefung';
const mirror = 'mathematik-10/abschlusspruefungsaufgaben';
const secondGroup = 'mathematik-realschule/10-ii-iii/abschlusspruefungen';
const archive = 'mathematik-realschule/alte-ap-aufgaben/rotationskoerper';
const files = (await readdir(archive)).filter(name => /^\d{4}-.*\.html$/.test(name));
const pages = [
  ...files.map(name => ({
    path: `${archive}/${name}`,
    first: name === '2018-ht-a3.html' ? 225 : 360,
  })),
  ...[2023, 2024, 2026].map(year => ({path: `${secondGroup}/${year}/haupttermin/b2.html`})),
  ...[2024, 2025].map(year => ({path: `${exam}/${year}/nachtermin/b2.html`})),
  {path: `${secondGroup}/2026/nachtermin/b2.html`},
  {path: `${exam}/2025/haupttermin/a2.html`, view: '#threeD2025', canvas: '#view3d2025 canvas'},
  {path: `${mirror}/2025/a2.html`, view: '#threeD2025', canvas: '#view3d2025 canvas'},
  {path: `${exam}/2025/haupttermin/sammelfassung-alt.html`, view: '#threeD2025', canvas: '#view3d2025 canvas', prepare: '#tasks button:nth-child(2)'},
  {path: `${exam}/2026/haupttermin/b2.html`, canvas: '#threecanvas'},
  {path: `${mirror}/2026/b2.html`, canvas: '#threecanvas'},
  {path: `${exam}/20xx/muster1/a2.html`, view: '#threeD', canvas: '#view3d canvas', prepare: '#parts button:nth-child(2)', slider: '#theta'},
  {path: `${mirror}/muster1/a2.html?teil=1`, view: '#threeD', canvas: '#view3d canvas', slider: '#theta'},
];

const browser = await chromium.launch({
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
async function verify(context, entry) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    const result = await page.goto(`${base}/${entry.path}`);
    assert.equal(result.status(), 200);
    if (entry.prepare) await page.locator(entry.prepare).click();
    const cut = page.locator('#cutaway');
    assert.equal(await cut.isVisible(), false);
    await page.locator(entry.view || '#view3').click();
    await cut.waitFor({state: 'visible'});
    const slider = page.locator(entry.slider || '#sweep');
    const canvasSelector = entry.canvas || '#canvas';
    await page.waitForFunction(selector => {
      const canvas = document.querySelector(selector);
      return canvas && canvas.width !== 300 && canvas.getContext('webgl2');
    }, canvasSelector);
    const readout = page.locator(entry.slider === '#theta' ? '#thetaval' : '#sweepValue');
    async function expectAngle(degrees) {
      assert.equal(await slider.inputValue(), String(degrees));
      assert.equal(await readout.textContent(), `${degrees}°`);
      assert.equal(await cut.textContent(), degrees === 270 ? 'Körper schließen' : 'Ein Viertel herausschneiden');
    }
    await expectAngle(entry.first || 360);
    await cut.click();
    await expectAngle(270);
    const canvas = page.locator(canvasSelector);
    const open = entry.canvas ? await canvas.screenshot() : null;
    await cut.click();
    await expectAngle(360);
    if (open) assert.notDeepEqual(await canvas.screenshot(), open, '3D-Darstellung des Viertelschnitts');
    for (const degrees of [0, 135, 270, 360]) {
      await slider.evaluate((input, value) => {
        input.value = String(value);
        input.dispatchEvent(new Event('input', {bubbles: true}));
      }, degrees);
      await expectAngle(degrees);
    }
    const state = await page.evaluate(() => window.oldRotationState?.() || window.rotationState?.() || window.ntState?.());
    if (state) assert.equal(state.sweep, 360);
    assert.deepEqual(errors, []);
  } catch (error) {
    throw new Error(entry.path + ': ' + error.message, {cause: error});
  } finally {
    await page.close();
  }
}
try {
  for (const width of [1366, 390]) {
    const mobile = width === 390;
    const context = await browser.newContext({
      viewport: {width, height: 900}, isMobile: mobile, hasTouch: mobile,
    });
    for (const entry of pages) await verify(context, entry);
    await context.close();
    console.log(`${pages.length} Seiten · ${mobile ? 'Mobil' : 'Desktop'} · Startwinkel, Regler und Viertelschnitt bestanden`);
  }
} finally {
  await browser.close();
}
