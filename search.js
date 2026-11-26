```javascript

   ====COFFEE VENDO SEARCH FUNCTION====
   

document.addEventListener("DOMContentLoaded", function () {

    const searchBar = document.querySelector(".search-bar");

    if (!searchBar) {
        return;
    }


    
       ====SEARCH WHEN PRESSING ENTER=====
      

    searchBar.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

        }

    });


    
       =====GET SEARCH FROM URL====
      

    const urlParams =
        new URLSearchParams(window.location.search);

    const searchQuery =
        urlParams.get("search");


    
      ====IF SEARCH WAS SENT TO HOME=====
      

    if (
        searchQuery &&
        typeof machines !== "undefined"
    ) {

        searchBar.value = searchQuery;

        searchMachine(searchQuery);

    }


    
       ====SEARCH FUNCTION====

    function performSearch() {

        const query =
            searchBar.value.trim();


        if (query === "") {

            alert("Please type something to search.");

            searchBar.focus();

            return;

        }


        /*
         * Check if we are currently on home.html
         */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            currentPage === "home.html" ||
            currentPage === ""
        ) {

            searchMachine(query);

        } else {

            /*
             * If user is on another page,
             * send the search to home.html
             */

            window.location.href =
                "home.html?search=" +
                encodeURIComponent(query);

        }

    }


    
       ====SEARCH MACHINES====
       

    function searchMachine(query) {

        if (
            typeof machines === "undefined"
        ) {

            window.location.href =
                "home.html?search=" +
                encodeURIComponent(query);

            return;

        }


        const searchText =
            query.toLowerCase();


        /*
         * Search machine name
         * OR description
         */

        const foundIndex =
            machines.findIndex(function (machine) {

                return (

                    machine.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    machine.description
                        .toLowerCase()
                        .includes(searchText)

                );

            });


       
          ==== MACHINE FOUND====
          

        if (foundIndex !== -1) {

            currentMachine = foundIndex;

            showMachine();


            /*
             * Scroll to machine
             */

            const machineCard =
                document.querySelector(
                    ".machine-slider"
                );

            if (machineCard) {

                machineCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }


        }

      
          ====MACHINE NOT FOUND====
           

        else {

            alert(
                'No machine found for "' +
                query +
                '".'
            );

        }

    }

});
```
