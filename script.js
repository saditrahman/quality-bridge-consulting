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
    const divisions={Rangpur:[.23,.2],Rajshahi:[.23,.36],Mymensingh:[.51,.34],Sylhet:[.75,.35],Dhaka:[.5,.46],Khulna:[.31,.61],Barishal:[.5,.67],Chattogram:[.8,.73]};
    const hub=divisions.Dhaka;
    let w=0,h=0,dpr=1,t=0;
    function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    function pt(p){return[p[0]*w,p[1]*h]}
    function curve(a,b,bend=.08){const p=pt(a),q=pt(b),cx=(p[0]+q[0])/2+(q[1]-p[1])*bend,cy=(p[1]+q[1])/2-(q[0]-p[0])*bend;return{p,q,c:[cx,cy]}}
    function onCurve(c,u){const v=1-u;return[v*v*c.p[0]+2*v*u*c.c[0]+u*u*c.q[0],v*v*c.p[1]+2*v*u*c.c[1]+u*u*c.q[1]]}
    function draw(){t+=reduce?0:.006;ctx.clearRect(0,0,w,h);Object.entries(divisions).forEach(([name,pos],i)=>{if(name==='Dhaka')return;const c=curve(hub,pos,i%2?.09:-.09);ctx.beginPath();ctx.moveTo(...c.p);ctx.quadraticCurveTo(...c.c,...c.q);ctx.setLineDash([4,8]);ctx.lineDashOffset=-t*140-i*5;ctx.strokeStyle='rgba(255,255,255,.52)';ctx.lineWidth=1.2;ctx.stroke();ctx.setLineDash([]);const moving=onCurve(c,(t*.55+i*.115)%1);ctx.beginPath();ctx.arc(moving[0],moving[1],3.2,0,Math.PI*2);ctx.fillStyle='#FFFFFF';ctx.shadowColor='#38A3E1';ctx.shadowBlur=14;ctx.fill();ctx.shadowBlur=0});Object.values(divisions).forEach((pos,i)=>{const p=pt(pos),pulse=reduce?5:5+Math.sin(t*8+i)*2;ctx.beginPath();ctx.arc(p[0],p[1],pulse+8,0,Math.PI*2);ctx.fillStyle='rgba(56,163,225,.13)';ctx.fill();ctx.beginPath();ctx.arc(p[0],p[1],pulse,0,Math.PI*2);ctx.fillStyle='#38A3E1';ctx.shadowColor='#38A3E1';ctx.shadowBlur=18;ctx.fill();ctx.shadowBlur=0});if(!reduce)requestAnimationFrame(draw)}
    resize();draw();window.addEventListener('resize',resize);
  }
})();
