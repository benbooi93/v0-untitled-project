// File: fetch-images.js
const axios = require('axios');

const API_KEY = 'quLxiB4iAptnCTmEo34tMxdqTdMmLYrtEowZluLyy5h4DFw4mY2e8Fkf';

// Comprehensive list of search terms based on your codebase - REFINED FOR SPRING/FOREST
const searchTerms = [
  // Animals
  'Grizzly Bear in forest',
  'Black Bear in forest',
  'Moose in spring forest',
  'Bald Eagle near forest river spring', // Adjusted for habitat/season
  'Pacific Salmon in river spring run', // Adjusted for habitat/season

  // Destinations & Scenic
  'Lake Louise Banff National Park in May',
  'Okanagan Lake Kelowna spring',
  'Revelstoke Mountain Canada spring',
  'Vancouver skyline spring clear day', // Adjusted
  'Juniper Beach British Columbia spring',
  'Golden British Columbia trail spring forest',
  'Lillooet British Columbia spring landscape',
  'Kamloops British Columbia spring landscape',
  'Pemberton British Columbia spring valley forest',
  'Yoho National Park Canada spring forest',
  'Thompson River British Columbia spring',
  'Kelowna vineyard spring',
  'British Columbia Alberta highway route spring forest',
  'Rocky Mountain highway Canada spring',
  'Mountain forest valley vista spring', // Refined fallback

  // Hikes
  'Johnston Canyon Trail Banff in May forest',
  'Lake Agnes Tea House Trail Banff spring',
  'Bow Falls Viewpoint Banff spring river',
  'Sunshine Meadows Banff spring snowmelt flowers', // Specific for May
  'Knox Mountain Park Kelowna spring trail forest',
  'Gibraltar Rock Paul Lake Loop Trail spring forest',
  'Inspiration Woods Trail Revelstoke spring forest',
  'Emerald Lake Loop Yoho National Park spring forest',
  'Thompson River Viewpoint Juniper Bluff Trail spring',
  'Golden Rotary Trail British Columbia spring forest',

  // Accommodations
  'Juniper Beach campsite spring river',
  'Moxy Banff hotel exterior spring mountains',
  'House in Kelowna British Columbia spring yard',
  'Airbnb cabin Revelstoke British Columbia forest setting spring',

  // Fallback (Refined)
  'Mountain forest valley vista spring',
];

// Function to search Pexels and get an image URL
async function searchPexels(query) {
  console.log(`Searching for: ${query}...`);
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: query,
        per_page: 1, // Get only the top result
        orientation: 'landscape', // Prefer landscape photos
      },
    });

    if (response.data.photos && response.data.photos.length > 0) {
      const photo = response.data.photos[0];
      // Using src.large2x is a good balance of quality and size for web use
      // You can change to src.original for highest quality if needed
      console.log(`Found: ${query}\nURL: ${photo.src.large2x || photo.src.original}\n`);
      return { query, url: photo.src.large2x || photo.src.original };
    } else {
      console.log(`WARN: No image found on Pexels for "${query}"\n`);
      return { query, url: null }; // Indicate no image found
    }
  } catch (error) {
    console.error(`ERROR searching for "${query}": ${error.message || error}\n`);
    return { query, url: null }; // Indicate error
  }
}

// Main function to run searches for all terms
async function fetchAllImages() {
  console.log('--- Starting Pexels Image Search ---');
  const results = [];
  // Use a Set to avoid duplicate searches (like 'Mountain valley vista')
  const uniqueTerms = [...new Set(searchTerms)];

  for (const term of uniqueTerms) {
    const result = await searchPexels(term);
    results.push(result);
    // Add a small delay to avoid hitting rate limits too quickly (optional)
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('--- Image Search Complete ---');
  console.log('\n--- Summary of Found URLs ---');
  results.forEach(result => {
    if (result.url) {
      console.log(`${result.query}\n${result.url}\n`);
    } else {
      console.log(`${result.query}\n(No URL Found or Error)`);
    }
  });
  console.log('--------------------------');
}

// Run the main function
fetchAllImages(); 