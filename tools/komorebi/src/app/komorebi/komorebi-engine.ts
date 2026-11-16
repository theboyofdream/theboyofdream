// @ts-nocheck -- ported verbatim from the Komorebi playground; tighten types incrementally.
export type KomorebiOptions = {
  mode: "branch" | "dapple" | "compound" | "drift";
  leafShape: "pointed" | "lance" | "broad" | "oval";
  blend: "multiply" | "plus-lighter";
  invert: boolean;
  color: string;
  presence: number; blur: number; reach: number; wind: number; size: number;
  density: number; thick: number; angle: number; ox: number; oy: number; count: number;
  gust: number; speed: number; vary: number; falloff: number; spread: number;
  lightAngle: number; stretch: number; parallax: number; seed: number;
  respectReduced: boolean;
};

export function komorebi(cv: HTMLCanvasElement, o: KomorebiOptions) {
  var c=cv.getContext('2d'),oc=document.createElement('canvas'),g=oc.getContext('2d'),W,H,K=.5,raf,CF='filter' in c,PI=Math.PI;
  var R=function(s){return function(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
  var SH={lance:.26,pointed:.4,oval:0,broad:.6};
  function hh(i){var s=Math.sin(i*127.1+o.seed*.013)*43758.5453;return s-Math.floor(s)}
  function vn(x){var i=Math.floor(x),f=x-i;f=f*f*(3-2*f);return(hh(i)*(1-f)+hh(i+1)*f)*2-1}
  function fn(x){return vn(x)*.6+vn(x*2.13+17)*.3+vn(x*4.7+41)*.1}
  function gu(t,px,py){return Math.max(0,.55+.8*fn(t*.1-(px*.0025+py*.0018)))}
  function fit(){var b=cv.getBoundingClientRect();W=cv.width=oc.width=Math.max(1,b.width*K|0);H=cv.height=oc.height=Math.max(1,b.height*K|0)}
  function style(){cv.style.filter=CF?'none':'blur('+o.blur+'px)';cv.style.opacity=o.presence/100;cv.style.mixBlendMode=o.blend}
  function leaf(s,px,py,a){var ww=SH[o.leafShape];if(ww==null)ww=.4;g.save();g.translate(px,py);g.rotate(a);g.beginPath();
    if(!ww)g.ellipse(0,0,s,s*.5,0,0,6.283);
    else{var h=s*ww*1.6;g.moveTo(-s,0);g.bezierCurveTo(-s*.3,-h,s*.45,-h,s,0);g.bezierCurveTo(s*.45,h,-s*.3,h,-s,0)}
    g.fill();g.restore()}
  function frame(ts){
    var t=ts/1000,gs=(o.gust==null?60:o.gust)/100,w=o.wind/100,k=K*o.size/100,rc=o.reach/100,ld=(o.density==null?100:o.density)/100,
      Ox=W*o.ox/100,Oy=H*o.oy/100,th=o.lightAngle*PI/180,st=o.stretch/100,par=o.parallax*K,fo=o.falloff/100,
      n=o.count||3,A=o.angle*PI/180,D0=Math.hypot(W,H),th100=(o.thick||100)/100;
    c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation='source-over';c.clearRect(0,0,W,H);
    if(o.invert){c.fillStyle=o.color;c.fillRect(0,0,W,H)}
    var wl=function(px,py){return w*((1-gs)+gs*1.4*gu(t,px,py))};
    for(var L=0;L<3;L++){
      var r=R(o.seed+L*977),sc=[1.5,1.2,1][L],b,i,m;
      g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W,H);
      g.translate(Ox+Math.cos(th)*par*(2-L),Oy+Math.sin(th)*par*(2-L));g.rotate(th);g.scale(st,1);g.rotate(-th);g.translate(-Ox,-Oy);
      g.fillStyle=g.strokeStyle=o.color;g.lineCap='round';
      if(o.mode==='branch'){
        var grow=function(px,py,a,l,d){
          var wv=wl(px,py);a+=fn(t*.45+d*1.3+px*.011)*.1*wv*(d+1)+fn(t*1.7+d*2.1+py*.021)*.04*wv*d;
          var x2=px+Math.cos(a)*l,y2=py+Math.sin(a)*l;
          g.lineWidth=Math.max(1.5*K,(8-d)*2*k*sc*th100);g.beginPath();g.moveTo(px,py);g.lineTo(x2,y2);g.stroke();
          var q=r(),q2=r(),q3=r();
          if(d>=2&&q<.75*ld)leaf((18+q2*16)*k*sc,px+(x2-px)*.5,py+(y2-py)*.5,a+1+fn(t*1.4+px*.03)*.55*wv);
          if(d>=1&&q3<.55*(ld-1))leaf((14+q*14)*k*sc,px+(x2-px)*.8,py+(y2-py)*.8,a-1+fn(t*1.2+py*.03+9)*.6*wv);
          if(d<6){grow(x2,y2,a-.3-q2*.3,l*.77,d+1);grow(x2,y2,a+.28+q3*.35,l*.75,d+1)}
          else if(q<ld)leaf((26+q*14)*k*sc,x2,y2,a+fn(t*1.6+py*.03+21)*.6*wv);
        };
        for(b=0;b<n;b++){var off=(b-(n-1)/2)*H*.1,aa=A+r()*.5-.25;grow(Ox-Math.sin(aa)*off+r()*W*.02,Oy+Math.cos(aa)*off,aa,Math.min(W,H)*.2*rc*sc,0)}
      }else if(o.mode==='dapple'){
        var SX=Ox,SY=Oy,LF=[.6,.8,1][L],wd=1+(o.spread==null?120:o.spread)/200,bough=function(px,py,a,l,d){
          var wv=wl(px,py);
          a+=fn(t*.4+d*1.7+px*.009)*.09*wv*(d+1)+fn(t*1.5+d*2.3+py*.02)*.03*wv*d;
          var x2=px+Math.cos(a)*l,y2=py+Math.sin(a)*l,dn=Math.hypot(x2-SX,y2-SY)/D0;
          g.lineWidth=Math.max(1.5*K,(9-d)*1.7*k*sc*th100*.45);g.beginPath();g.moveTo(px,py);g.lineTo(x2,y2);g.stroke();
          var q=r(),q2=r(),q3=r(),q4=r(),nz=(Math.sin(x2*.008+L*2.1)+Math.sin(y2*.011-L)+Math.sin((x2-y2)*.006+L*.7))/3,
            sc2=nz*.6+(ld-1)*.5+.35-dn*fo*1.6;
          if(d>=1&&sc2>0){
            var nl=Math.max(2,Math.round((4+5*Math.min(ld,1.5)*Math.min(1,sc2*1.6))*LF));
            for(var m=0;m<nl;m++){
              var la=a+(m-(nl-1)/2)*(2.6/Math.max(1,nl-1))+(((q2+m*.61)%1)-.5)*.7+fn(t*1.1+x2*.04+m*3.1)*.5*wv,ls=(22+((q+m*.37)%1)*22)*k*sc*(1-dn*.3);
              g.lineWidth=Math.max(1,1.2*K*sc);g.beginPath();g.moveTo(x2,y2);g.lineTo(x2+Math.cos(la)*ls*.2,y2+Math.sin(la)*ls*.2);g.stroke();
              leaf(ls,x2+Math.cos(la)*ls*1.15,y2+Math.sin(la)*ls*1.15,la);
            }
          }
          if(d<6){bough(x2,y2,a-(.3+q3*.35)*wd,l*.8,d+1);bough(x2,y2,a+(.28+q4*.4)*wd,l*.78,d+1);
            if(d<2&&q<.5)bough(x2,y2,a+(q2-.5)*1.2,l*.7,d+1)}
        };
        for(b=0;b<n;b++){var sp0=(o.spread==null?120:o.spread),s=sp0/360,ai=A+(r()-.5)*sp0*PI/180,jx=(r()-.5)*s*W*.8,fx=W/2-Math.cos(ai)*D0*.5-jx*Math.sin(ai),fy=H/2-Math.sin(ai)*D0*.5+jx*Math.cos(ai),sm=Math.min(1,s*2);SX=Ox+(fx-Ox)*sm;SY=Oy+(fy-Oy)*sm;bough(SX,SY,ai,Math.min(W,H)*.22*rc*sc*(1+sm*.6),0)}
      }else if(o.mode==='compound'){
        for(b=0;b<n;b++){
          var bb=b-(n-1)/2,an=A+bb*.38+r()*.2-.1,len=Math.min(W,H)*.5*rc*sc*(.8+r()*.4),cur=(r()-.5)*.9,N=8,seg=len/N,
            px=Ox-Math.sin(an)*bb*H*.04,py=Oy+Math.cos(an)*bb*H*.04;
          for(i=0;i<N;i++){
            an+=cur/N+fn(t*.4+i*.5+b*5.3)*.05*wl(px,py)*(i+1);
            var nx=px+Math.cos(an)*seg,ny=py+Math.sin(an)*seg,q1=r(),q2=r(),sz=(14+(N-i)*4.5)*k*sc;
            g.lineWidth=Math.max(1.5*K,(N-i)*.9*k*sc*th100);g.beginPath();g.moveTo(px,py);g.lineTo(nx,ny);g.stroke();
            if(i>0){var sw=fn(t*1.3+i*2.7+b*7)*.4*wl(px,py),a1=an-1+sw,a2=an+1-sw;
              if(q1<Math.min(1,ld*1.2))leaf(sz,nx+Math.cos(a1)*sz,ny+Math.sin(a1)*sz,a1);
              if(q2<Math.min(1,ld*1.2))leaf(sz,nx+Math.cos(a2)*sz,ny+Math.sin(a2)*sz,a2)}
            px=nx;py=ny;
          }
          var ts2=22*k*sc;leaf(ts2,px+Math.cos(an)*ts2,py+Math.sin(an)*ts2,an);
        }
      }else{
        for(var j=0;j<40*ld;j++){var fx=r(),fy=r(),sp=8+r()*14,sz2=(14+r()*26)*k*sc,ph=r()*6;
          leaf(sz2,((fx*W-t*sp*K*(.3+w))%W+W)%W,(fy*H+t*sp*.7*K*(.3+w)+fn(t*.3+ph*9)*30*K*w)%H,t*(.3+ph*.1)*(.3+w)+ph)}
      }
      c.filter=CF?'blur('+(o.blur*[1.8,1,.45][L]*K)+'px)':'none';c.globalAlpha=[.35,.65,1][L];c.globalCompositeOperation=o.invert?'destination-out':'source-over';c.drawImage(oc,0,0);
    }
    c.filter='none';c.globalAlpha=1;
  }
  var T=0,last=null;
  function loop(ts){var dt=last==null?0:Math.min(.1,(ts-last)/1000),s=ts/1000,v=(o.vary==null?50:o.vary)/100;last=ts;
    T+=dt*(o.speed||100)/100*Math.max(.15,1+v*1.2*(fn(s*.05+50)*.8+fn(s*.21+120)*.35));
    frame(T*1000);raf=requestAnimationFrame(loop)}
  function start(){cancelAnimationFrame(raf);last=null;fit();style();
    if(o.respectReduced&&matchMedia('(prefers-reduced-motion:reduce)').matches)frame(0);else raf=requestAnimationFrame(loop)}
  addEventListener('resize',start);start();
  return{apply:start,stop:function(){cancelAnimationFrame(raf);removeEventListener('resize',start)}};
}
