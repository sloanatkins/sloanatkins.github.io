// All the site's words live here. Edit this file to change any page.
// Each track page (/, /data/, /ml/, /software/) picks the projects,
// tools and experience it wants from the lists below.

window.SITE = {
  name: "Sloan Atkins",
  school: "CS + Mathematics at the University of Miami, graduating May 2027",
  links: [
    { label: "GitHub", href: "https://github.com/sloanatkins" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sloan-atkins/" },
    { label: "sloanatkins@gmail.com", href: "mailto:sloanatkins@gmail.com" }
  ],

  // ── Tracks ──
  tracks: {
    all: {
      path: "/",
      tab: "Overview",
      headline: "I build data pipelines and the systems around them.",
      intro:
        "Most of my work moves data from an API or a file into a warehouse, models it, and puts a dashboard on top that answers a specific question. I also build the services that keep those systems honest: monitoring, tests, retries, and CI.",
      seeking: "Looking for data engineering, analytics engineering, and data analyst roles after I graduate in May 2027.",
      certs: "Studying for the AWS Certified Data Engineer Associate (DEA-C01) and CompTIA Security+.",
      projects: ["retaillens", "macrolens", "stormstream", "modelwatch"],
      tools: ["languages", "data", "cloud", "analytics", "ml"],
      experience: ["iru", "research", "webdev"]
    },
    data: {
      path: "/data/",
      tab: "Data engineering",
      headline: "I build pipelines that turn raw data into answers.",
      intro:
        "I ingest from APIs, land raw files in S3, load them into a warehouse, model them with dbt, and schedule the whole thing with Airflow. Every project ends with a dashboard that answers a business question, and every load is checked before it lands.",
      seeking: "Looking for data engineering, analytics engineering, and data analyst roles, especially in finance.",
      certs: "Studying for the AWS Certified Data Engineer Associate (DEA-C01) and CompTIA Security+.",
      projects: ["retaillens", "macrolens", "stormstream", "modelwatch"],
      tools: ["languages", "data", "cloud", "analytics"],
      experience: ["iru", "research", "webdev"]
    },
    ml: {
      path: "/ml/",
      tab: "Machine learning",
      headline: "I work on what happens to a model after it ships.",
      intro:
        "I spent a year as a research assistant building ML pipelines for molecular data, and I build the infrastructure models depend on: serving, prediction logging, drift detection, and the data pipelines that feed them clean, tested inputs.",
      seeking: "Looking for ML engineering, MLOps, and data science roles after I graduate in May 2027.",
      certs: "Studying for the AWS Certified Data Engineer Associate (DEA-C01).",
      projects: ["modelwatch", "research", "retaillens", "macrolens"],
      tools: ["languages", "ml", "data", "cloud"],
      experience: ["research", "iru", "webdev"]
    },
    software: {
      path: "/software/",
      tab: "Software",
      headline: "I build backend services that hold up when things fail.",
      intro:
        "I write Python services with FastAPI, put them in containers, test them in CI, and design for the failure cases: duplicate messages, bad input, and a database that goes down. I also have three years of front-end work maintaining university web pages.",
      seeking: "Looking for software engineering and backend roles after I graduate in May 2027.",
      certs: "Studying for the AWS Certified Data Engineer Associate (DEA-C01) and CompTIA Security+.",
      projects: ["modelwatch", "stormstream", "macrolens", "recipe"],
      tools: ["languages", "backend", "cloud", "web"],
      experience: ["iru", "webdev", "research"]
    }
  },

  // ── Projects ──
  // `angle` swaps in a different summary on a given track.
  projects: {
    retaillens: {
      name: "RetailLens",
      question: "Which sellers, categories, and regions hurt customer reviews in a real e-commerce business?",
      summary:
        "An ELT analytics warehouse on the Olist dataset of 100,000+ real Brazilian orders. Raw files land in S3, load into Snowflake, and dbt models them into a star schema that feeds a Streamlit dashboard and a Tableau dashboard.",
      angle: {
        ml: "The modeling work an ML team depends on: 100,000+ real orders cleaned, joined, and tested in Snowflake with dbt, ending in a star schema with customer lifetime value and cohort features ready to use."
      },
      rail: ["Kaggle", "S3", "Snowflake", "dbt", "Streamlit"],
      facts: [
        "16 dbt models in staging, intermediate, and mart layers, with 53 tests passing",
        "30 checks run on all 9 source tables before anything loads into Snowflake",
        "Found that review scores drop from 4.23 for early deliveries to 1.70 for orders 8 or more days late"
      ],
      image: "retaillens.webp",
      alt: "Seller scorecard: a scatter plot of average review score against average delivery delay for 429 sellers",
      links: [
        { label: "Code on GitHub", href: "https://github.com/sloanatkins/retaillens" },
        { label: "Tableau dashboard", href: "https://public.tableau.com/app/profile/sloan.atkins/viz/RetailLensOlistDeliveryDashboard/RetailLensOlistDeliveryDashboard" }
      ]
    },
    macrolens: {
      name: "MacroLens",
      question: "Which S&P 500 sectors do better or worse depending on what the Fed is doing?",
      summary:
        "A batch pipeline that joins daily prices for 11 sector ETFs with 5 FRED economic indicators, labels each trading day with a macro regime, and shows how each sector performed under each regime.",
      angle: {
        software:
          "A scheduled batch pipeline built to run without supervision: an Airflow DAG with retries, a validation step that logs every check, unit tests in CI, and a Docker setup that seeds the database on first start."
      },
      rail: ["Alpha Vantage + FRED", "Validation", "PostgreSQL", "dbt", "Streamlit"],
      facts: [
        "Runs every weekday at 6am through Airflow with 2 retries per task",
        "Row count, null, and range checks are logged to a validation table before loading",
        "Second dashboard in Power BI built on the same dbt mart table"
      ],
      image: "macrolens.webp",
      alt: "30-day rolling average return by sector, December 2025 through May 2026",
      links: [{ label: "Code on GitHub", href: "https://github.com/sloanatkins/macrolens" }]
    },
    stormstream: {
      name: "StormStream",
      question: "What does a streaming pipeline need to stay correct when messages repeat, arrive late, or break?",
      summary:
        "A real-time pipeline for U.S. weather alerts. A poller sends only new, changed, and expired alerts from the National Weather Service into Kafka, Spark Structured Streaming processes them, and a live dashboard reads the results from Postgres.",
      angle: {
        software:
          "A streaming system designed around its failure cases. Every write is an upsert so replays are safe, bad messages go to a dead letter table with a reason, database writes retry with backoff, and a heartbeat shows on the dashboard when the Spark job stops."
      },
      rail: ["NWS API", "Poller", "Kafka", "Spark", "Postgres", "Streamlit"],
      facts: [
        "Three Spark queries on one topic: raw alerts, 5-minute tumbling counts, and 15-minute sliding counts",
        "10-minute watermark drops duplicate deliveries so window counts do not double",
        "30 tests and a 9-check smoke test, run in GitHub Actions on every push"
      ],
      image: "stormstream.webp",
      alt: "Map of the United States colored by number of active weather alerts per state",
      links: [{ label: "Code on GitHub", href: "https://github.com/sloanatkins/stormstream" }]
    },
    modelwatch: {
      name: "ModelWatch",
      question: "Is a deployed model still seeing the kind of data it was trained on?",
      summary:
        "An ML monitoring system for a fraud model. A FastAPI service serves predictions and logs every request to PostgreSQL, a scheduler compares live inputs against training baselines, and a dashboard shows which features are drifting.",
      angle: {
        data: "A monitoring pipeline for a deployed model. Every prediction is logged to PostgreSQL with its inputs, version, and latency, and a scheduled job compares live feature distributions to training baselines.",
        software:
          "A four-service app that starts with one docker-compose command: a FastAPI prediction API, PostgreSQL, an MLflow model registry, and a monitoring scheduler, with lint and tests in GitHub Actions."
      },
      rail: ["MLflow", "FastAPI", "PostgreSQL", "KS + PSI checks", "Streamlit"],
      facts: [
        "Drift measured per feature with the Kolmogorov-Smirnov test and Population Stability Index",
        "A simulator sends 600 predictions in three phases: baseline, gradual drift, and significant drift",
        "Endpoints for prediction, drift checks, and health, documented with OpenAPI"
      ],
      image: "modelwatch.webp",
      alt: "KS statistic and PSI score for each model feature compared to an alert threshold",
      links: [{ label: "Code on GitHub", href: "https://github.com/sloanatkins/modelwatch" }]
    },
    research: {
      name: "Molecular ML research",
      question: "How do you train useful models on chemical data that is small and badly imbalanced?",
      summary:
        "As a research assistant at the University of Miami, I built ML pipelines to study chemical reactivity: feature analysis, clustering, and dimensionality reduction on computational datasets, plus predictive models using neural networks and genetic algorithms.",
      rail: ["Molecular data", "Balancing", "Features + PCA", "Models", "Evaluation"],
      facts: [
        "Built a data balancing tool with configurable bin capping and SMOTE oversampling",
        "Replaced a rank-based quality filter with a hard score cutoff",
        "Turned the lab's notebook workflow into a standalone script that shows the data before asking for a strategy"
      ],
      note: "The code is part of a lab codebase and is not public.",
      links: []
    },
    recipe: {
      name: "Recipe Book",
      question: "Can my family's recipes live somewhere better than a stack of index cards?",
      summary:
        "A recipe manager built on Firebase. Users sign in, then create, edit, sort, and filter their own recipes, which are stored in Firestore and stay in sync across sessions.",
      rail: ["Firebase Auth", "Firestore", "JavaScript UI", "Firebase Hosting"],
      facts: [
        "Per-user data with Firebase Authentication",
        "Drag-and-drop ordering, filtering, and sorting",
        "Deployed and live on Firebase Hosting"
      ],
      links: [
        { label: "Code on GitHub", href: "https://github.com/sloanatkins/recipe-book-web-app" },
        { label: "Live app", href: "https://recipe-book-e3d63.web.app" }
      ]
    }
  },

  // ── Tools ──
  tools: {
    languages: { name: "Languages", items: ["Python", "SQL", "Java", "JavaScript", "C", "C++"] },
    data: { name: "Data engineering", items: ["dbt", "Airflow", "Kafka", "PySpark", "Snowflake", "PostgreSQL"] },
    cloud: { name: "Cloud and DevOps", items: ["AWS S3", "Docker", "GitHub Actions", "Linux", "Git"] },
    analytics: { name: "Analytics and BI", items: ["pandas", "Streamlit", "Plotly", "Tableau", "Power BI"] },
    ml: { name: "Machine learning", items: ["scikit-learn", "PyTorch", "NumPy", "MLflow", "SciPy"] },
    backend: { name: "Backend", items: ["FastAPI", "PostgreSQL", "Kafka", "REST APIs", "pytest"] },
    web: { name: "Web", items: ["HTML", "CSS", "JavaScript", "Firebase"] }
  },

  // ── Experience ──
  experience: {
    iru: {
      role: "Technical Lead, Iru industry project",
      where: "BTE 422, University of Miami",
      when: "Oct 2026 to present",
      what: "Building a Python and FastAPI agent that assesses third-party vendors against SOC 2 and ISO 27001. I set the project plan and am the team's main contact with Iru."
    },
    research: {
      role: "Research Assistant, Data Science and ML",
      where: "University of Miami, College of Arts and Sciences",
      when: "Sep 2025 to Sep 2026",
      what: "Built ML pipelines for chemical reactivity research, including data balancing, clustering, dimensionality reduction, and model evaluation."
    },
    webdev: {
      role: "Web Developer Assistant",
      where: "Miami Herbert Business School",
      when: "Sep 2023 to present",
      what: "Maintain over 200 faculty, event, and program pages, fix HTML and CSS issues across devices, and keep pages within accessibility standards."
    }
  }
};
