let fruits = [
  {
    id: 1,
    title: 'Apple',
    price: 20,
    img: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  },
  {
    id: 2,
    title: 'Orange',
    price: 30,
    img: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  },
  {
    id: 3,
    title: 'Mango',
    price: 40,
    img: 'https://images.unsplash.com/photo-1587486936739-78df7470c7e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=581&q=80'
  }
]

const toHTML = (fruit) =>
  `<div class="col">
    <div class="card">
    <img
        src="${fruit.img}"
    class="card-img-top alt='${fruit.title}'"
  />
  <div class="card-body">
    <h5 class="card-title">${fruit.title}</h5>
    <a
      href="#"
      class="btn btn-primary" data-btn="price"
      data-id='${fruit.id}'>Price</a
    >
    <a
      href="#"
      class="btn btn-danger" data-btn="remove"
      data-id='${fruit.id}'
      >Delite</a
    >
  </div>
</div>
</div>`

function render() {
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Price',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Close',
      type: 'primary',
      handler() {
        priceModal.close()
      }
    }
  ]
})

document.addEventListener('click', (event) => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find((f) => f.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
    <p> Price ${fruit.title}: <strong>${fruit.price}$</strong></p>`)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `
         <p> You delete: <strong>${fruit.title}</strong></p>`
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id)
        render()
      })
      .catch(() => {
        console.log('Cancel')
      })
  }
})
