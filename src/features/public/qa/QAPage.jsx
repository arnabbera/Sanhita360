import { Link, useParams } from "react-router-dom";
import Header from "../../home/components/Header";
import Footer from "../../home/components/Footer";
import SEO from "../../../shared/seo/SEO";
import { QA_ARTICLES } from "./qaArticles";

export default function QAPage() {
  const { slug } = useParams();
  const article = QA_ARTICLES.find((item) => item.slug === slug);
  const title = article?.title || (slug ? "Question not found" : "Legal Q&A");
  return <>
    <SEO title={title} description={article?.answer || "Practical answers about property documents, mutation, IPC and BNS, and civil limitation periods."} image={article?.image} canonical={article ? `/qa/${article.slug}` : "/qa"} robots={slug && !article ? "noindex, follow" : undefined} />
    <Header /><main className="ns-qa"><nav aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/qa">Q&amp;A</Link></nav>
      <p className="ns-qa-label">Free Resources · Q&amp;A</p><h1>{title}</h1>
      {article ? <article><img className="ns-qa-banner" src={article.image} alt={article.title} width="1200" height="675" /><p className="ns-qa-answer">{article.answer}</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        <h2>Official sources</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>
        <p><Link to={article.related.to}>{article.related.label} →</Link></p>
        <p className="ns-qa-note">General legal education, reviewed 28 October 2026. Requirements depend on the facts and applicable law. Obtain individual advice before acting or calculating a filing deadline.</p>
        <h2>More questions</h2><ul>{QA_ARTICLES.filter((item) => item.slug !== slug).map((item) => <li key={item.slug}><Link to={`/qa/${item.slug}`}>{item.title}</Link></li>)}</ul>
      </article> : <div className="ns-qa-list">{QA_ARTICLES.map((item) => <article key={item.slug} className="ns-qa-card"><Link to={`/qa/${item.slug}`} className="ns-qa-card-image" tabIndex={-1} aria-hidden="true"><img src={item.image} alt="" loading="lazy" width="1200" height="675" /></Link><div className="ns-qa-card-body"><span className="ns-qa-category">{item.category}</span><h2><Link to={`/qa/${item.slug}`}>{item.title}</Link></h2><p>{item.answer}</p><Link className="ns-qa-read-more" to={`/qa/${item.slug}`}>Read Full Article →</Link></div></article>)}</div>}
    </main><Footer /><style>{`
      .ns-qa{max-width:1240px;margin:auto;padding:30px 22px 64px;color:#172640;line-height:1.8}.ns-qa nav{font-size:14px;margin-bottom:30px}.ns-qa a{color:#1d4ed8;overflow-wrap:anywhere}.ns-qa-label{color:#64748b;font-weight:700}.ns-qa h1{font-size:clamp(30px,4vw,46px);line-height:1.25}.ns-qa h2{font-size:24px;line-height:1.4;margin-top:30px}.ns-qa-answer{padding:22px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;font-size:18px}.ns-qa-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.ns-qa-card{display:flex;flex-direction:column;min-width:0;overflow:hidden;border:1px solid #e2e8f0;border-radius:16px;background:#fff;box-shadow:0 8px 25px #0f172a12;transition:transform .2s}.ns-qa-card:hover{transform:translateY(-4px)}.ns-qa-card-image{display:block;aspect-ratio:16/9;background:#0c2038}.ns-qa-card-image img{display:block;width:100%;height:100%;object-fit:cover}.ns-qa-card-body{display:flex;flex:1;flex-direction:column;padding:20px}.ns-qa-category{font-size:12px;color:#64748b;font-weight:600}.ns-qa-list h2{font-size:19px;margin:12px 0;line-height:1.4}.ns-qa-list h2 a{text-decoration:none;color:#0f172a}.ns-qa-card-body>p{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;color:#64748b;font-size:14px;line-height:1.65;margin:0 0 18px}.ns-qa-read-more{margin-top:auto;font-size:14px;font-weight:700;text-decoration:none}.ns-qa-banner{width:100%;height:auto;border-radius:14px}.ns-qa a:focus-visible{outline:3px solid #2563eb;outline-offset:4px}@media(max-width:850px){.ns-qa-list{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.ns-qa-list{grid-template-columns:1fr}}.ns-qa li{margin:10px 0}.ns-qa-note{color:#64748b;font-size:14px;border-top:1px solid #e2e8f0;padding-top:20px}
    `}</style>
  </>;
}
