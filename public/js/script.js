(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  const hambergerBtn = document.querySelector(".navbar-toggler ");
  const navbar = document.querySelector(".navbar");
  hambergerBtn.addEventListener("click", function () {
    navbar.classList.toggle("hambergerMenu");
  });

  let filtersToggle = document.getElementById("filters");
  filtersToggle.addEventListener("click", () => {
    if (filtersToggle.classList.contains(collapsed)) {
      filtersToggle.style.marginLeft = "-200px";
    } else {
      filtersToggle.style.marginLeft = "0";
    }
  });

  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });

  // navbar

  function sendData(e) {
    const searchResults = document.getElementById("searchResults");
    const searchDropdown = document.getElementById("searchDropdown");
    const searchValue = e.value;

    fetch("/listings/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searching: searchValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        searchDropdown.innerHTML = "";
        if (data.length > 0) {
          data.forEach((suggestion) => {
            const option = document.createElement("button");
            option.classList.add("dropdown-item");
            option.type = "button";
            option.textContent = suggestion.location;
            searchDropdown.appendChild(option);

            option.addEventListener("click", function () {
              searchResults.value = suggestion.location;
              searchDropdown.innerHTML = "";
            });
          });
          searchDropdown.style.display = "block";
        } else {
          searchDropdown.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Event listener on keyup
  const searchInput = document.getElementById("searchResults");
  searchInput.addEventListener("keyup", function () {
    sendData(this);
  });

  // Hide dropdown when clicking outside the input or dropdown menu
  document.addEventListener("click", function (event) {
    if (!event.target.matches("#searchResults")) {
      searchDropdown.style.display = "none";
    }
  });

  //Search button

  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", function () {
    const searchValue = encodeURIComponent(
      document.getElementById("searchResults").value
    );
    window.location.href = `/listings/search/${searchValue}`;
  });
})();
