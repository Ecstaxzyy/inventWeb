// Menangani proses registrasi
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ email, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration Successful');
    window.location.href = 'login.html';
});

// Menangani proses login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login Successful');
        window.location.href = 'index.html';
    } else {
        alert('Invalid Username or Password');
    }
});

// Menangani logout
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Mengecek apakah pengguna sudah login
window.onload = function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Jika tidak ada pengguna yang login, arahkan ke halaman login
        if (window.location.pathname !== '/login.html') {
            window.location.href = 'login.html';
        }
    } else {
        // Jika pengguna sudah login, tampilkan tombol logout
        if (document.getElementById('logoutButton')) {
            const logoutButton = document.getElementById('logoutButton');
            logoutButton.onclick = logout;
        }
    }
};

// Menampilkan produk
if (document.getElementById('productList')) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><button class="btn btn-warning btn-sm">Edit</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProduct('${product.productId}')">Delete</button></td>
        `;
        productList.appendChild(row);
    });
}

// Menambah produk
document.getElementById('productForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push({ productId, name, category, price, stock });
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product Added');
    window.location.href = 'index.html';
});

// Menghapus produk
function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const filteredProducts = products.filter(product => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    window.location.reload();
}
