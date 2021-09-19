// API
const endPoint = 'https://api.lyrics.ovh/';

const findForm = $('#find-form');
const findButton = $('#find-button');
const findInput = $('#find-input');

function setData(data) {
    $.each(data, function (index, entry) {
        const artistName = entry.artist.name;
        const title = entry.title;

        showResultsList({artistName, title, index});
    });
}

function showError() {
    showLyricsError();
    scrollToLyricsResult();
}

function getLyrics(e) {
    const artist = e.target.dataset.artist;
    const title = e.target.dataset.title;

    const url = `${endPoint}v1/${artist}/${title}`;

    showLyricsLoader();

    $.ajax({
        url: url,
        success: function (response) {
            if (response.lyrics === '') {
                showError();
                return;
            }
            showLyricsResult(artist, title, response.lyrics);
            scrollToLyricsResult();
        },
        error: function () {
            showError();
        },
    });
}

function findQuery() {
    const query = findInput.val();
    if (isInputEmpty(query)) return;

    const url = `${endPoint}/suggest/${query}`;

    cleanupExistingResults();
    showResultsContainer();
    showfindLoader();

    $.ajax({
        url: url,
        success: function (response) {
            setData(response.data);
            scrollToFindResults();
        },
        error: function () {
            showFindError();
            scrollToFindResults();
        },
    });
}

function registerfindFormEvents() {
    findForm.submit(function (e) {
        e.preventDefault();
        findQuery();
    });

    findButton.click(function () {
        findQuery();
    });
}

registerfindFormEvents();
