let cart = [
    { name: "Burger", qty: 2, price: 6.00 },
    { name: "Fries", qty: 1, price: 3.00 },
    { name: "Drink", qty: 2, price: 2.50 }
];

function loadOrder() {
    let table = document.getElementById("orderItems");
    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.qty * item.price;
        total += itemTotal;

        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById("totalPrice").innerText = total.toFixed(2);
}

function placeOrder() {
    alert("Order placed successfully!");
}

loadOrder();