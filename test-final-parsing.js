// test-final-parsing.js
const parseResult = (result, isSearch = false) => {
    if (!result) return [];

    if (isSearch && result.data && Array.isArray(result.data) && result.data[0]?.result) {
        return result.data[0].result;
    }

    let list = result.data || result.result || result;

    if (typeof list === 'string') {
        try {
            list = JSON.parse(list);
            if (typeof list === 'string') list = JSON.parse(list);
        } catch (e) {
            return [];
        }
    }

    return Array.isArray(list) ? list : [];
};

// Mock data based on user's API responses
const searchResponse = {
    "data": [
        {
            "jumlah": 7,
            "result": [
                { "id": "150506", "url": "naruto-alredy-fixed", "judul": "Naruto Bocil" }
            ]
        }
    ]
};

const movieResponse = "[{\"id\": 1,\"url\":\"entotsu-machi-no-poupelle\",\"judul\":\"Entotsu Machi no Poupelle\"}]";

const latestResponse = [
    { "id": 1, "url": "yuusha-party", "judul": "Yuusha" }
];

console.log('--- Search Test ---');
const searchList = parseResult(searchResponse, true);
console.log('Count:', searchList.length);
console.log('First:', searchList[0]?.judul);

console.log('\n--- Movie Test ---');
const movieList = parseResult(movieResponse);
console.log('Count:', movieList.length);
console.log('First:', movieList[0]?.judul);

console.log('\n--- Latest Test ---');
const latestList = parseResult(latestResponse);
console.log('Count:', latestList.length);
console.log('First:', latestList[0]?.judul);
