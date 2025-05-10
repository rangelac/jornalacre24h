import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import JornalAcre24hLogo from "./assets/JornalAcre24hLogo.svg";

// Reuse images and configs from above
const heroImg = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800";
const sampleNewsImgs = [
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
];

const sections = [
  { key: "brasil", label: "BRASIL", color: "#bd1f32" },
  { key: "saopaulo", label: "SÃO PAULO", color: "#bd1f32" },
  { key: "df", label: "DISTRITO FEDERAL", color: "#bd1f32" },
  { key: "esportes", label: "ESPORTES", color: "#3ee9c3" },
  { key: "vida", label: "VIDA & ESTILO", color: "#d0a7a3" },
  { key: "saude", label: "SAÚDE & CIÊNCIA", color: "#3ec3e9" },
];
const sampleSectionNews = [
  {
    title: "Headline destaque desta editoria",
    img: sampleNewsImgs[0],
    summary: "Resumo curto da principal notícia sobre este tema.",
    id: 1,
  },
  {
    title: "Segunda notícia em destaque",
    img: sampleNewsImgs[1],
    summary: "Resumo de apoio para a matéria secundária nesta editoria.",
    id: 2,
  },
  {
    title: "Terceira curiosidade/atualização",
    img: sampleNewsImgs[2],
    summary: "Trecho destacando outra chamada de destaque na editoria.",
    id: 3,
  },
];
const columnists = [
  {
    name: "Igor Gadelha",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Mirelle Pinheiro",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Lilian Tahan",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Fabio Serapião",
    img: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    name: "Mario Sabino",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const tags = ["Política", "Cultura", "Esporte", "Tecnologia", "Mundo", "Economia", "Brasil"];

function TagFilters({ selected, onSelect }: { selected: string, onSelect: (tag: string) => void }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelect(tag)}
          className={`px-3 py-1 rounded-2xl border text-xs font-semibold transition ${selected===tag ? 'bg-[#0f66db] text-white border-[#0f66db]' : 'bg-white border-[#ddd] text-[#0f66db] hover:bg-[#e6f0fa]'}`}
        >{tag}</button>
      ))}
    </div>
  );
}

function Pagination({ page, max, onSet }: { page: number, max: number, onSet: (p: number) => void }) {
  return (
    <nav className="mt-8 flex justify-center gap-2">
      {[...Array(max).keys()].map(i => (
        <button
          key={i}
          className={`w-8 h-8 rounded font-bold ${i+1===page ? 'bg-[#0f66db] text-white' : 'bg-white border text-[#0f66db]'} transition`}
          onClick={() => onSet(i+1)}
        >{i+1}</button>
      ))}
      {page < max && (
        <button className="ml-4 px-4 py-1 text-[#0f66db] font-bold" onClick={()=>onSet(page+1)}>Próxima</button>
      )}
    </nav>
  );
}

