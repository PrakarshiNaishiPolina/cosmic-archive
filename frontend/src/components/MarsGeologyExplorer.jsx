
import React, { useState } from 'react';
import {
  Mountain,
  Waves,
  CircleDot,
  Layers3,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import './MarsGeologyExplorer.css';

const sites = [
  {
    id: 'jezero',
    number: '01',
    name: 'Jezero Crater',
    type: 'ANCIENT LAKE & DELTA',
    icon: Waves,
    color: '#e6a078',
    summary: 'Evidence of an ancient lake and river delta.',
    detail:
      'Perseverance explores Jezero Crater because observations show landforms consistent with an ancient lake and delta. Fine-grained sediments in these environments can preserve clues about past habitability.',
    clues: [
      'Fan-shaped delta deposits',
      'Layered sedimentary rocks',
      'Samples collected for future study',
    ],
    link: 'https://science.nasa.gov/mission/mars-2020-perseverance/',
  },
  {
    id: 'gale',
    number: '02',
    name: 'Gale Crater',
    type: 'SEDIMENTARY ROCKS',
    icon: Layers3,
    color: '#d8b46a',
    summary: 'Rock layers reveal changing environments.',
    detail:
      'Curiosity studies layers of rock in Gale Crater. Their minerals and structures help scientists reconstruct how water and environmental conditions changed over time on ancient Mars.',
    clues: [
      'Rock layers exposed by erosion',
      'Evidence of past water chemistry',
      'Mount Sharp at the crater’s center',
    ],
    link: 'https://science.nasa.gov/mission/msl-curiosity/',
  },
  {
    id: 'olympus',
    number: '03',
    name: 'Olympus Mons',
    type: 'GIANT VOLCANO',
    icon: Mountain,
    color: '#d58b83',
    summary: 'A giant shield volcano shaped by lava flows.',
    detail:
      'Olympus Mons is the largest known volcano in the Solar System by height above the surrounding plains. Its broad shape is associated with repeated eruptions of relatively fluid lava over long periods.',
    clues: [
      'Broad shield-like profile',
      'Extensive volcanic plains',
      'Evidence of multiple lava-flow episodes',
    ],
    link: 'https://science.nasa.gov/mars/',
  },
  {
    id: 'marineris',
    number: '04',
    name: 'Valles Marineris',
    type: 'CANYON SYSTEM',
    icon: CircleDot,
    color: '#9aaef0',
    summary: 'A vast canyon system across the Martian surface.',
    detail:
      'Valles Marineris is an immense system of troughs and canyons. Tectonic stretching, collapse, erosion, and other geological processes contributed to this landscape.',
    clues: [
      'Long, deep troughs',
      'Exposed rock walls and layers',
      'Large-scale crustal deformation',
    ],
    link: 'https://science.nasa.gov/mars/',
  },
];

export default function MarsGeologyExplorer() {
  const [selectedId, setSelectedId] = useState('jezero');

  const selected =
    sites.find((site) => site.id === selectedId) || sites[0];

  const SelectedIcon = selected.icon;

  return (
    <section
      className="section-wrap mars-geology"
      id="mars-geology-explorer"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">MARS GEOLOGY EXPLORER</span>
          <h2>
            Read the rocks.
            <br />
            <em>Trace the past.</em>
          </h2>
        </div>

        <span className="text-link">
          <Mountain size={14} /> SURFACE FIELD GUIDE
        </span>
      </div>

      <p className="mars-geology-intro">
        Select a landmark to explore the geological clues scientists
        use to understand Mars. These are educational summaries,
        not live rover data.
      </p>

      <div className="mars-geology-layout">
        <div
          className="mars-geology-sites"
          role="group"
          aria-label="Select a Mars geological feature"
        >
          {sites.map((site) => {
            const SiteIcon = site.icon;
            const active = site.id === selectedId;

            return (
              <button
                type="button"
                key={site.id}
                className={`mars-geology-site ${
                  active ? 'active' : ''
                }`}
                style={{ '--geo-color': site.color }}
                onClick={() => setSelectedId(site.id)}
                aria-pressed={active}
              >
                <span className="mars-geology-site-icon">
                  <SiteIcon size={20} />
                </span>

                <span className="mars-geology-site-copy">
                  <small>{site.type}</small>
                  <strong>{site.name}</strong>
                  <span>{site.summary}</span>
                </span>

                <ArrowUpRight size={16} />
              </button>
            );
          })}
        </div>

        <article
          className="mars-geology-detail"
          style={{ '--geo-color': selected.color }}
          key={selected.id}
        >
          <div className="mars-geology-detail-top">
            <span className="mars-geology-big-icon">
              <SelectedIcon size={28} />
            </span>

            <span className="eyebrow">
              FIELD SITE {selected.number}
            </span>
          </div>

          <h3>{selected.name}</h3>
          <p className="mars-geology-type">{selected.type}</p>

          <p className="mars-geology-description">
            {selected.detail}
          </p>

          <h4>Geological clues</h4>

          <ul>
            {selected.clues.map((clue) => (
              <li key={clue}>{clue}</li>
            ))}
          </ul>

          <a
            className="text-link mars-geology-link"
            href={selected.link}
            target="_blank"
            rel="noreferrer"
          >
            Learn more from NASA <ExternalLink size={13} />
          </a>
        </article>
      </div>

      <p className="mars-geology-note">
        Explore these locations as a geological field guide.
        Descriptions summarize planetary science information.
      </p>
    </section>
  );
}
