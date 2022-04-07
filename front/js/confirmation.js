let urlPage = window.location.href ;
let url = new URL(urlPage);
let orderId = url.searchParams.get("order");

const spanOrderId = document.getElementById('orderId').textContent = orderId;
console.log(spanOrderId)