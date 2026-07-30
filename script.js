(function(){
  const body=document.body;
  const theme=document.querySelector('[data-theme-toggle]');
  const menu=document.querySelector('[data-menu-toggle]');
  const nav=document.querySelector('.nav-links');
  const saved=localStorage.getItem('qbc-theme');
  if(saved==='dark') body.classList.add('dark');
  if(theme){
    theme.textContent=body.classList.contains('dark')?'☀':'☾';
    theme.addEventListener('click',()=>{
      body.classList.toggle('dark');
      const dark=body.classList.contains('dark');
      theme.textContent=dark?'☀':'☾';
      theme.setAttribute('aria-label',dark?'Use light theme':'Use dark theme');
      localStorage.setItem('qbc-theme',dark?'dark':'light');
    });
  }
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(open));
    });
  }
  document.querySelectorAll('.nav-links a').forEach(link=>link.addEventListener('click',()=>nav&&nav.classList.remove('open')));
  const form=document.querySelector('[data-contact-form]');
  if(form) form.addEventListener('submit',e=>{
    e.preventDefault();
    const status=form.querySelector('[data-form-status]');
    status.textContent='Thank you. Your form is ready to connect to your preferred email or CRM service.';
  });
  const canvas=document.getElementById('bdMapCanvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const outline=[[.46,.04],[.54,.09],[.56,.16],[.64,.18],[.62,.25],[.68,.31],[.62,.36],[.66,.43],[.61,.5],[.65,.58],[.59,.65],[.61,.73],[.55,.78],[.53,.91],[.48,.97],[.45,.86],[.4,.79],[.39,.68],[.32,.62],[.36,.53],[.31,.45],[.36,.37],[.34,.29],[.4,.24],[.38,.16],[.43,.12]];
    const cities=[[.47,.46],[.55,.25],[.4,.27],[.4,.66],[.59,.38],[.49,.73],[.43,.14],[.53,.36]];
    let w=0,h=0,dpr=1,t=0;
    function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function point(p){const size=Math.min(w*.9,h*.9),mapW=size*.65,ox=(w-mapW)/2,oy=(h-size)/2;return[ox+((p[0]-.28)/.44)*mapW,oy+p[1]*size]}
    function path(){ctx.beginPath();outline.forEach((p,i)=>{const q=point(p);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.closePath()}
    function draw(){t+=reduce?0:.012;ctx.clearRect(0,0,w,h);ctx.save();ctx.shadowColor='rgba(0,168,122,.8)';ctx.shadowBlur=25;path();const g=ctx.createLinearGradient(0,0,w,h);g.addColorStop(0,'rgba(0,106,78,.9)');g.addColorStop(1,'rgba(0,58,43,.96)');ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(154,220,177,.9)';ctx.lineWidth=2;ctx.stroke();ctx.clip();for(let i=0;i<13;i++){const y=(i/12)*h+Math.sin(t+i)*4;ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(w*.3,y-28,w*.62,y+34,w,y-8);ctx.strokeStyle='rgba(154,173,92,.13)';ctx.lineWidth=1;ctx.stroke()}ctx.restore();const hub=point(cities[0]);cities.slice(1).forEach((c,i)=>{const q=point(c),flow=(Math.sin(t*1.7+i)+1)/2;ctx.beginPath();ctx.moveTo(...hub);ctx.quadraticCurveTo((hub[0]+q[0])/2+Math.sin(i)*30,(hub[1]+q[1])/2-22,...q);ctx.strokeStyle=`rgba(0,200,145,${.25+flow*.35})`;ctx.lineWidth=1.4;ctx.stroke()});cities.forEach((c,i)=>{const q=point(c),pulse=4+Math.sin(t*2+i)*2;ctx.beginPath();ctx.arc(q[0],q[1],pulse+7,0,Math.PI*2);ctx.fillStyle='rgba(244,42,65,.10)';ctx.fill();ctx.beginPath();ctx.arc(q[0],q[1],i===0?7:pulse,0,Math.PI*2);ctx.fillStyle=i===0?'#f42a41':'#e93448';ctx.shadowColor='#f42a41';ctx.shadowBlur=14;ctx.fill();ctx.shadowBlur=0});if(!reduce)requestAnimationFrame(draw)}
    resize();draw();window.addEventListener('resize',resize);
  }
})();
