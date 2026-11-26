const CONTACT_EMAIL = 'tapiwanashegeja471@gmail.com';
// Reservations are sent straight to this inbox through FormSubmit (free, works on GitHub Pages).
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

// ---------- Content ----------
const A = 'images/accommodation/accommodation-', V = 'images/activities/activity-', N = 'images/animals/animal-';
const stays = [
  ['Thatched lake suite', 'Round thatched room with a canopy bed, mosquito net and hand-carved wooden furniture.', '01'],
  ['Lakeside lodge & pool', 'Stone-and-thatch lodge with a pool and sundeck looking out over the lake at sunset.', '02'],
  ['Comfortable beds', 'Crisp white linen, soft cushions and a warm lamp glow beneath the net.', '03'],
  ['Room with a view', 'Netted bed, big windows and bush views, with the lake just outside.', '04'],
  ['A peninsula retreat', 'The lodge from above: a green headland surrounded by the deep blue water.', '05']
].map(([t, d, n]) => ({ title: t, text: d, src: A + n + '.jpg', tag: 'ACCOMMODATION' }));

const things = [
  ['Sunset houseboat cruise', 'Drift across the lake at golden hour on a multi-deck houseboat.', '01'],
  ['Horse riding', 'Saddle up for a gentle ride along the shore and through the bush.', '02'],
  ['Kayaking', 'Paddle the calm shallows at your own pace, straight from the lodge lawn.', '03'],
  ['Beach volleyball', 'Sand, sun and friendly games on the lakeshore. Great for groups.', '04'],
  ['Elephant encounter', 'Meet Africa\u2019s largest land animal on a guided visit.', '05'],
  ['Game drives', 'Ride in an open safari vehicle and stop to watch the shoreline at dusk.', '06']
].map(([t, d, n]) => ({ title: t, text: d, src: V + n + '.jpg', tag: 'ACTIVITY' }));

const animals = [
  ['Plains zebra', 'Plains game', 'Zebras splash through shallow water together.'],
  ['Greater kudu', 'Plains game', 'A spiral-horned antelope of woodland and open bush.'],
  ['Sable antelope', 'Plains game', 'Long, sweeping horns make sable a favourite sighting.'],
  ['Eland', 'Plains game', 'The largest antelope in Africa, often with birds in attendance.'],
  ['Lilac-breasted roller', 'Birds & water', 'One of Africa\u2019s most colourful birds.'],
  ['Southern ground hornbill', 'Birds & water', 'A large, endangered bird that walks the grasslands.'],
  ['Nile crocodile', 'Birds & water', 'Sunning on sandbanks and shorelines.'],
  ['Warthog', 'Plains game', 'Tusked, tough and always entertaining to watch.'],
  ['African fish eagle', 'Birds & water', 'Its call is the sound of the Zambezi.'],
  ['Cheetah', 'Predators', 'The fastest land animal, built for the chase.'],
  ['African wild dog', 'Predators', 'A rare, highly social hunter with one-of-a-kind markings.'],
  ['Spotted hyena', 'Predators', 'Clever, powerful and most active at night.'],
  ['Impala', 'Plains game', 'Graceful, abundant and quick to leap away.'],
  ['Hippopotamus', 'Birds & water', 'Spends the day in the water and comes out at night to graze.'],
  ['Wildebeest', 'Plains game', 'Herds move together across open grassland.'],
  ['Rhino', 'Big Five', 'A grazer with a famously thick hide, here with an egret on its back.'],
  ['Cape buffalo', 'Big Five', 'Powerful, heavily horned and usually found in herds.'],
  ['Rhino and calf', 'Big Five', 'A mother stays close to her calf.'],
  ['Lion', 'Big Five', 'The king of the savanna, most active at dawn and dusk.'],
  ['African elephant', 'Big Five', 'Zimbabwe is home to some of the biggest herds on the continent.'],
  ['Leopard', 'Big Five', 'Elusive and mostly nocturnal, often resting up in trees.']
].map(([t, c, d], i) => ({ title: t, tag: c, text: d, src: N + String(i + 1).padStart(2, '0') + '.jpg' }));

// ---------- Rendering ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const card = (x) => `<article class="card"><button class="ph" data-lb data-title="${x.title}" data-text="${x.text}" data-src="${x.src}" aria-label="Enlarge photo: ${x.title}"><img src="${x.src}" alt="${x.title}"></button><div class="body"><small>${x.tag}</small><h3>${x.title}</h3><p>${x.text}</p><button class="mini reserve" data-dest="${x.title}">Reserve a place \u2197</button></div></article>`;
$('#acc-grid').innerHTML = stays.map(card).join('');
$('#act-grid').innerHTML = things.map(card).join('');

