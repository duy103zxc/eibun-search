const $sentenceList = document.querySelector('.sentence-list');
const input = document.getElementById('myInput');
const searchButton = document.getElementById('search-keyword');
const landing = document.getElementById('landing');
const notFound = document.querySelector('.not-found');

let listOfSentences = [];
let content = "";

/**
 * Load text file contents
 */
async function loadFile() {
  try {
    const response = await fetch("assets/dataset.txt");
    if (!response.ok) {
      throw new Error("Server Error");
    }
    content = await response.text();
  } catch (error) {
    console.error(error);
  }
}

loadFile();

/**
 * Search for sentences containing a keyword
 * @param {string} keyword - The keyword to search for
 * @returns {string[]} An array of sentences containing the keyword
 */
function searchSentences(keyword) {
  const regex = new RegExp("\\b" + keyword + '\\b', "gi");
  const sentences = content.split("\n");
  // Use filter instead of some to get all matching sentences
  const matchingSentences = sentences.filter(sentence => regex.test(sentence));
  notFound.style.display = 'none';
  if (matchingSentences === undefined || matchingSentences.length == 0) {
    notFound.style.display = 'block';
  }
  // Limit the number of results to 50
  return matchingSentences.slice(0, 50);
}

/**
 * Update the sentence list with highlighted keywords
 * @param {string[]} sentences - The sentences to display
 */
function updateSentenceList(sentences) {
  const keyword = input.value.trim().toLowerCase();
  const out = sentences.map(sentence => {
    const newSentence = sentence.replace(new RegExp(keyword, 'gi'), `<span class="hl">${keyword}</span>`);
    return `<li>${newSentence}</li>`;
  }).join('');
  $sentenceList.innerHTML = out;
}

// Event listeners
searchButton.addEventListener('click', () => {
  const keyword = input.value.trim().toLowerCase();
  const sentences = searchSentences(keyword);
  updateSentenceList(sentences);
  landing.style.display = "none";
});

window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const keyword = input.value.trim().toLowerCase();
    const sentences = searchSentences(keyword);
    updateSentenceList(sentences);
    landing.style.display = "none";
  }
});