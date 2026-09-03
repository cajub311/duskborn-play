
    for(const [id,p] of Object.entries(PLACES)){if(p.box){const[x,y,w,h]=p.box;ctx.fillStyle='#181a29';ctx.fillRect(x*32-3,y*32-3,w*32+6,h*32+6);ctx.fillStyle=p.color;ctx.fillRect(x*32,y*32,w*32,h*32);ctx.fillStyle='#b68a55';ctx.fillRect(p.x*32+10,p.y*32-8,12,8);ctx.fillStyle='#ded0a5';ctx.font='7px monospace';ctx.textAlign='center';ctx.fillText(p.name.toUpperCase(),(x+w/2)*32,y*32+12)}else{ctx.strokeStyle=p.color;ctx.lineWidth=3;ctx.strokeRect(p.x*32+5,p.y*32+5,22,22)}}
    ctx.fillStyle='#b09a59';for(let x=0;x<20;x+=2){ctx.fillRect(x*32+4,10*32+6,2,15);ctx.fillRect(x*32+9,10*32+10,2,12)}
    for(const [id,p] of Object.entries(PEOPLE)){if(!personVisible(id))continue;let px=p.x,py=p.y;if(state&&state.npcs[id].disposition<-20&&Math.abs(state.x-px)+Math.abs(state.y-py)<3){px+=px<state.x?-1:1}ctx.fillStyle='#10131f';ctx.fillRect(px*32+10,py*32+12,12,15);ctx.fillStyle=p.color;ctx.fillRect(px*32+12,py*32+5,8,9);ctx.fillStyle='#ddd1ad';ctx.font='6px monospace';ctx.textAlign='center';ctx.fillText(p.name.toUpperCase(),px*32+16,py*32+31)}
    if(state){const x=state.x*32,y=state.y*32,evil=state.personality.brutality>=65||state.personality.shadow>=35,good=state.personality.brutality<=35;ctx.fillStyle=evil?'#7a3048':good?'#d7bd63':'#5b8d83';ctx.fillRect(x+8,y+7,16,20);ctx.fillStyle='#e0c59a';ctx.fillRect(x+11,y+3,10,8);if(evil){ctx.fillStyle='#d0b079';ctx.fillRect(x+9,y,3,5);ctx.fillRect(x+20,y,3,5)}if(good){ctx.strokeStyle='#e7d06f';ctx.strokeRect(x+7,y+2,18,27)}}
    ctx.fillStyle='rgba(20,18,38,.38)';ctx.fillRect(0,0,640,state?state.clocks.dusk*26:0);ctx.fillStyle='#d9c9a4';ctx.textAlign='left';ctx.font='8px monospace';ctx.fillText('WASD MOVE  ·  T TYPE',8,350);refreshPrompt()}
  function blocked(x,y){if(x<0||x>19||y<0||y>10)return true;return Object.values(PLACES).some(p=>p.box&&x>=p.box[0]&&x<p.box[0]+p.box[2]&&y>=p.box[1]&&y<p.box[1]+p.box[3])}
  function move(dx,dy){if(!state||busy||!state.opening||state.ending||overlayOpen())return;const x=state.x+dx,y=state.y+dy;if(!blocked(x,y)){state.x=x;state.y=y;draw()}}
  function wait(ms){return new Promise(r=>setTimeout(r,ms))}
  document.querySelectorAll('.class').forEach(b=>b.onclick=()=>{selected=b.dataset.class;document.querySelectorAll('.class').forEach(x=>x.classList.toggle('selected',x===b))});
  $('#begin').onclick=begin;$('#continue').onclick=resume;$('#save').onclick=()=>save(false);$('#reset').onclick=()=>{if(confirm('Erase this DUSKBORN save?')){localStorage.removeItem(SAVE);location.reload()}};$('#again').onclick=()=>{localStorage.removeItem(SAVE);location.reload()};  $('#cinemaClose').onclick=()=>{$('#cinema').classList.add('hidden');refreshPrompt()};
  $('#actionForm').onsubmit=e=>{e.preventDefault();freeAction($('#actionInput').value.trim())};
  $('#interactBtn').onclick=()=>interact();
  addEventListener('keydown',e=>{
    if(!$('#cinema').classList.contains('hidden')){if(e.key==='Escape'||e.key==='Enter'){e.preventDefault();$('#cinema').classList.add('hidden');refreshPrompt()}return}
    if(!$('#die').classList.contains('hidden')||!$('#ending').classList.contains('hidden'))return;
    if(e.target&&e.target.matches&&e.target.matches('input')){if(e.key==='Escape')e.target.blur();if(e.target.id==='name'&&e.key==='Enter'){e.preventDefault();begin()}return}
    if(!$('#cover').classList.contains('hidden'))return;
    const k=e.key.toLowerCase();
    if(['arrowup','w'].includes(k)){e.preventDefault();move(0,-1)}
    if(['arrowdown','s'].includes(k)){e.preventDefault();move(0,1)}
    if(['arrowleft','a'].includes(k)){e.preventDefault();move(-1,0)}
    if(['arrowright','d'].includes(k)){e.preventDefault();move(1,0)}
    if(k==='t'){e.preventDefault();if(state&&!state.ending&&!busy)$('#actionInput').focus()}
    if(k==='e'||e.key==='Enter'){e.preventDefault();interact()}
    if(e.key==='Escape'&&state&&state.opening&&!state.ending)show(PLACES[near]?.name||'Duskmere','The road is yours again.',[['Walk the village','back','']])});
  if(localStorage.getItem(SAVE))$('#continue').classList.remove('hidden');
  if(location.protocol.startsWith('http'))$('#connection').textContent='Storyteller: bridge ready';
  try{$('#name').focus()}catch(_){}
  ctx.fillStyle='#11162b';ctx.fillRect(0,0,640,360);ctx.fillStyle='#d5bd82';ctx.textAlign='center';ctx.font='bold 18px Georgia';ctx.fillText('DUSKMERE',320,160);ctx.fillStyle='#8e8298';ctx.font='9px monospace';ctx.fillText('THE DEAD ARE WAITING',320,181);
})();
