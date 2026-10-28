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
    <SEO title={title} description={article?.answer || "Practical answers about property documents, mutation, IPC and BNS, and civil limitation periods."} canonical={article ? `/qa/${article.slug}` : "/qa"} robots={slug && !article ? "noindex, follow" : undefined} />
    <Header /><main className="ns-qa"><nav aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/qa">Q&amp;A</Link></nav>
      <p className="ns-qa-label">Free Resources · Q&amp;A</p><h1>{title}</h1>
      {article ? <article><p className="ns-qa-answer">{article.answer}</p>{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        <h2>Official sources</h2><ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul>
        <p><Link to={article.related.to}>{article.related.label} →</Link></p>
        <p className="ns-qa-note">General legal education, reviewed 28 October 2026. Requirements depend on the facts and applicable law. Obtain individual advice before acting or calculating a filing deadline.</p>
        <h2>More questions</h2><ul>{QA_ARTICLES.filter((item) => item.slug !== slug).map((item) => <li key={item.slug}><Link to={`/qa/${item.slug}`}>{item.title}</Link></li>)}</ul>
      </article> : <div className="ns-qa-list">{QA_ARTICLES.map((item) => <article key={item.slug}><h2><Link to={`/qa/${item.slug}`}>{item.title}</Link></h2><p>{item.answer}</p><Link to={`/qa/${item.slug}`}>Read the answer →</Link></article>)}</div>}
    </main><Footer /><style>{`
      .ns-qa{max-width:980px;margin:auto;padding:30px 22px 64px;color:#172640;line-height:1.8}.ns-qa nav{font-size:14px;margin-bottom:30px}.ns-qa a{color:#1d4ed8;overflow-wrap:anywhere}.ns-qa-label{color:#64748b;font-weight:700}.ns-qa h1{font-size:clamp(30px,4vw,46px);line-height:1.25}.ns-qa h2{font-size:24px;line-height:1.4;margin-top:30px}.ns-qa-answer{padding:22px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;font-size:18px}.ns-qa-list{display:grid;gap:22px}.ns-qa-list article{padding:24px;border:1px solid #e2e8f0;border-radius:14px}.ns-qa-list h2{margin-top:0}.ns-qa li{margin:10px 0}.ns-qa-note{color:#64748b;font-size:14px;border-top:1px solid #e2e8f0;padding-top:20px}
    `}</style>
  </>;
}
