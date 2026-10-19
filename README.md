# sloanatkins.github.io

My portfolio site, with one view per kind of role:

| View | Link |
|------|------|
| Overview | https://sloanatkins.github.io/ |
| Data engineering | https://sloanatkins.github.io/data/ |
| Machine learning | https://sloanatkins.github.io/ml/ |
| Software | https://sloanatkins.github.io/software/ |

## Editing

All the words are in `assets/content.js`. Each track lists which projects, tools, and experience it shows, in order. A project can have an `angle` that swaps in a different summary on a given track.

Screenshots are in `assets/img/`. Layout and colors are in `assets/site.css`.

## Previewing locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/data/
