(()=>{
if (!document.URL.startsWith("https://chunithm-net-eng.com/mobile/record/music")) {
  if (window.confirm('아시아판 츄니즘넷 보면 기록 페이지에서만 사용할 수 있습니다. 이동할까요?')) {
    document.location.href = "https://chunithm-net-eng.com/mobile/record/musicLevel/";
    return;
  }
}
const e1 = $('<div>').addClass('toolBg').attr('style', 'position:fixed;top:0;z-index:9999;width:100%;height:100%;text-align:center;background-color:rgba(0,0,0,0.6);');
const e2 = $('<div>').addClass('infoArea').attr('style', 'position:relative;top:20%;width:70%;max-width:720px;height:60%;padding:15px;text-align:left;background-color:#6bcde6;color:#fcfcfc;display:inline-block;overflow:hidden;');
const e3 = $('<span>').addClass('infoSpan').text('Waiting for score data...');
e2.append(e3);
e1.append(e2);
$('body').append(e1);
const u = page => `https://chunithm-net-eng.com/mobile/record/musicLevel/${page}/`;
const f = lv => (()=> (
  new Promise((s,j) => {
    $.ajax({
      type: 'POST',
      url: u('sendSearch'),
      data: {level: lv, token: document.querySelector('input[name="token"]').value}
    }).done(() => {
      $.ajax({
        type: 'GET',
        url: u('search')
      }).done((m) => {
        const z = Array.from($(m).find('form > .musiclist_box')).map(e => {
          const a = e.querySelector('.music_title').innerText;
          const b = e.querySelector('.text_b');
          const c = b && parseInt(b.innerText.replace(/,/gi, '')) || 0;
          const d = parseInt(e.querySelector('input[name="idx"]').value);
          const f = Array.from(e.classList);
          const g = f.includes('bg_master');
          const h = f.includes('bg_expert');
          const i = g?'MASTER':h?'EXPERT':undefined;
          return {t: a, s: c, i: d, d: i};
        });
        s(z);
      });
    });
  })
));
const g = lvs => (
  new Promise((s,j) => {
    (f(lvs[0])()).then(d => {
      lvs.splice(0,1);
      if (lvs.length>0) {
        g(lvs).then(e => (s([...d, ...e])));
      } else s(d);
    });
  })
);
const h = g([16,17,18,19,20]);
const l = (
  new Promise((s,j) => (
    $.ajax({type: 'GET', url: 'https://triple3t.github.io/Chunithm-Intl-temp-script/datatables/12.json?'+new Date().getTime()}).done((d) => {
      s({EXPERT: Object.fromEntries(d.EXPERT.map(e=>[e.id,e.level])), MASTER: Object.fromEntries(d.MASTER.map(e=>[e.id,e.level]))});
    })
  ))
);
Promise.all([h,l]).then(v => {
  const a = v[0].map(e => ({...e, l: v[1][e.d][e.i]}));
  const b = a.sort((a,b)=>(b.d.charCodeAt(0)-a.d.charCodeAt(0)||b.l-a.l||a.i-b.i));
  const c = b.map(e => ([e.d, e.t, e.l, e.s].join('\t'))).join('\n');
  const d = $('<button>').addClass('infoButton').text('click to copy table');
  const f = () => {
    try {
      const el = document.createElement("textarea");
      el.value = c;
      el.setAttribute('readonly','');
      el.style.position='absolute';
      el.style.left='-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('작업이 완료되었습니다. B2 셀에 대고 붙여넣기하세요.');
    } catch(e) {
      alert(e);
    } finally {
      d.remove();
      e2.remove();
      e1.remove();
    }
  };
  e3.remove();
  $('body').delegate("button.infoButton",'click',f);
  e2.append(d);
}).catch(e => alert(e));
})();
