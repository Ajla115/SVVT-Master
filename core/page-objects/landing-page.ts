import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {

    //Test 1 - Add a Movie
    private add_movie_button = By.xpath("//button[text()='Add Movie Modal']")

    // Movie form fields
    private movie_title = By.xpath("//input[@name='title' and @placeholder='Enter movie title']");
    private new_category = By.xpath("//input[@placeholder='Enter new category']");
    private category_dropdown = By.xpath("//div[@id='category-select']");
    private category_option = By.xpath("//li[@data-value='Waiting Movie Premiere']");
    private description = By.xpath("//textarea[@name='description' and @placeholder='Enter movie description']");
    private watchlist_order_dropdown = By.xpath("//div[@id='watchlist-order-select']");
    private watchlist_order_option = By.xpath("//li[@data-value='Next Up']");
    private genre_dropdown = By.xpath("//div[@id='genre-select']");
    private genre_option = By.xpath("//li[@data-value='Adventure']");
    private add_movie_submit_button = By.xpath("//button[text()='Add Movie']");

    // Open modal to add movie
    async openAddMovieModal() {
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.add_movie_button);
    }

    // Fill the full movie form step by step
    async fillMovieForm() {
        await this.driver.sleep(1500);
        await this.fillInputField(this.movie_title, testData.data.movie_title);

        await this.driver.sleep(1500);
        await this.fillInputField(this.description, testData.data.description);

        await this.driver.sleep(1500);
        await this.fillInputField(this.new_category, testData.data.new_category);

        await this.driver.sleep(1500);
        await this.findElementAndClick(this.watchlist_order_dropdown);
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.watchlist_order_option);

        await this.driver.sleep(1500);
        await this.findElementAndClick(this.genre_dropdown);
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.genre_option);

        // await this.driver.sleep(1500);
        // await this.findElementAndClick(this.category_dropdown);
        // await this.driver.sleep(1000);
        // await this.findElementAndClick(this.category_option);

        // Random click to close the dropdown
       // await this.driver.sleep(1000);
       // await this.driver.findElementAndClick(this.category_dropdown);

        await this.driver.sleep(2000);
        await this.findElementAndClick(this.add_movie_submit_button);
    }
    
    // --- Selectors for Edit Movie Flow ---
    private edit_icon_button = By.xpath("//button[@aria-label='edit']");
    private edit_description_textarea = By.xpath("//textarea[@name='description']");
    private genre_dropdown_edit = By.xpath("//div[@id='mui-component-select-genreName']");
    private genre_option_comedy = By.xpath("//li[@data-value='Comedy']");
    private save_changes_button = By.xpath("//button[text()='Save Changes']");

    async clearAndFillInputField(locator: By, newValue: string) {
        const element = await this.driver.findElement(locator);
        await element.clear();
        await element.sendKeys(newValue);
    }


      // --- Edit Movie Flow ---
    async editMovie() {
        await this.driver.sleep(1500);
        await this.findElementAndClick(this.edit_icon_button);

        await this.driver.sleep(1500);
        await this.clearAndFillInputField(this.edit_description_textarea, "Rewatch during break – now with friends and snacks.");

        await this.driver.sleep(1500);
        await this.findElementAndClick(this.genre_dropdown_edit);
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.genre_option_comedy);

        await this.driver.sleep(1500);
        await this.findElementAndClick(this.save_changes_button);
    }

    // --- Selectors for Delete Movie Flow ---
    private delete_icon_button = By.xpath("//button[@aria-label='delete']");
    private confirm_delete_button = By.xpath("//button[text()='Delete']");

    // --- Delete Movie Function ---
    async deleteMovie() {
        await this.driver.sleep(1500);
        await this.findElementAndClick(this.delete_icon_button);

        await this.driver.sleep(2000); 
        await this.findElementAndClick(this.confirm_delete_button);
    }

    // --- Selectors for Mark as Watched ---
    private status_label = By.xpath("//div[span[text()='Status:']]");
    private mark_as_watched_button = By.xpath("//button[@aria-label='mark-as-watched']");
    private confirm_mark_as_watched_button = By.xpath("//button[text()='Confirm']");

    async markMovieAsWatched() {
    // Check initial status is 'To Watch'
    const statusElement = await this.driver.findElement(this.status_label);
    const initialStatus = await statusElement.getText();

    if (!initialStatus.includes("To Watch")) {
        throw new Error(`Expected initial status to be 'To Watch', but got: ${initialStatus}`);
    }

    // Click mark-as-watched (check icon)
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.mark_as_watched_button);

    // Confirm action in modal
    await this.driver.sleep(1500);
    await this.findElementAndClick(this.confirm_mark_as_watched_button);

    // Wait for status update
    await this.driver.sleep(2000);

    // Check status has changed to 'Watched'
    const updatedStatus = await statusElement.getText();
    if (!updatedStatus.includes("Watched")) {
        throw new Error(`Expected status to change to 'Watched', but got: ${updatedStatus}`);
    }
}

    // --- Filtering dropdowns and options ---
    private genre_filter_dropdown = By.xpath("//div[@aria-labelledby='filter-label']");
    private genre_filter_option_action = By.xpath("//li[@data-value='Action']");

    private status_filter_dropdown = By.xpath("//div[@aria-labelledby='status-filter-label']");
    private status_filter_option_watched = By.xpath("//li[@data-value='Watched']");

    private category_filter_dropdown = By.xpath("//div[@aria-labelledby='category-filter-label']");
    private category_filter_option_waiting = By.xpath("//li[@data-value='3']");

    private apply_filters_button = By.xpath("//button[text()='Apply Filters']");

    async applyFilters() {
    await this.driver.sleep(1000);

    // Genre filter -> Action
    await this.findElementAndClick(this.genre_filter_dropdown);
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.genre_filter_option_action);

    // Status filter -> Watched
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.status_filter_dropdown);
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.status_filter_option_watched);

    // Category filter -> Waiting Movie Premiere
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.category_filter_dropdown);
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.category_filter_option_waiting);

    // Apply filters
    await this.driver.sleep(1500);
    await this.findElementAndClick(this.apply_filters_button);

    // Wait for UI update
    await this.driver.sleep(2000);
}

    // --- Sorting dropdown and option ---
    private sort_dropdown = By.xpath("//div[@aria-labelledby='sort-label']");
    private sort_option_watchlist_asc = By.xpath("//li[@data-value='asc']");

    async applySorting() {
    await this.driver.sleep(1000);

    // Open sorting dropdown and choose "Watchlist Order (Asc)"
    await this.findElementAndClick(this.sort_dropdown);
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.sort_option_watchlist_asc);

    // Reuse apply filters button (sorting also relies on it)
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.apply_filters_button);

    // Wait for sorted results
    await this.driver.sleep(2000);
}

    // --- Add Category Flow ---
    private add_new_category_button = By.xpath("//button[text()='Add New Category']");
    private category_name_input = By.xpath("//input[@placeholder='Enter category name']");
    private confirm_add_category_button = By.xpath("//button[text()='Add']");

    async addNewCategory() {
    await this.driver.sleep(1000);
    await this.findElementAndClick(this.add_new_category_button);

    await this.driver.sleep(1000);
    await this.fillInputField(this.category_name_input, "Watch during Winter Holidays");

    await this.driver.sleep(1000);
    await this.findElementAndClick(this.confirm_add_category_button);

    await this.driver.sleep(1500); // wait for UI update
}

    // --- Edit Category Flow ---
    private edit_category_button = By.xpath("//button[text()='Edit Category']");
    private select_category_dropdown = By.xpath("//div[@aria-labelledby='select-category-label' and @role='combobox']");
    private category_option_winter = By.xpath("//li[@data-value='5' and text()='Watch during Winter Holidays']");
    private edit_category_input = By.xpath("//input[@placeholder='Enter new category name']");
    private save_category_button = By.xpath("//button[text()='Save Changes']");

    async editCategoryName() {
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.edit_category_button);

        await this.driver.sleep(1000);
        await this.findElementAndClick(this.select_category_dropdown);
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.category_option_winter);

        await this.driver.sleep(1000);
        await this.clearAndFillInputField(this.edit_category_input, "Holiday Best Picks");

        await this.driver.sleep(1000);
        await this.findElementAndClick(this.save_category_button);

        await this.driver.sleep(1500); // wait for UI update
    }

    // --- Delete Category Flow ---
    private delete_category_button = By.xpath("//button[text()='Delete Category']");
    private delete_category_dropdown = By.xpath("//div[@aria-labelledby='category-select-label' and @role='combobox']");
    private category_option_holiday = By.xpath("//li[@data-value='5' and text()='Holiday Best Picks']");
    private confirm_delete_without_movies = By.xpath("//button[text()='Delete Without Movies']");

    async deleteCategoryWithoutMovies() {
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.delete_category_button);

        await this.driver.sleep(1000);
        await this.findElementAndClick(this.delete_category_dropdown);
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.category_option_holiday);

        await this.driver.sleep(1000);
        await this.findElementAndClick(this.confirm_delete_without_movies);

        await this.driver.sleep(1500); // wait for UI to reflect deletion
}










    

    
}





