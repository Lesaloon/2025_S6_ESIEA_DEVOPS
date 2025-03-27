import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from homepage import HomePage
import time

@pytest.fixture(scope="function")
def driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=options)
    driver.get("http://localhost:5173")
    
    yield driver
    driver.close()
    driver.quit()

@pytest.fixture(scope="function")
def homepage(driver):
    homepage_instance = HomePage(driver)
    yield homepage_instance
    homepage_instance.clean()

def test_navbar_title(homepage):
    homepage.verify_element_text("selenium-nav-logo", "Yelp-EA")

def test_commerces_container_has_elements(homepage):
    homepage.verify_element_children("selenium-businesses", 3)

def test_commerces_clickable(homepage):
    commerces = homepage.browser.find_elements(By.ID, "selenium-businesses")
    if not commerces:
        pytest.fail("No commerces found")
    for commerce in commerces:
        commerce.find_element(By.XPATH, "./a").click()
        homepage.wait.until(EC.presence_of_element_located((By.ID, "selenium-business-name")))
        homepage.browser.back()

def test_categories_clickable(homepage):
    categories = homepage.browser.find_elements(By.ID, "selenium-categories")
    if not categories:
        pytest.fail("No categories found")
    for categorie in categories:
        categorie.find_element(By.XPATH, "./div").click()
        homepage.wait_for_element("selenium-results")
        homepage.browser.back()

def test_search_navbar_input(homepage):
    input_element = homepage.browser.find_element(By.ID, "selenium-nav-input")
    input_element.send_keys("restaurant")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()

def test_search_empty_navbar_input(homepage):
    input_element = homepage.browser.find_element(By.ID, "selenium-nav-input")
    input_element.send_keys("")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()

def test_search_homepage_input(homepage):
    input_element = homepage.browser.find_element(By.ID, "selenium-home-search")
    input_element.send_keys("restaurant")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()
    
def test_search_empty_homepage_input(homepage):
    input_element = homepage.browser.find_element(By.ID, "selenium-home-search")
    input_element.send_keys("")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()