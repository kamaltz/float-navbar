// Fix untuk gambar produk tidak tampil di search section
// Tambahkan ke floating-navbar.js atau gunakan sebagai patch

// Override renderSearchResults method
TirtonicFloatingNav.prototype.renderSearchResults = function(products) {
    const searchResults = this.nav.querySelector(".searched--product-list");
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="product-grid">
                ${products.map(product => `
                    <div class="product-card">
                        <a href="${product.url}">
                            <div class="product-image-container">
                                ${product.image && product.image !== '' ? 
                                    `<img src="${product.image}" alt="${product.title}" class="product-image" 
                                         onload="this.style.display='block'" 
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                     <div class="product-image-placeholder" style="display:none;">No Image</div>` 
                                    : 
                                    '<div class="product-image-placeholder">No Image</div>'
                                }
                            </div>
                            <div class="product-info">
                                <h4 class="product-title">${product.title}</h4>
                                <span class="product-price">${product.price}</span>
                            </div>
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Override renderNewestProducts method
TirtonicFloatingNav.prototype.renderNewestProducts = function(products) {
    const productList = this.nav.querySelector(".newest--product-list");
    if (productList) {
        if (products.length > 0) {
            productList.innerHTML = `
                <div class="product-grid">
                    ${products.map(product => `
                        <div class="product-card">
                            <a href="${product.url}">
                                <div class="product-image-container">
                                    ${product.image && product.image !== '' ? 
                                        `<img src="${product.image}" alt="${product.title}" class="product-image" 
                                             onload="this.style.display='block'" 
                                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                         <div class="product-image-placeholder" style="display:none;">No Image</div>` 
                                        : 
                                        '<div class="product-image-placeholder">No Image</div>'
                                    }
                                </div>
                                <div class="product-info">
                                    <h4 class="product-title">${product.title}</h4>
                                    <span class="product-price">${product.price}</span>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            productList.innerHTML = '<p style="text-align:center;color:#666;">No products available</p>';
        }
    }
};

// CSS untuk product image container
const productImageCSS = `
<style>
.product-image-container {
    position: relative;
    width: 100%;
    height: 80px;
    overflow: hidden;
    background: #f8f9fa;
    border-radius: 8px 8px 0 0;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.product-image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    color: #6c757d;
    font-size: 12px;
    border-radius: 8px 8px 0 0;
}

@media (max-width: 767px) {
    .product-image-container {
        height: 60px;
    }
}
</style>
`;

// Inject CSS
if (!document.getElementById('product-image-fix-css')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'product-image-fix-css';
    styleElement.innerHTML = productImageCSS;
    document.head.appendChild(styleElement);
}