const { useState, useEffect, useMemo } = React;

const FREQUENCY_DATA = [
  { method: 'Cera Quente/Fria', growth: 'lento', days: 30 },
  { method: 'Cera Quente/Fria', growth: 'medio', days: 25 },
  { method: 'Cera Quente/Fria', growth: 'rapido', days: 20 },
  { method: 'Fotodepilação/IPL', growth: 'lento', days: 45 },
  { method: 'Fotodepilação/IPL', growth: 'medio', days: 30 },
  { method: 'Fotodepilação/IPL', growth: 'rapido', days: 25 },
  { method: 'Linha/Fio', growth: 'lento', days: 20 },
  { method: 'Linha/Fio', growth: 'medio', days: 15 },
  { method: 'Linha/Fio', growth: 'rapido', days: 10 },
  { method: 'Micropigmentação (Ajuste)', growth: 'padrao', days: 30 * 6 }, 
];

const tips = [
  { title: 'Tipos de pele', desc: 'Seca pede ceramidas + óleos leves; oleosa prefere gel calmante; mista combina texturas.' },
  { title: 'Hidratação', desc: 'Use sérum aquoso antes, finalize com calmante botânico (camomila + bisabolol).' },
  { title: 'Barreira', desc: 'Sem esfoliar 24h antes; após depilar use loção pH balanceado e roupas leves.' }
];

const products = [
  { name: 'Espuma Calmante Pré-Depyl', tag: 'pré-ritual', desc: 'Limpa sem ressecar, pH equilibrado e aminoácidos de seda.', note: 'Todos os tipos de pele.' },
  { name: 'Loção Pós Glow 24h', tag: 'pós-ritual', desc: 'Bisabolol, niacinamida e algas vermelhas para vermelhidão.', note: 'Textura leve e rápida absorção.' },
  { name: 'Oil-Lock Sérum', tag: 'equilíbrio', desc: 'Niacinamida + zinco para peles mistas/oleosas.', note: 'Ajuda a reduzir poros aparentes.' }
];

const faqs = [
  { q: 'Quanto tempo depois posso tomar sol?', a: 'Espere 48h, use protetor mineral e reaplique a cada 2h.' },
  { q: 'Posso esfoliar no mesmo dia?', a: 'Não. Aguarde 72h para evitar microfissuras e ardor.' },
  { q: 'Funciona para pele sensível?', a: 'Sim. Prefira sessões curtas, temperatura morna e finalize com calmante.' }
];

const values = [
  { title: 'Tecnologia gentil', desc: 'Temperatura controlada e pressão reduzida em áreas sensíveis.' },
  { title: 'Protocolos vivos', desc: 'Rituais ajustados por tipo de pele, sazonalidade e hábitos.' },
  { title: 'Conteúdo guiado', desc: 'Autoajuda para educar antes, durante e depois do procedimento.' }
];

const timeline = [
  { year: 'Dia 1', text: 'Consulta flash para mapear pele e rotina.' },
  { year: 'Dia 7', text: 'Ajustes pós-ritual e reeducação de barreira.' },
  { year: 'Dia 30', text: 'Revisão dos resultados e personalização de fórmula.' }
];

const highlights = [
  { title: 'Experiência gentil', desc: 'Temperatura controlada, fricção mínima e ativos calmantes em todas as sessões.' },
  { title: 'Personalização real', desc: 'Ritual ajustado por tipo de pele, sensibilidade e hidratação atual.' },
  { title: 'Suporte 7 dias', desc: 'Acompanhamento por chat para reduzir ardor, encravados e dúvidas pós-ritual.' }
];

const plans = [
  { name: 'Glow Session', price: 'R$129', includes: ['Consulta expressa', 'Ritual personalizado', 'Pós cuidado guiado (7 dias)'] },
  { name: 'Glow VIP', price: 'R$189', includes: ['Tudo da Glow Session', 'Boost calmante extra', 'Retorno prioritário em 15 dias'] },
  { name: 'Glow Home', price: 'Sob consulta', includes: ['Kit home enviado', 'Videochamada de suporte', 'Checklist de higienização'] }
];

