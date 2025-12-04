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
          <h1>DEPILAÇÃO, SOBRANCELHA, ESTÉTICA, CÍLIOS E FOTODEPILAÇÃO</h1>
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
    
    // 1. Encontra o intervalo de dias com base no método e crescimento do pelo
    const intervalRule = FREQUENCY_DATA.find(d => d.method === method && d.growth === growth);
    const days = intervalRule ? intervalRule.days : 25; // Padrão 25 dias

    // 2. Calcula a nova data de retorno
    const last = new Date(lastDate);
    if (!isNaN(last)) {
      const nextDate = new Date(last);
      nextDate.setDate(last.getDate() + days); // Adiciona os dias de intervalo
      
      // Formata a data de retorno (ex: 20 de Dezembro de 2025)
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

function Home() {
  return (
    <section className="stack">
      <Hero />
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
      <div className="cta-bar">
        <h3>Pronta para depilar sem ardor?</h3>
        <p>Reserve agora seu horário ou fale com nosso time clínico no chat.</p>
        <div className="hero-cta">
          <button className="btn btn-ghost" style={{ color: '#ff4f36' }}>Abrir chat</button>
          <button className="btn btn-primary" style={{ background: '#fff', color: '#ff6347' }} onClick={() => window.location.hash = '/autoajuda'}>Agendar consulta</button>
        </div>
      </div>
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



function Layout({ route, onNavigate, children }) {
  return (
    <div className="page">
      <div className="bg-shape"></div>
      <Nav route={route} onNavigate={onNavigate} />
      <main>{children}</main>
      <div className="footer">Depyla Glow • Cuidado integral para sua pele • Suporte 24/7</div>
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
