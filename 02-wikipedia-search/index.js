const form = document.querySelector(".js-search-form");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const inputValue = document.querySelector(".js-search-input").value.trim();

  const searchResults = document.querySelector(".js-search-results");
  searchResults.innerHTML = "";

  const spinner = document.querySelector(".js-spinner");
  spinner.classList.remove("hidden");

  try {
    const results = await searchWikipedia(inputValue);
    console.log(results);

    if (results.query.searchinfo.totalhits === 0) {
      alert("No results found. Try different keywords");
      return;
    }

    displayResults(results);
  } catch (error) {
    console.log(error.message);
    alert("Failed to search");
  } finally {
    spinner.classList.add("hidden");
  }
}

const btnNext = document.querySelector(".btn-next");

let page = 20;

btnNext.addEventListener("click", click);
function click() {
 return page += 20;
}

async function searchWikipedia(searchQuery) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=${page}&srsearch=${searchQuery}`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  const json = await response.json();
  return json;
}

function displayResults(results) {
  const searchResults = document.querySelector(".js-search-results");

  results.query.search.forEach((result) => {
    const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

    searchResults.insertAdjacentHTML(
      "beforeend",
      `<div class="result-item">
        <h3 class="result-title">
          <a href="${url}" target="_blank" rel=noopener"${result.title}
        </h3>
        <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
        <span class="result-snippet">${result.snippet}</span><br>
      </div>
      `
    );
  });
}
