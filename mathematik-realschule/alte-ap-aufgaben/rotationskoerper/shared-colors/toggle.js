// A single control switches the entire didactic color key without changing geometry.
export function installColorToggle(onChange){
 const label=document.createElement('label');label.className='color-toggle';
 label.innerHTML='<input id="componentColors" type="checkbox"> Teilkörper farbig unterscheiden';
 const legend=document.getElementById('legend')||document.querySelector('.legend');legend.before(label);
 const control=label.querySelector('input');
 const sync=()=>{document.body.classList.toggle('rotation-colors-off',!control.checked);onChange()};
 control.addEventListener('change',sync);document.body.classList.add('rotation-colors-off');
 return control;
}
export function applySVGColorMode(svg,enabled){
 if(enabled)return;
 for(const el of svg.querySelectorAll('polygon,circle[fill]:not([r="2.2"]),line[stroke-width="5"]')){
  if(el.hasAttribute('data-liquid'))continue;
  const fill=el.getAttribute('fill');if(fill&&fill!=='none')el.setAttribute('fill','#aeb8c3');
  if(el.hasAttribute('stroke')&&el.getAttribute('stroke')!=='none')el.setAttribute('stroke','#536577');
 }
}
export function applyMeshColorMode(group,enabled){
 if(enabled)return;
 for(const obj of group.children)if(obj.isMesh)obj.material.color.set('#aeb8c3');
}
