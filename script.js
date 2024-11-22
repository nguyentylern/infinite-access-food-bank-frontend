let header = document.querySelector('header');
let header_height = header.offsetHeight;
let hero = document.querySelector('.hero');
let hero_height = hero.offsetHeight;
let height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

if (header_height + hero_height < height) {
    let height_style = document.createElement('style');
    height_style.textContent = `
        .hero {
            min-height: ${height - header_height}px;
        }
    `;
    document.head.appendChild(height_style);
}

let place_select = document.getElementById('place-select');
let place_select_height = place_select.offsetHeight;

let height_style_2 = document.createElement('style');
height_style_2.textContent = `
    #zip-input {
        line-height: ${place_select_height}px;
    }
`;
document.head.appendChild(height_style_2);

// script.js
document.getElementById('food-search-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const query1 = document.getElementById('zip-input').value.replace(' ', '%20');
    let query2 = document.getElementById('place-select').value;
    if (query2 == 'BANK') {
        query2 = 'food%20bank';
    } else {
        query2 = 'food%20pantry';
    }
    const results_div = document.getElementById('food-search-results');

    try {
        const response = await fetch(`https://infinite-access-food-bank-backend.onrender.com/${query1}/${query2}`)

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        results_div.innerHTML = '';

        const data = await response.json(); // Parse JSON response
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let name = document.createElement('p');
            name.textContent = data[i].name;
            let address = document.createElement('p')
            address.textContent = data[i].location;
            let distance = document.createElement('p')
            distance.textContent = (data[i].distance).toFixed(2) + " miles";
            let result_element = document.createElement('li');
            result_element.appendChild(name);
            result_element.appendChild(address);
            result_element.appendChild(distance);
            result_element.classList.add('food-search-result')
            results_div.appendChild(result_element);
        }

        let height_style_3 = document.createElement('style');
        height_style_3.textContent = `
            #food-search-results {
                border: 2px solid hsl(0, 0%, 0%);
                margin-top: var(--fs-l);
            }
        `;
        document.head.appendChild(height_style_3);
    } catch (error) {
        console.error(error);
        results_div.textContent = 'An error occurred while fetching data.';
    }
});