function CategoryPage({ sectionKey }: { sectionKey: string }) {
  const section = sections.find(sec => sec.key === sectionKey) || sections[0];
  const navigate = useNavigate();

  // Simulate a larger list of news for pagination
  const allNews = [
    ...sampleSectionNews,
    ...sampleSectionNews.map((n, i) => ({
      ...n,
      id: n.id + 3,
      title: `${n.title} ${i + 4}`,
      img: sampleNewsImgs[(i + 1) % sampleNewsImgs.length],
      summary: `${n.summary} (extra)`,
    })),
    ...sampleSectionNews.map((n, i) => ({
      ...n,
      id: n.id + 6,
      title: `${n.title} ${i + 7}`,
      img: sampleNewsImgs[(i + 2) % sampleNewsImgs.length],
      summary: `${n.summary} (mais)`,
    })),
  ];

  // Tag filter state
  const [selectedTag, setSelectedTag] = useState("");
  // Pagination state
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Simulate tag filtering (for demo, filter by tag in title)
  const filteredNews = selectedTag
    ? allNews.filter(n => n.title.toLowerCase().includes(selectedTag.toLowerCase()))
    : allNews;

  // Pagination
  const maxPage = Math.ceil((filteredNews.length - 1) / perPage);

  // Featured article is always the first
  const featured = filteredNews[0];
  const paginated = filteredNews.slice(1 + (page - 1) * perPage, 1 + page * perPage);

  return (
    <div className="py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-3 rounded-lg" style={{ backgroundColor: section.color }} />
        <span className="uppercase font-black text-3xl tracking-wide" style={{ color: section.color }}>{section.label}</span>
      </div>
      <TagFilters selected={selectedTag} onSelect={tag => { setSelectedTag(tag === selectedTag ? "" : tag); setPage(1); }} />
      {/* Featured article */}
      {featured && (
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden flex flex-col md:flex-row hover:ring-2 hover:ring-[#0f66db] transition">
          <img src={featured.img} alt="" className="h-64 md:h-72 min-w-[320px] object-cover" />
          <div className="flex-1 p-5 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded font-bold bg-opacity-20" style={{background:section.color, color:section.color,fontSize:'0.8rem'}}>
              DESTAQUE
            </span>
            <h2 className="font-serif text-2xl md:text-4xl my-2 font-bold text-[#242424] leading-tight">
              {featured.title}
            </h2>
            <div className="flex gap-4 items-center text-xs text-[#888] mb-2">
              <span>Por Redação</span>
              <span>|</span>
              <span>13 maio 2025</span>
            </div>
            <p className="text-base text-[#444] mb-1">{featured.summary}</p>
            <Link className="mt-2 inline-block text-[#0f66db] hover:underline font-medium" to={`/noticia/${section.key}-${featured.id}`}>Leia matéria completa</Link>
          </div>
        </div>
      )}
      {/* Secondary articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {paginated.length === 0 && (
          <div className="col-span-3 text-[#aaa]">Nenhuma notícia encontrada para este filtro.</div>
        )}
        {paginated.map((item) => (
          <article key={item.id} className="bg-[#faf9f9] border border-[#eee] rounded-xl p-4 flex flex-col h-full hover:ring-2 hover:ring-[#0f66db] transition">
            <img src={item.img} alt="" className="h-32 w-full object-cover rounded mb-3" />
            <h3 className="font-semibold text-lg text-[#3c3a3a] mb-1">
              <Link to={`/noticia/${section.key}-${item.id}`} className="hover:text-[#0f66db] transition">{item.title}</Link>
            </h3>
            <div className="flex items-center gap-2 text-[0.83em] text-[#888] mb-2">
              <span>Por Redação</span>
              <span>|</span>
              <span>13 maio 2025</span>
            </div>
            <span className="text-xs text-[#888]">{item.summary}</span>
          </article>
        ))}
      </div>
      <Pagination page={page} max={maxPage} onSet={setPage} />
      <button
        className="mt-10 px-7 py-2 shadow font-bold bg-[#0f66db] text-white rounded hover:bg-blue-800"
        onClick={() => navigate("/")}
      >
        Voltar para a Home
      </button>
    </div>
  );
}

function ArticlePage() {
  // Normally would get article ID. Here, use static demo
  return (
    <div className="py-8 max-w-4xl mx-auto grid md:grid-cols-[2fr_1fr] gap-10">
      {/* Article main content */}
      <div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#2c2c2c] mb-2 leading-tight">Título de uma reportagem especial</h1>
        <div className="flex items-center flex-wrap gap-2 mb-4 text-xs text-[#9e9b9b]">
          <span className="px-2 py-1 bg-[#eff1fc] text-[#0f66db] rounded font-bold">Jornal Acre 24h</span>
          <span>Por <strong>Repórter Jornal Acre</strong></span>
          <span>|</span>
          <span>13 de maio de 2025</span>
        </div>
        <img src={heroImg} alt="Foto da notícia" className="w-full h-80 object-cover rounded-lg shadow mb-7" />
        <article className="text-xl text-[#232323] leading-relaxed">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac nunc in ipsum dictum suscipit. Morbi rutrum erat eget turpis tempus, vitae egestas lorem pharetra.</p>
          <p className="mt-5">Nullam cursus mattis risus, nec pretium ex viverra vel. Etiam lectus augue, tincidunt sed velit eu, placerat cursus augue.</p>
          <blockquote className="border-l-4 border-[#0f66db] pl-4 italic my-8 text-lg text-[#0f66db]">Destaque de uma frase impactante desta reportagem, trazendo maior contexto ao leitor e chamando atenção.</blockquote>
          <p className="mt-5">Maecenas dictum, justo ut convallis facilisis, nisl erat bibendum risus, a tincidunt ipsum enim at ligula.</p>
        </article>
        {/* Social/share buttons */}
        <div className="flex gap-2 mt-8">
          <button className="bg-[#0f66db] px-3 py-1 text-white rounded font-bold text-xs hover:bg-blue-800 transition">Compartilhar</button>
          <button className="bg-[#ececec] px-3 py-1 text-[#0f66db] rounded font-bold text-xs hover:bg-[#dbeafe] transition">WhatsApp</button>
        </div>
      </div>
      {/* Sidebar - Related news */}
      <aside className="max-w-xs">
        <h4 className="font-bold text-lg mb-3">Leia também</h4>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <Link to={`/noticia/relacionada-${i}`} className="block bg-[#fafafc] border border-[#dfdfdf] rounded-lg px-3 py-2 hover:border-[#0f66db] hover:shadow transition" key={`rel-${i}`}>
              <div className="font-semibold text-sm mb-1">Notícia relacionada #{i}</div>
              <div className="text-xs text-[#888]">Linha auxiliar para a matéria complementar.</div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="max-w-screen-xl mx-auto px-2 py-6">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col md:flex-row gap-6 pb-6 border-b border-[#ececec] mb-6">
        <img src={heroImg} alt="Notícia principal" className="w-full md:w-1/2 h-72 object-cover rounded-lg shadow" />
        <div className="flex flex-col justify-center md:w-1/2">
          <span className="uppercase text-[#bd1f32] font-bold text-xs mb-1">Destaque</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3c3a3a] leading-tight">
            Justiça libera compra do Banco Master pelo BRB
          </h1>
          <p className="text-[#3c3a3a] text-lg mt-3">O desembargador João Egmont revogou liminar que impedia conclusão da compra do Master. Leia mais detalhes sobre o processo e seus desdobramentos.</p>
          <ul className="flex flex-wrap gap-2 mt-5">
            <li>
              <Link to="/noticia/1" className="text-[#0f66db] hover:underline">Galípolo recebe Vorcaro para tratar venda</Link>
            </li>
            <li>
              <Link to="/noticia/2" className="text-[#0f66db] hover:underline">MPDFT pede destituição de conselheiro tutelar</Link>
            </li>
            <li>
              <Link to="/brasil" className="text-[#0f66db] hover:underline">Mais notícias</Link>
            </li>
          </ul>
        </div>
      </section>
      {/* COLUMNISTS ROW */}
      <section className="flex items-center gap-7 py-3 border-b border-[#eaeaea] overflow-x-auto mb-6">
        {columnists.map((col) => (
          <div key={col.name} className="flex flex-col items-center shrink-0 hover:bg-[#f3f8fd] rounded-lg px-2 py-1 transition">
            <img src={col.img} alt={col.name} className="w-16 h-16 rounded-full border-2 border-[#ececec] object-cover mb-1" />
            <span className="text-xs text-[#3c3a3a] font-semibold">{col.name}</span>
          </div>
        ))}
      </section>
      {/* INTERVALO - Featured Yellow Box */}
      <section className="mb-10">
        <div className="bg-[#cea846] rounded px-5 py-6">
          <h2 className="uppercase font-bold text-sm text-[#3c3a3a] tracking-widest">Intervalo</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-3">
            <div>
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" alt="Comentário ao vivo" className="rounded w-full h-40 object-cover mb-2" />
              <h3 className="font-bold text-lg text-[#3c3a3a]">Comentárista opina ao vivo após crítica viral</h3>
              <p className="text-sm text-[#544e1c]">Principais comentários do mundo do entretenimento e cultura pop em destaque.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="font-semibold text-[#3c3a3a]">Foto do dia</h4>
                <span className="text-xs text-[#544e1c]">Papa Leão convoca reunião histórica no Brasil.</span>
              </div>
              <div>
                <h4 className="font-semibold text-[#3c3a3a]">Vídeo viral</h4>
                <span className="text-xs text-[#544e1c]">Veja o momento em que o comentarista faz a análise inesperada ao vivo.</span>
              </div>
              <div>
                <h4 className="font-semibold text-[#3c3a3a]">Intervalo Rápido</h4>
                <span className="text-xs text-[#544e1c]">Notícias leves e rápidas para o seu dia.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION BLOCKS */}
      {sections.map((section) => (
        <section key={section.key} id={section.key} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-2 rounded" style={{ backgroundColor: section.color }} />
            <span className="uppercase font-bold text-base tracking-wider" style={{ color: section.color }}>{section.label}</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Featured news in section */}
            <article className="md:col-span-1 hover:ring-2 hover:ring-[#0f66db] transition">
              <img src={sampleSectionNews[0].img} alt="" className="h-48 w-full object-cover rounded mb-2" />
              <h2 className="font-semibold text-lg text-[#3c3a3a]">
                <Link to={`/${section.key}`} className="hover:text-[#0f66db] transition">{sampleSectionNews[0].title}</Link>
              </h2>
              <p className="text-sm text-[#555]">{sampleSectionNews[0].summary}</p>
            </article>
            {/* More news in section */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleSectionNews.slice(1).map((item) => (
                <article key={item.id} className="flex gap-2 items-center bg-white p-2 rounded shadow-sm hover:ring-2 hover:ring-[#0f66db] transition">
                  <img src={item.img} alt="" className="h-20 w-24 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-base text-[#3c3a3a]">
                      <Link to={`/${section.key}`} className="hover:text-[#0f66db] transition">{item.title}</Link>
                    </h3>
                    <span className="block text-xs text-[#888]">{item.summary}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
      {/* Latest News Block */}
      <section id="ultimas" className="mb-12">
        <h2 className="uppercase font-bold text-[#bd1f32] text-lg mb-2">Últimas Notícias</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={`ultimas-${i}`} className="bg-white p-3 rounded shadow-sm flex flex-col gap-2 hover:ring-2 hover:ring-[#0f66db] transition">
              <img src={sampleNewsImgs[i % 4]} className="h-28 w-full object-cover rounded mb-2" alt="Notícia" />
              <h3 className="font-semibold text-base text-[#3c3a3a]">
                <Link to={`/noticia/ultimas-${i}`} className="hover:text-[#0f66db] transition">{`Título de manchete rápida ${i}`}</Link>
              </h3>
              <span className="text-xs text-[#888]">{`Resumo ou detalhe do destaque ${i}.`}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SearchResultsPage({ query, onClose }: { query: string, onClose: () => void }) {
  // mock search - show articles with query in title
  const results = [...sampleSectionNews, ...sampleSectionNews].filter(
    a => a.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="max-w-screen-xl mx-auto px-2 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="font-bold text-lg text-[#0f66db]">Resultados para "{query}"</h2>
        <button onClick={onClose} className="text-[#bd1f32] px-3 py-1 rounded hover:underline text-xs font-semibold bg-[#f5ecec]">Fechar busca</button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {results.length === 0 && <div className="col-span-3 text-[#aaa]">Nenhuma notícia encontrada.</div>}
        {results.map((item) => (
          <article key={item.id} className="bg-white rounded-xl shadow p-3 flex flex-col hover:border-[#0f66db] border border-transparent transition">
            <img src={item.img} className="h-28 w-full object-cover rounded mb-2" alt={item.title} />
            <h3 className="font-semibold text-base text-[#3c3a3a]">{item.title}</h3>
            <span className="text-xs text-[#888]">{item.summary}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#faf9f9]">
      <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-2 border-b border-[#ededed]">
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={JornalAcre24hLogo} alt="Jornal Acre 24h logo" className="h-16 w-auto" />
          </Link>
          <nav className="hidden md:flex gap-4 font-medium text-[#3c3a3a] text-sm">
            <Link to="/" className="hover:text-[#0f66db]">Início</Link>
            {sections.map(s => (
              <Link key={s.key} to={`/${s.key}`} className="hover:text-[#0f66db]">{s.label.replace("&", "&")}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form
            className="relative"
            onSubmit={e => { e.preventDefault(); if(query.length) setSearchOpen(true); }}
          >
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-3 pr-9 py-1 border rounded text-sm bg-[#fafafc] focus:border-[#0f66db]"
            />
            <button type="submit" className="absolute top-1 right-1 px-1 text-[#0f66db]">
              <span role="img" aria-label="search">🔍</span>
            </button>
          </form>
        </div>
      </header>
      {searchOpen && (
        <SearchResultsPage query={query} onClose={() => setSearchOpen(false)} />
      )}
      {!searchOpen && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path=":sectionKey" element={<SectionRouteWrapper />} />
          <Route path="/noticia/:newsId" element={<ArticlePage />} />
        </Routes>
      )}
      <footer className="w-full bg-white border-t border-[#ededed] mt-8 text-center text-xs text-[#9e9b9b] py-4">
        © {new Date().getFullYear()} Jornal Acre 24h. Todos os direitos reservados.
      </footer>
    </div>
  );
}

function SectionRouteWrapper() {
  const { sectionKey } = useParams();
  if (!sectionKey || !sections.find(s => s.key === sectionKey)) {
    return <div className="p-8 text-center text-2xl text-[#bd1f32]">Seção não encontrada.</div>;
  }
  return <CategoryPage sectionKey={sectionKey} />;
}
