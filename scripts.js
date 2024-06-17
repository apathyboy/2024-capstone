document.addEventListener("DOMContentLoaded", function() {
    fetch('products.csv')
        .then(response => response.text())
        .then(data => {
            const parsedData = parseCSV(data);
            loadFeaturedProduct(parsedData.featuredProduct);
            loadCategories(parsedData.categories);
        });
});

function parseCSV(data) {
    const lines = data.split('\n');
    const result = {
        featuredProduct: {},
        categories: []
    };

    lines.forEach((line, index) => {
        const [type, name, image] = line.split(',');

        if (type === 'featured') {
            result.featuredProduct = { name, image };
        } else if (type === 'category') {
            result.categories.push({ name, image });
        }
    });

    return result;
}

function loadFeaturedProduct(product) {
    document.getElementById('featured-name').textContent = product.name;
    document.getElementById('featured-image').style.backgroundImage = `url(${product.image})`;
}

function loadCategories(categories) {
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('category');
        categoryElement.innerHTML = `
            <div class="image-placeholder" style="background-image: url(${category.image})"></div>
            <p class="category-name">${category.name}</p>
        `;
        container.appendChild(categoryElement);
    });
}
