(()=>{
if (document.URL !== "https://chunithm-net-eng.com/mobile/record/musicGenre/master") {
  if (window.confirm('마스터 전체 목록 화면에서만 사용할 수 있습니다. 이동할까요?')) {
		document.location.href = "https://chunithm-net-eng.com/mobile/record/musicGenre/master";
    return;
  }
}
const s = 4571.3; // sum of master fumen level
const c = 365; // master fumen count
const p = (a,b)=>(a+b);
const a = Array.from(document.querySelectorAll('form > .musiclist_box')).map(e => {
  let a = e.querySelector('.music_title').innerText;
  let b = e.querySelector('.text_b');
  let c = b && parseInt(b.innerText.replace(/,/gi, '')) || 0;
  let d = parseInt(e.querySelector('input[name="idx"]').value);
    let f = Array.from(e.querySelectorAll('.play_musicdata_icon > img')).map(e => {
        let a = e.src;
        return a.substring(a.lastIndexOf('_')+1, a.lastIndexOf('.'));
    });
    let g = f.includes('fullcombo');
    let h = f.includes('alljustice');
  return {s: c, l: g*2+h};
});
const o = a.map(e => {
    let a = e.s;
    if (a > 1007499) return Math.floor((a-1007500)*375/2500)+1000;
    if (a > 1004999) return Math.floor((a-1005000)*25/250)+750;
    if (a > 999999) return Math.floor((a-1000000)*25/500)+500;
    if (a > 974999) return Math.floor((a-975000)*5/250)+0;
    if (a > 924999) return Math.floor((a-925000)*15/500)-1500;
    if (a > 899999) return Math.floor((a-900000)*10/250)-2500;
    return -Infinity;
});
if (o.includes(-Infinity)) return alert('전곡 순회를 마쳐야 사용할 수 있습니다.');
const l = a.map(e => {
    let a = e.l;
    let b = e.s === 1010000;
    if(!b) return a*50;
    return 125;
});
const i = new Intl.NumberFormat('ko-KR').format;
const v = o.reduce(p,0) + l.reduce(p,0);
const m = s*5+c*15;
const n = Math.min(...a.map(e=>(e.s)));
const r = a.length!==c?'-':n>1007499?'SSS':n>999999?'SS':n>974999?'S':'-';
const t = a.map(e=>(e.s)).reduce(p,0);
const h = c*1010000-t;
alert(`전곡 랭크: ${r}
OVER POWER: ${i((v+s*500)/100)} (${Math.floor((v+s*500)*100/m)/100}%, 이론치 ${i(m)}) 
깎인 총 점수: ${i(h)} (평균: ${i(h/c)})`);
})();