const routineMap = {
  normal: { headline: 'Equilíbrio natural', focus: 'Manter barreira íntegra e brilho saudável.', steps: ['Limpeza suave antes', 'Sérum hidratante leve', 'Loção calmante pós-depilação'] },
  seca: { headline: 'Reposição intensa', focus: 'Evite água muito quente e prefira texturas cremosas.', steps: ['Hidratante rico em ceramidas', 'Óleo leve de semente de uva', 'Reaplicar calmante a cada 6h'] },
  oleosa: { headline: 'Controle + calma', focus: 'Zero álcool adstringente; prefira bases oil-free.', steps: ['Gel de limpeza gentil', 'Sérum de niacinamida 5%', 'Gel pós com aloe e zinco'] },
  sensivel: { headline: 'Foco antirresíduo', focus: 'Teste mecha; prefira ceras de baixa fusão e fricção mínima.', steps: ['Compressa fria 10 min', 'Bálsamo com bisabolol', 'Roupas respiráveis'] }
};

function useHashRoute() {
  const initial = () => {
    const raw = window.location.hash.replace('#', '');
    return raw && raw.startsWith('/') ? raw : '/';
  };
  const [route, setRoute] = useState(initial);
  useEffect(() => {
    const onHash = () => setRoute(initial());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function Nav({ route, onNavigate }) {
  const links = [
    { label: 'Início', path: '/' },
    { label: 'Autoajuda', path: '/autoajuda' },
    { label: 'Frequência', path: '/frequencia' },
    { label: 'Marca', path: '/marca' },
    { label: 'Apresentação', path: '/documentacao' }
  ];
  return (
    <div className="nav">
      <div className="brand">
        <div className="brand-mark">DG</div>
        <div>
          <h1>Depyla Glow</h1>
          <div className="tagline">Depilação inteligente e gentil</div>
        </div>
      </div>
      <div className="nav-links">
        {links.map(link => (
          <button
            key={link.path}
            className={`nav-link ${route === link.path ? 'active' : ''}`}
            onClick={() => onNavigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div>
        <h2>Depilação sem drama, só ciência e cuidado.</h2>
        <p>Consultas rápidas de pele, rituais guiados e fórmulas botânicas que respeitam sua barreira.</p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => window.location.hash = '/autoajuda'}>Começar avaliação</button>
          <button className="btn btn-ghost" onClick={() => window.location.hash = '/marca'}>Conhecer a marca</button>
        </div>
      </div>
    </section>
  );
}

function RoutineAdvisor({ form }) {
  const data = useMemo(() => {
    const base = routineMap[form.skinType] || routineMap.normal;
    const hydration = Number(form.hydration);
    const status = hydration > 70 ? 'hidratação alta — foque em selar a água' : hydration > 40 ? 'hidratação equilibrada — mantenha cuidados leves' : 'hidratação baixa — priorize camadas cremosas';
    const sensitivity = form.sensitivity === 'alta' ? 'Reduza fricção e prefira cera de baixa temperatura.' : form.sensitivity === 'média' ? 'Faça teste de toque em área pequena.' : 'Mantenha rotina e monitore sinais.';
    const goalLine = form.goal === 'hidratar' ? 'Inclua máscara calmante 2x/semana.' : form.goal === 'clarificar' ? 'Busque ativos como niacinamida + pantenol para uniformizar.' : 'Reduza atrito e evite perfumes fortes.';
    return { ...base, status, sensitivity, goalLine };
  }, [form]);

  return (
    <div className="routine">
      <div className="pill">Rotina sugerida</div>
      <strong>{data.headline}</strong>
      <p>{data.focus}</p>
      <div className="range-readout">
        <span>Hidratação: {form.hydration}%</span>
        <span>{data.status}</span>
      </div>
      <ul>
        {data.steps.map((step, idx) => <li key={idx}>{step}</li>)}
        <li>{data.sensitivity}</li>
        <li>{data.goalLine}</li>
      </ul>
    </div>
  );
}

function AutoHelp() {
  const [form, setForm] = useState({ skinType: 'normal', sensitivity: 'baixa', hydration: 55, goal: 'calmante' });
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <section className="stack">
      <div className="panel">
        <h3>Consulta de autoajuda</h3>
        <p>Entenda seu tipo de pele e receba um ritual personalizado para depilar com conforto.</p>
        <div className="grid two">
          <div className="card">
            <strong>Seu perfil</strong>
            <div className="form">
              <div>
                <label>Tipo de pele</label>
                <select value={form.skinType} onChange={e => update('skinType', e.target.value)}>
                  <option value="normal">Normal</option>
                  <option value="seca">Seca</option>
                  <option value="oleosa">Oleosa</option>
                  <option value="sensivel">Sensível</option>
                </select>
              </div>
              <div>
                <label>Sensibilidade</label>
                <select value={form.sensitivity} onChange={e => update('sensitivity', e.target.value)}>
                  <option value="baixa">Baixa</option>
                  <option value="média">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div>
                <label>Nível de hidratação</label>
                <input type="range" min="0" max="100" value={form.hydration} onChange={e => update('hydration', e.target.value)} />
                <div className="range-readout">
                  <span>0</span><span>{form.hydration}%</span><span>100</span>
                </div>
              </div>
              <div>
                <label>Meta</label>
                <select value={form.goal} onChange={e => update('goal', e.target.value)}>
                  <option value="calmante">Reduzir vermelhidão</option>
                  <option value="hidratar">Hidratar profundamente</option>
                  <option value="clarificar">Uniformizar</option>
                </select>
              </div>
            </div>
          </div>
          <RoutineAdvisor form={form} />
        </div>
      </div>

      <div className="panel">
        <h3>Roteiro rápido</h3>
        <div className="grid two">
          {tips.map((item, idx) => (
            <div className="card" key={idx}>
              <div className="pill">Passo {idx + 1}</div>
              <strong>{item.title}</strong>
              <p className="muted" style={{ margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>FAQ imediato</h3>
        <div className="faq">
          {faqs.map((f, idx) => (
            <div className="qa" key={idx}>
              <strong>{f.q}</strong>
              <p className="muted" style={{ margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function FrequencyCalc() {
  const [form, setForm] = useState({ method: 'Cera Quente/Fria', growth: 'medio', lastDate: new Date().toISOString().substring(0, 10) });
  const [returnDate, setReturnDate] = useState(null);
  
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    const { method, growth, lastDate } = form;
    
    const intervalRule = FREQUENCY_DATA.find(d => d.method === method && d.growth === growth);
    const days = intervalRule ? intervalRule.days : 25; 
    const last = new Date(lastDate);
    if (!isNaN(last)) {
      const nextDate = new Date(last);
      nextDate.setDate(last.getDate() + days);
      
    
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setReturnDate(nextDate.toLocaleDateString('pt-BR', options));
    }
  }, [form]);

return (
    <section className="stack">
      <div className="panel">
        <h3>Calculadora de Frequência de Retorno</h3>
        <p>Preencha os dados e descubra a data ideal para o seu próximo agendamento, garantindo o melhor resultado e conforto.</p>
        <div className="grid two">
          <div className="card">
            <strong>Seu Histórico</strong>
            <div className="form">
              <div>
                <label>Método utilizado</label>
                <select value={form.method} onChange={e => update('method', e.target.value)}>
                  <option value="Cera Quente/Fria">Cera Quente/Fria</option>
                  <option value="Fotodepilação/IPL">Fotodepilação/IPL</option>
                  <option value="Linha/Fio">Linha/Fio (Facial)</option>
                  <option value="Micropigmentação (Ajuste)">Micropigmentação (Ajuste)</option>
                </select>
              </div>
              <div>
                <label>Velocidade de crescimento</label>
                <select value={form.growth} onChange={e => update('growth', e.target.value)}>
                  <option value="rapido">Rápido (Pelos grossos)</option>
                  <option value="medio">Médio (Padrão)</option>
                  <option value="lento">Lento (Pelos finos)</option>
                </select>
              </div>
              <div>
                <label>Data da última sessão</label>
                <input type="date" value={form.lastDate} onChange={e => update('lastDate', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="routine">
            <div className="pill">Retorno Sugerido</div>
            {returnDate ? (
              <div>
  <p>A data ideal para a sua próxima sessão é:</p>
  <h1 style={{ color: 'var(--accent)', fontSize: '1.8rem', margin: '0 0 10px' }}>
    {returnDate}
  </h1>
  <p>Agendar na data correta garante a eficácia total...</p>
  <button className="btn btn-primary" onClick={() => window.location.hash = '/documentacao'}>
    Agendar Agora
  </button>
</div>

            ) : (
              <p>Preencha a data da última sessão para calcular seu retorno ideal.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [zoomedImg, setZoomedImg] = useState(null);

  const services = [
    { title: "Depilação Cera Morna", desc: "Conforto e técnica exclusiva para uma pele lisa e saudável.", img: "./img/servico-1.jpg" },
    { title: "Design de Sobrancelha", desc: "Visagismo aplicado para realçar a harmonia do seu olhar.", img: "./img/servico-2.jpg" },
    { title: "Extensão de Cílios", desc: "Volume e curvatura na medida certa para o seu estilo.", img: "./img/servico-3.jpg" },
    { title: "Fotodepilação Avançada", desc: "Tecnologia de luz pulsada para redução duradoura dos pelos.", img: "./img/servico-4.jpg" }
  ];

  const galleryImages = [
    "./img/servico-5.jpg",
    "./img/servico-6.jpg",
    "./img/servico-7.jpg",
    "./img/servico-8.jpg",
    "./img/servico-9.jpg"
  ];

  return (
    <section className="services-section">
      <div className="services-overlay"></div>
      <div className="services-content">
        
        <h2 className="section-title">Experiência Depyla Glow</h2>

        {}
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              <img src={s.img} alt={s.title} className="leaf-shape" />
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <a href="#/documentacao" className="btn-outline">Saiba mais</a>
            </div>
          ))}
        </div>

        {}
        <div className="gallery-strip">
          {galleryImages.map((img, i) => (
            <div 
              className="gallery-item" 
              key={i} 
              onClick={() => setZoomedImg(img)} 
            >
              <img src={img} alt="Clique para ampliar" />
            </div>
          ))}
        </div>

      </div>

      {}
      {zoomedImg && (
        <div className="lightbox-overlay" onClick={() => setZoomedImg(null)}>
          <img src={zoomedImg} className="lightbox-img" alt="Zoom" />
        </div>
      )}

    </section>
  );
}

function Home() {
  return (
    <section className="stack">
      <Hero />
      
      {}
      <div className="panel">
        <h3>Por que Depyla Glow?</h3>
        <p>Mapeamos sua pele, ajustamos temperatura, textura e pós-cuidado para evitar ardor e pelos encravados.</p>
        <div className="badges">
          <span className="badge">Vegano</span>
          <span className="badge">Cruelty free</span>
          <span className="badge">pH balanceado</span>
          <span className="badge">Suporte 24h</span>
        </div>
      </div>
      
      <div className="panel">
        <h3>Linha de produtos</h3>
        <div className="products">
          {products.map((p, idx) => (
            <div className="product" key={idx}>
              <span className="tag">{p.tag}</span>
              <strong>{p.name}</strong>
              <p className="muted" style={{ margin: 0 }}>{p.desc}</p>
              <span className="pill">{p.note}</span>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="cta-bar">
        <h3>Pronta para depilar sem ardor?</h3>
        <p>Reserve agora seu horário ou fale com nosso time clínico no chat.</p>
        <div className="hero-cta">
          <button className="btn btn-ghost" style={{ color: '#059669' }}>Abrir chat</button>
          <button className="btn btn-primary" style={{ background: '#fff', color: '#059669' }} onClick={() => window.location.hash = '/autoajuda'}>Agendar consulta</button>
        </div>
      </div>

      {}
      <ServicesSection />

    </section>
  );
}

function About() {
  return (
    <section className="stack">
      <div className="panel">
        <h3>Marca Depyla Glow</h3>
        <p>Nascemos em clínicas de depilação para trazer protocolos personalizados. Formulações botânicas, tecnologia de baixa temperatura e acompanhamento pós-ritual por 7 dias.</p>
        <div className="badge-row">
          <span className="badge">Consultoria remota</span>
          <span className="badge">Temperatura inteligente</span>
          <span className="badge">Protocolos autorais</span>
        </div>
      </div>
      <div className="panel">
        <h3>Valores</h3>
        <ul className="info-list">
          {values.map((v, idx) => (
            <li key={idx}>
              <strong>{v.title}</strong>
              <span className="muted">{v.desc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="panel">
        <h3>Linha do tempo do cuidado</h3>
        <div className="grid two">
          {timeline.map((item, idx) => (
            <div className="card" key={idx}>
              <div className="pill">{item.year}</div>
              <p style={{ margin: 0 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="panel">
        <h3>FAQ de marca</h3>
        <div className="faq">
          <div className="qa">
            <strong>Quais ativos usamos?</strong>
            <p className="muted" style={{ margin: 0 }}>Botânicos calmantes (camomila, bisabolol) e estabilizadores de barreira (niacinamida, ceramidas).</p>
          </div>
          <div className="qa">
            <strong>Como garantimos conforto?</strong>
            <p className="muted" style={{ margin: 0 }}>Protocolos de temperatura morna, fricção mínima e pós-cuidado guiado por 7 dias.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DocsPage() {
  const [booking, setBooking] = useState({ name: '', contact: '', slot: 'manha' });
  const update = (key, value) => setBooking(prev => ({ ...prev, [key]: value }));
  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Recebemos seu interesse, ${booking.name || 'cliente'}! Responderemos em até 15 minutos úteis para o contato informado.`);
  };

  return (
    <section className="stack">
      <div className="panel">
        <h3>Apresentação comercial</h3>
        <p>Mostre a essência da Depyla Glow para fechar sessões e parcerias.</p>
        <ul className="info-list">
          {highlights.map((h, idx) => (
            <li key={idx}>
              <strong>{h.title}</strong>
              <span className="muted">{h.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel">
        <h3>Planos e benefícios</h3>
        <div className="products">
          {plans.map((p, idx) => (
            <div className="product" key={idx}>
              <span className="tag">{p.price}</span>
              <strong>{p.name}</strong>
              <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
                {p.includes.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <span className="pill">Agende e personalize</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Agende seu horário</h3>
        <p className="muted">Preencha e retornamos em até 15 minutos úteis. Preferências ajudam a preparar a cabine ideal.</p>
        <form className="form" onSubmit={onSubmit}>
          <div>
            <label>Nome</label>
            <input
              type="text"
              value={booking.name}
              onChange={e => update('name', e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
          <div>
            <label>Contato</label>
            <input
              type="text"
              value={booking.contact}
              onChange={e => update('contact', e.target.value)}
              placeholder="WhatsApp ou email"
              required
            />
          </div>
          <div>
            <label>Melhor horário</label>
            <select value={booking.slot} onChange={e => update('slot', e.target.value)}>
              <option value="manha">Manhã</option>
              <option value="tarde">Tarde</option>
              <option value="noite">Noite</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Enviar interesse</button>
        </form>
        <div className="badges" style={{ marginTop: 10 }}>
          <a className="badge" href="tel:+550800000000">Ligar agora</a>
          <a className="badge" href="mailto:contato@depyla.glow">contato@depyla.glow</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const IconFace = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
  const IconWhats = () => <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;
  const IconMail = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
  const IconInsta = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-left">
            <h2 className="footer-headline">
              Entre em <br/>
              <span style={{color: '#fff'}}>contato</span> <br/>
              com a gente
            </h2>
            <p className="footer-subtext">Estamos prontos para te atender.</p>
            <div className="footer-social-row">
              <a href="mailto:contato@dpylar.com" className="social-btn" title="E-mail"><IconMail /></a>
              <a href="https://wa.me/5583999999999" className="social-btn" title="WhatsApp"><IconWhats /></a>
              <a href="https://instagram.com/dpylar" className="social-btn" title="Instagram"><IconInsta /></a>
              <a href="https://facebook.com/dpylar" className="social-btn" title="Facebook"><IconFace /></a>
            </div>
          </div>
          <div className="footer-right">
            <div className="map-container">
              <iframe 
                src="https://maps.google.com/maps?q=Av.+Plínio+Lemos+195F,+Malvinas+Campina+Grande+-+PB&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Mapa Depyla Glow"
              ></iframe>
              <div className="map-overlay-label">
                <strong>Depyla Glow Estética</strong>
                <small>Ver no mapa ampliado</small>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <span>© 2025 Depyla Glow Estética - Todos os direitos reservados.</span>
          <div className="legal-links">
            <a href="#">Política de Privacidade</a>
            <span>•</span>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


function Layout({ route, onNavigate, children }) {
  return (
    <div className="page">
      <div className="bg-shape"></div>
      <Nav route={route} onNavigate={onNavigate} />
      <main style={{ minHeight: '60vh' }}>{children}</main>
      <Footer /> {}
    </div>
  );
}
 
function App() {
  const route = useHashRoute();
  const navigate = (path) => { window.location.hash = path; };
  const routes = {
    '/': <Home />,
    '/autoajuda': <AutoHelp />,
    '/frequencia': <FrequencyCalc />,
    '/marca': <About />,
    '/documentacao': <DocsPage />
  };
  const current = routes[route] || routes['/'];
  return <Layout route={route} onNavigate={navigate}>{current}</Layout>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
