import { useState } from 'react';
import { motoko_project_backend } from 'declarations/motoko_project_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [notification, setNotification] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;

    motoko_project_backend.addProduct(name, price).then(() => {
      setNotification('Ürün eklendi!');
      // Ürünü ekledikten sonra, gerekli durumları sıfırlayabilirsin.
      event.target.reset(); // Formu sıfırla
    }).catch((error) => {
      console.error('Error adding product:', error);
      setNotification('Ürün eklenirken bir hata oluştu.');
    });
  }

  return (
    <main>
      <h1>Ürün Ekle</h1>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ürün Adı: &nbsp;</label>
        <input id="name" type="text" required />
        <label htmlFor="price">Fiyat: &nbsp;</label>
        <input id="price" type="number" required />
        <button type="submit">Ürün Ekle</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
