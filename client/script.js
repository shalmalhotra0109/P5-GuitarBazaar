document.addEventListener('DOMContentLoaded', function() {
  // Array to store guitars
  var guitars = [
    { brand: 'Fender', model: 'Stratocaster', price: 1499 },
    { brand: 'Gibson', model: 'Les Paul', price: 1999 },
    { brand: 'Ibanez', model: 'RG550', price: 1299 }
  ];

  // Function to render the guitar list
  function renderGuitars() {
    var guitarList = document.getElementById('guitar-list');
    guitarList.innerHTML = '';

    guitars.forEach(function(guitar) {
      var guitarItem = document.createElement('div');
      guitarItem.classList.add('guitar-item');

      var brand = document.createElement('h3');
      brand.textContent = guitar.brand;

      var model = document.createElement('p');
      model.textContent = guitar.model;

      var price = document.createElement('p');
      price.textContent = '$' + guitar.price;

      guitarItem.appendChild(brand);
      guitarItem.appendChild(model);
      guitarItem.appendChild(price);

      guitarList.appendChild(guitarItem);
    });
  }

  // Add event listener for the guitar form submission
  document.getElementById('guitar-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the form values
    var brand = document.getElementById('brand').value;
    var model = document.getElementById('model').value;
    var price = document.getElementById('price').value;

    // Create a new guitar object
    var newGuitar = {
      brand: brand,
      model: model,
      price: price
    };

    // Add the new guitar to the guitars array
    guitars.push(newGuitar);

    // Clear the form inputs
    document.getElementById('brand').value = '';
    document.getElementById('model').value = '';
    document.getElementById('price').value = '';

    // Render the updated guitar list
    renderGuitars();
  });

  // Initial render of the guitar list
  renderGuitars();
});
