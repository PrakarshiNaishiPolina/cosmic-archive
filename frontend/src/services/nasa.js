
// const API_BASE = 'http://localhost:8000/api';
// const NASA_IMAGES = 'https://images-api.nasa.gov';

// export async function searchNasaMedia(query, mediaType = 'image', page = 1) {
//   const params = new URLSearchParams({
//     q: query,
//     media_type: mediaType,
//     page: String(page)
//   });

//   const response = await fetch(
//     `${NASA_IMAGES}/search?${params}`
//   );

//   if (!response.ok) {
//     throw new Error(`NASA image search failed (${response.status})`);
//   }

//   const json = await response.json();

//   return (json.collection?.items || [])
//     .map((item) => {
//       const data = item.data?.[0] || {};
//       const links = item.links || [];
//       const imageLink =
//         links.find((link) => link.render === 'image') ||
//         links.find((link) => link.rel === 'preview');

//       return {
//         id: data.nasa_id || data.title || 'nasa-media',
//         nasaId: data.nasa_id || '',
//         title: data.title || 'Untitled NASA media',
//         description:
//           data.description || data.description_508 || 'No description supplied.',
//         date: data.date_created || '',
//         center: data.center || 'NASA',
//         mediaType: data.media_type || mediaType,
//         image: imageLink?.href || '',
//         pageUrl: data.nasa_id
//           ? `https://images.nasa.gov/details/${encodeURIComponent(data.nasa_id)}`
//           : 'https://images.nasa.gov/'
//       };
//     })
//     .filter((item) => item.image && item.mediaType === 'image');
// }

// export async function getAsteroidApproaches(startDate, endDate) {
//   const start = new Date(`${startDate}T00:00:00`);
//   const end = new Date(`${endDate}T00:00:00`);

//   const days = Math.max(
//     1,
//     Math.ceil((end.getTime() - start.getTime()) / 86400000)
//   );

//   const response = await fetch(
//     `${API_BASE}/asteroids?days=${days}`
//   );

//   if (!response.ok) {
//     throw new Error(`Asteroid API failed (${response.status})`);
//   }

//   const json = await response.json();
//   const AU_TO_KM = 149597870.7;

//   return (json.data || []).map((record) => {
//     const distanceAu = Number(record.dist);

//     return {
//       ...record,
//       'dist-km': Number.isFinite(distanceAu)
//         ? distanceAu * AU_TO_KM
//         : null,
//       'v-rel': record.v_rel ?? null,
//       fullname: record.fullname || record.des || 'Unknown object',
//       des: record.des || '',
//       cd: record.cd || '',
//       diameter: record.diameter ?? null
//     };
//   });
// }


const API_BASE = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api`;

export async function searchNasaMedia(query, mediaType = 'image', page = 1) {
  const params = new URLSearchParams({
    q: query,
    media_type: mediaType,
    page: String(page),
    page_size: '50'
  });

  const response = await fetch(`${API_BASE}/nasa-images?${params}`);

  if (!response.ok) {
    throw new Error(`NASA image search failed (${response.status})`);
  }

  const json = await response.json();
  const seen = new Set();

  return (json.collection?.items || [])
    .map((item) => {
      const data = item.data?.[0] || {};
      const links = item.links || [];

      const imageLink =
        links.find((link) => link.rel === 'preview' && link.render === 'image') ||
        links.find((link) => link.render === 'image') ||
        links.find((link) => link.rel === 'preview');

      return {
        id: data.nasa_id || data.title || imageLink?.href || 'nasa-media',
        nasaId: data.nasa_id || '',
        title: data.title || 'Untitled NASA media',
        description:
          data.description || data.description_508 || 'No description supplied.',
        date: data.date_created || '',
        center: data.center || 'NASA',
        mediaType: data.media_type || mediaType,
        image: imageLink?.href || '',
        pageUrl: data.nasa_id
          ? `https://images.nasa.gov/details/${encodeURIComponent(data.nasa_id)}`
          : 'https://images.nasa.gov/'
      };
    })
    .filter((item) => {
      if (!item.image || item.mediaType !== mediaType || seen.has(item.id)) {
        return false;
      }

      seen.add(item.id);
      return true;
    });
}

export async function getAsteroidApproaches(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);

  const days = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / 86400000)
  );

  const response = await fetch(`${API_BASE}/asteroids?days=${days}`);

  if (!response.ok) {
    throw new Error(`Asteroid API failed (${response.status})`);
  }

  const json = await response.json();
  const AU_TO_KM = 149597870.7;

  return (json.data || []).map((record) => {
    const distanceAu = Number(record.dist);

    return {
      ...record,
      'dist-km': Number.isFinite(distanceAu)
        ? distanceAu * AU_TO_KM
        : null,
      'v-rel': record.v_rel ?? null,
      fullname: record.fullname || record.des || 'Unknown object',
      des: record.des || '',
      cd: record.cd || '',
      diameter: record.diameter ?? null
    };
  });
}


export async function getAsteroidClusters(days = 30, clusters = 3) {
  const params = new URLSearchParams({
    days: String(days),
    clusters: String(clusters),
  });

  const response = await fetch(
    `${API_BASE}/asteroid-clusters?${params}`
  );

  if (!response.ok) {
    let message = `Asteroid clustering failed (${response.status})`;

    try {
      const error = await response.json();
      if (error.detail) {
        message = error.detail;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  return response.json();
}
