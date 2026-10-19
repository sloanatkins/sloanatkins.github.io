// Builds each page from content.js. The track comes from <body data-track="...">.

(function () {
  const site = window.SITE;
  const trackKey = document.body.dataset.track || "all";
  const track = site.tracks[trackKey];
  const root = document.getElementById("app");

  // ── Helpers ──
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    }
    for (const child of children || []) if (child) node.appendChild(child);
    return node;
  }

  function linkRow(links, cls) {
    return el("p", { class: cls }, links.map(l =>
      el("a", { href: l.href, text: l.label, ...(l.href.startsWith("http") ? { rel: "noopener" } : {}) })
    ));
  }

  // ── Header ──
  const nav = el("nav", { class: "tracks", "aria-label": "Choose a view" },
    Object.entries(site.tracks).map(([key, t]) =>
      el("a", { href: t.path, text: t.tab, ...(key === trackKey ? { "aria-current": "page" } : {}) })
    )
  );

  const header = el("header", { class: "intro" }, [
    el("p", { class: "name", text: site.name }),
    el("h1", { text: track.headline }),
    el("p", { class: "lede", text: track.intro }),
    el("p", { class: "seeking", text: track.seeking }),
    el("p", { class: "certs", text: track.certs }),
    linkRow(site.links, "contact"),
    nav
  ]);

  // ── Projects ──
  function rail(stops) {
    return el("ol", { class: "rail", "aria-label": "Pipeline stages" },
      stops.map(s => el("li", {}, [el("span", { text: s })]))
    );
  }

  function project(key) {
    const p = site.projects[key];
    const summary = (p.angle && p.angle[trackKey]) || p.summary;
    return el("article", { class: "project", id: key }, [
      el("h2", { text: p.name }),
      el("p", { class: "question", text: p.question }),
      rail(p.rail),
      el("p", { class: "summary", text: summary }),
      el("ul", { class: "facts" }, p.facts.map(f => el("li", { text: f }))),
      p.image ? el("figure", {}, [
        el("img", { src: "/assets/img/" + p.image, alt: p.alt, loading: "lazy", width: "1400" })
      ]) : null,
      p.note ? el("p", { class: "note", text: p.note }) : null,
      p.links.length ? linkRow(p.links, "project-links") : null
    ]);
  }

  const projects = el("section", { class: "projects", "aria-label": "Projects" },
    track.projects.map(project));

  // ── Experience and tools ──
  const experience = el("section", { class: "experience" }, [
    el("h2", { text: "Experience" }),
    ...track.experience.map(k => {
      const e = site.experience[k];
      return el("div", { class: "job" }, [
        el("h3", { text: e.role }),
        el("p", { class: "where", text: e.where + ", " + e.when }),
        el("p", { text: e.what })
      ]);
    })
  ]);

  const tools = el("section", { class: "tools" }, [
    el("h2", { text: "Tools" }),
    el("dl", {}, track.tools.flatMap(k => [
      el("dt", { text: site.tools[k].name }),
      el("dd", { text: site.tools[k].items.join(", ") })
    ]))
  ]);

  const footer = el("footer", {}, [
    el("p", { text: site.school }),
    linkRow(site.links, "contact")
  ]);

  root.replaceChildren(header, projects, experience, tools, footer);
})();