const wall = $('#animal-grid'), chips = $('.chips');
wall.innerHTML = animals.map(a => `<button class="shot" data-lb data-cat="${a.tag}" data-title="${a.title}" data-text="${a.text}" data-src="${a.src}" aria-label="Enlarge photo: ${a.title}"><img src="${a.src}" alt="${a.title}"><span><small>${a.tag.toUpperCase()}</small>${a.title}</span></button>`).join('');
['All', ...new Set(animals.map(a => a.tag))].forEach(c => {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = c;
  b.onclick = () => {
    $$('.shot', wall).forEach(s => s.hidden = c !== 'All' && s.dataset.cat !== c);
    $$('button', chips).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  };
  chips.append(b);
});
chips.firstChild.click();

// ---------- Tabs (hash routing: #home, #accommodation, #activities, #animals) ----------
const panels = $$('.panel'), links = $$('nav a'), names = { home: 'Home', accommodation: 'Accommodation', activities: 'Activities', animals: 'Animals' };
function route() {
  let id = location.hash.slice(1);
  if (!names[id]) id = 'home';
  panels.forEach(p => p.classList.toggle('on', p.id === id));
  links.forEach(a => a.hash === '#' + id ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  document.title = (id === 'home' ? 'Discover Binga' : names[id] + ' | Discover Binga') + ' | Lake Kariba, Zimbabwe';
  window.scrollTo(0, 0);
}
addEventListener('hashchange', route); route();

// ---------- Photo viewer ----------
const lb = $('#lightbox'), lbImg = $('img', lb), lbCap = $('figcaption', lb);
const lbFull = document.createElement('a'); lbFull.className = 'lb-full'; lbFull.target = '_blank'; lbFull.rel = 'noopener'; lbFull.textContent = 'Open full-size photo \u2197'; $('figure', lb).append(lbFull);
let set = [], at = 0;
function showPhoto(i) {
  at = (i + set.length) % set.length; const d = set[at].dataset;
  lbImg.src = d.src; lbImg.alt = d.title; lbFull.href = d.src; lbCap.innerHTML = ''; lbCap.append(d.title);
  const s = document.createElement('small'); s.textContent = d.text; lbCap.append(s);
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-lb]');
  if (t) { set = $$('[data-lb]', t.closest('.panel')).filter(x => !x.hidden); showPhoto(set.indexOf(t)); lb.showModal(); }
});
$('.lb-close', lb).onclick = () => lb.close();
$('.prev', lb).onclick = () => showPhoto(at - 1);
$('.next', lb).onclick = () => showPhoto(at + 1);
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') showPhoto(at - 1); if (e.key === 'ArrowRight') showPhoto(at + 1); });

// ---------- Reservation form ----------
const dests = [...stays, ...things].map(x => x.title), dlg = $('#reserve'), form = $('#rform');
form.elements.dest.innerHTML = '<option value="">Choose a stay or activity</option>' + dests.map(d => `<option>${d}</option>`).join('');
form.elements.date.min = new Date().toISOString().split('T')[0];
let opener = null;
document.addEventListener('click', e => {
  const b = e.target.closest('.reserve');
  if (b) { opener = b; form.elements.dest.value = dests.includes(b.dataset.dest) ? b.dataset.dest : ''; dlg.showModal(); }
});
$('.close', dlg).onclick = () => dlg.close();
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener('close', () => opener && opener.focus());
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const f = new FormData(form), btn = $('button[type=submit]', form), fine = $('.fine', form), label = btn.textContent;
  const data = {
    _subject: 'Reservation request: ' + f.get('dest'),
    _replyto: f.get('email'), _template: 'table', _captcha: 'false',
    'Stay/activity': f.get('dest'), Name: f.get('name'), Email: f.get('email'),
    'Preferred date': f.get('date'), Guests: f.get('guests'), Notes: f.get('notes') || '-'
  };
  btn.disabled = true; btn.textContent = 'SENDING...';
  try {
    const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
    const j = await r.json();
    if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'Send failed');
    form.reset(); form.elements.guests.value = 2;
    fine.textContent = 'Thank you! Your request has been sent. The host will reply by email. Nothing is booked until confirmed.';
    setTimeout(() => { dlg.close(); fine.textContent = fineText; }, 3500);
  } catch (err) {
    // Fallback: open the visitor's email app, addressed to the same inbox
    const body = Object.entries(data).filter(([k]) => k[0] !== '_').map(([k, v]) => k + ': ' + v).join('\n');
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(body)}`;
  } finally { btn.disabled = false; btn.textContent = label; }
});
const fineText = $('.fine', form).textContent;
