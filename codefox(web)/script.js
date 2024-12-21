let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartContainer = document.getElementById('cart');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const id = product.dataset.id;
    const name = product.querySelector('h2').textContent;
    const price = product.querySelector('p').textContent;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
  });
});

cartContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const id = e.target.dataset.id;
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity -= 1;  
      if (existing.quantity <= 0) {
    
        cart = cart.filter(item => item.id !== id);
      }
    }
    updateCart();
  }
});

document.getElementById('checkout').addEventListener('click', () => {
  if (cart.length > 0) {
    window.location.href = 'thanks.html';
  } else {
    alert('Your cart is empty.');
  }
});

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartItems.innerHTML = cart
    .map(
      item => `
      <li>
        ${item.name} (${item.quantity}) 
        <button class="remove" data-id="${item.id}">Remove</button>
      </li>`
    )
    .join('');
  cartContainer.style.display = cart.length > 0 ? 'block' : 'none';
}
