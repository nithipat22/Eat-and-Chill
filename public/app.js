fetch("/api/products")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products")
    container.innerHTML = ""

    products.forEach(p => {
      container.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text text-muted">หมวด: ${p.category}</p>
              <p class="fw-bold">ราคา: ${p.price} ฿</p>
              <p class="text-muted">เหลือ: ${p.stock} ชิ้น</p>
              <button class="btn btn-danger w-100">สั่งซื้อ</button>
            </div>
          </div>
        </div>
      `
    })
  })
  .catch(err => console.error("โหลดสินค้าไม่สำเร็จ:", err))
