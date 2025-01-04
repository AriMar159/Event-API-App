class UI {
    constructor(){
//App incialization
        this.init();
    }
    //Method when the app starts
    init(){
        //display categories in <select>
        this.printCategories();
    }

    //Display events from the API

    displayEvents(events){
        console.log(events);
    }
    
    //Prints the categories

    printCategories() {
        const categoriesList = eventbrite.getCategoriesAPI()
            .then(categories => {
                const categoriesList = categories.categories.categories;
                const categoriesSelect = document.querySelector('#category');
                //Inserts categories into select

                categoriesList.forEach(category => {
                    //Create the options
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.appendChild(document.createTextNode(category.name));
                    categoriesSelect.appendChild(option);
                })
            })
            .catch(error => console.log(error));
    }
}
