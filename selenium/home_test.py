import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from homepage import HomePage
import time
import os

@pytest.fixture(scope="function")
def driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=options)
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    driver.get(frontend_url)

    yield driver
    driver.quit()

@pytest.fixture(scope="function")
def homepage(driver):
    homepage_instance = HomePage(driver)
    yield homepage_instance
    homepage_instance.clean()

def test_navbar_title(homepage):
    homepage.verify_element_text("selenium-nav-logo", "Yelp-EA")

def test_commerces_container(homepage):
    EC.presence_of_element_located((By.ID, "selenium-businesses"))

def test_categories_container(homepage):
    EC.presence_of_element_located((By.ID, "selenium-categories"))

def test_search_navbar_input(homepage):
    input_element = homepage.wait.until(
        EC.presence_of_element_located((By.ID, "selenium-nav-input"))
    )
    input_element.send_keys("restaurant")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()

def test_search_homepage_input(homepage):
    input_element = homepage.wait.until(
        EC.presence_of_element_located((By.ID, "selenium-home-search"))
    )
    input_element.send_keys("restaurant")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()

def test_search_empty_homepage_input(homepage):
    input_element = homepage.wait.until(
        EC.presence_of_element_located((By.ID, "selenium-home-search"))
    )
    input_element.send_keys("")
    input_element.send_keys(Keys.RETURN)
    homepage.wait_for_element("selenium-results-heading")
    homepage.browser.back()